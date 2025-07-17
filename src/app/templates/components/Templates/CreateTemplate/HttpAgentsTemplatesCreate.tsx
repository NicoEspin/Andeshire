"use client";

import * as React from "react";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrashIcon, PlusIcon } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";

import mockKeys from "../../data/mockkeys.json";
import VariableRichTextEditor, {
  VariableRichTextEditorHandle,
} from "../VariableRichTextEditor";
import VariableDropdown from "../VariableDropdown";

interface HttpAgentsTemplateCreateProps {
  onCancel: () => void;
  onSave?: (data: any) => void;
}

export default function HttpAgentsTemplateCreate({
  onCancel,
  onSave,
}: HttpAgentsTemplateCreateProps) {
  const t = useTranslations("Templates.TemplatesView.HTTPAgents.Create");

  const [name, setName] = React.useState("");
  const [method, setMethod] = React.useState("GET");
  const [url, setUrl] = React.useState("");
  const [timeout, setTimeout] = React.useState(0);
  const [retries, setRetries] = React.useState(0);
  const [requestBody, setRequestBody] = React.useState("");
  const [saveOutput, setSaveOutput] = React.useState<string[]>([]);
  const [queryParams, setQueryParams] = React.useState<[string, string][]>([]);
  const [headers, setHeaders] = React.useState<[string, string][]>([]);

  const allVariables = mockKeys.data.all_keys;

  const urlEditorRef = React.useRef<VariableRichTextEditorHandle>(null);
  const bodyEditorRef = React.useRef<VariableRichTextEditorHandle>(null);
  const saveOutputRef = React.useRef<VariableRichTextEditorHandle>(null);

  const handleAddEntry = (
    setter: React.Dispatch<React.SetStateAction<[string, string][]>>,
    defaultEntry: [string, string] = ["", ""]
  ) => setter((prev) => [...prev, defaultEntry]);

  const handleRemoveEntry = (
    index: number,
    setter: React.Dispatch<React.SetStateAction<[string, string][]>>
  ) => setter((prev) => prev.filter((_, i) => i !== index));

  const handleEntryChange = (
    index: number,
    field: "key" | "value",
    value: string,
    setter: React.Dispatch<React.SetStateAction<[string, string][]>>
  ) =>
    setter((prev) =>
      prev.map(([k, v], i) =>
        i === index
          ? [field === "key" ? value : k, field === "value" ? value : v]
          : [k, v]
      )
    );

  const handleSave = () => {
    const qp = Object.fromEntries(queryParams.filter(([k]) => k));
    const hd = Object.fromEntries(headers.filter(([k]) => k));
    onSave?.({
      name,
      method,
      url,
      timeout,
      retries,
      request_body: requestBody,
      save_output: saveOutput,
      query_params: qp,
      headers: hd,
    });
    onCancel();
  };

  return (
    <SheetContent
      side="right"
      className="flex flex-col gap-6 sm:min-w-[300px] md:min-w-[600px] px-6 py-6 overflow-auto"
    >
      <SheetHeader>
        <SheetTitle className="text-xl font-semibold">{t("Title")}</SheetTitle>
        <SheetDescription className="text-muted-foreground">
          {t("Description")}
        </SheetDescription>
      </SheetHeader>

      <div className="flex flex-col gap-5 flex-grow">
        {/* Nombre */}
        <div>
          <Label className="mb-1">{t("Fields.Name")}</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        {/* Método */}
        <div>
          <Label className="mb-1">{t("Fields.Method")}</Label>
          <Select value={method} onValueChange={setMethod}>
            <SelectTrigger>
              <SelectValue placeholder={t("Fields.Method")} />
            </SelectTrigger>
            <SelectContent>
              {["GET", "POST", "PUT", "DELETE"].map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* URL */}
        <div>
          <Label className="mb-1">{t("Fields.URL")}</Label>
          <VariableRichTextEditor
            ref={urlEditorRef}
            value={url}
            allVariables={allVariables}
            onChange={setUrl}
          />
          <div className="mt-2">
            <Label className="mb-1">{t("Buttons.AddVariableUrl")}</Label>
            <VariableDropdown
              allVariables={allVariables}
              editorRef={urlEditorRef}
      
            />
          </div>
        </div>

        {/* Timeout y Retries */}
        <div className="flex gap-4">
          <div>
            <Label className="mb-1">{t("Fields.Timeout")}</Label>
            <Input
              type="number"
              value={timeout}
              onChange={(e) => setTimeout(Number(e.target.value))}
            />
          </div>
          <div>
            <Label className="mb-1">{t("Fields.Retries")}</Label>
            <Input
              type="number"
              value={retries}
              onChange={(e) => setRetries(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Request Body */}
        <div>
          <Label className="mb-1">{t("Fields.RequestBody")}</Label>
          <VariableRichTextEditor
            ref={bodyEditorRef}
            value={requestBody}
            allVariables={allVariables}
            onChange={setRequestBody}
          />
          <div className="mt-2">
            <Label className="mb-1">{t("Buttons.AddVariableBody")}</Label>
            <VariableDropdown
              allVariables={allVariables}
              editorRef={bodyEditorRef}
            
            />
          </div>
        </div>

        {/* Save Output */}
        <div>
          <Label className="mb-1">{t("Fields.SaveOutput")}</Label>
          <VariableRichTextEditor
            ref={saveOutputRef}
            value={saveOutput.join("\n")}
            allVariables={allVariables}
            onChange={(val) => setSaveOutput(val.split("\n").filter(Boolean))}
          />
          <div className="mt-2">
            <Label className="mb-1">{t("Buttons.AddVariableSaveOutput")}</Label>
            <VariableDropdown
              allVariables={allVariables}
              editorRef={saveOutputRef}
            
            />
          </div>
        </div>

        {/* Query Params */}
        <div>
          <Label className="mb-1 block">{t("Fields.QueryParams")}</Label>
          {queryParams.map(([key, value], i) => (
            <div key={i} className="flex gap-2 items-center mb-2">
              <Input
                placeholder="Key"
                value={key}
                onChange={(e) =>
                  handleEntryChange(i, "key", e.target.value, setQueryParams)
                }
              />
              <Input
                placeholder="Value"
                value={value}
                onChange={(e) =>
                  handleEntryChange(i, "value", e.target.value, setQueryParams)
                }
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleRemoveEntry(i, setQueryParams)}
              >
                <TrashIcon className="text-red-500" />
              </Button>
            </div>
          ))}
          <Button variant="secondary" onClick={() => handleAddEntry(setQueryParams)}>
            <PlusIcon className="mr-2" /> {t("Buttons.AddQueryParam")}
          </Button>
        </div>

        {/* Headers */}
        <div>
          <Label className="mb-1 block">{t("Fields.Headers")}</Label>
          {headers.map(([key, value], i) => (
            <div key={i} className="flex gap-2 items-center mb-2">
              <Input
                placeholder="Key"
                value={key}
                onChange={(e) =>
                  handleEntryChange(i, "key", e.target.value, setHeaders)
                }
              />
              <Input
                placeholder="Value"
                value={value}
                onChange={(e) =>
                  handleEntryChange(i, "value", e.target.value, setHeaders)
                }
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleRemoveEntry(i, setHeaders)}
              >
                <TrashIcon className="text-red-500" />
              </Button>
            </div>
          ))}
          <Button variant="secondary" onClick={() => handleAddEntry(setHeaders)}>
            <PlusIcon className="mr-2" /> {t("Buttons.AddHeader")}
          </Button>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-auto border-t pt-4">
        <Button variant="outline" onClick={onCancel}>
          {t("Buttons.Cancel")}
        </Button>
        <Button
          className="bg-purple-600 hover:bg-purple-700 text-white"
          onClick={handleSave}
        >
          {t("Buttons.Save")}
        </Button>
      </div>
    </SheetContent>
  );
}
