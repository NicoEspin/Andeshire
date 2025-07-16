"use client";

import React, {
  useCallback,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import {
  createEditor,
  Descendant,
  Transforms,
  Element as SlateElement,
  Editor,
  Node,
  Range,
  Text,
} from "slate";
import {
  Slate,
  Editable,
  withReact,
  ReactEditor,
  RenderElementProps,
} from "slate-react";
import { withHistory } from "slate-history";
import { Badge } from "@/components/ui/badge";
import { useKeyMetaMap } from "@/lib/keys/useKeyMetaMap";

// — Tipos para Slate
type CustomElement =
  | { type: "variable"; variable: string; children: [{ text: string }] }
  | { type: "paragraph"; children: Descendant[] };

declare module "slate" {
  interface CustomTypes {
    Element: CustomElement;
    Text: { text: string };
  }
}

// — Plugin para inline variables
const withVariables = (editor: ReactEditor) => {
  const { isInline } = editor;
  editor.isInline = (element) =>
    element.type === "variable" ? true : isInline(element);
  return editor;
};

// — Props y handle
export interface VariableRichTextEditorHandle {
  insertVariable: (variable: string) => void;
}

interface VariableRichTextEditorProps {
  value: string; // Ej: "Hola {{name}}, bienvenido"
  allVariables: string[];
  onChange: (value: string) => void;
}

// — parseValue: siempre un solo párrafo
const parseValue = (text = ""): Descendant[] => {
  const nodes: Descendant[] = [];
  const regex = /{{(.*?)}}/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // texto antes de la variable
    if (match.index > lastIndex) {
      nodes.push({ text: text.slice(lastIndex, match.index) });
    }
    // nodo variable
    nodes.push({
      type: "variable",
      variable: match[1].trim(),
      children: [{ text: "" }],
    } as CustomElement);
    lastIndex = regex.lastIndex;
  }

  // texto después de la última variable
  if (lastIndex < text.length) {
    nodes.push({ text: text.slice(lastIndex) });
  }

  // si quedó vacío
  if (nodes.length === 0) {
    nodes.push({ text: "" });
  }

  // retornamos un único párrafo
  return [{ type: "paragraph", children: nodes }];
};

const VariableRichTextEditor = forwardRef<
  VariableRichTextEditorHandle,
  VariableRichTextEditorProps
>(({ value, allVariables, onChange }, ref) => {
  // 1. Crear editor con plugins
  const [editor] = useState(() =>
    withVariables(withHistory(withReact(createEditor())))
  );

  // 2. Mapa de metadatos (colores/labels)
  const allKeysMap = useKeyMetaMap(allVariables.map((key) => ({ key })));

  // 3. Serializador: nodos → string
  const serialize = useCallback((nodes: Node[]): string => {
    return nodes
      .map((n) => {
        if (Editor.isEditor(n)) return serialize(n.children);
        if (SlateElement.isElement(n)) {
          if (n.type === "variable") {
            return `{{${n.variable}}}`;
          }
          return serialize(n.children);
        }
        // Text node
        return (n as Text).text;
      })
      .join("");
  }, []);

  // 4. Estado interno y refs para control
  const [valueState, setValueState] = useState<Descendant[]>(
    () => parseValue(value)
  );
  const isInternalChange = useRef(false);
  const lastExternalValue = useRef(value);

  // 5. Sincronizar solo cuando cambie la prop `value` desde fuera
  // y no sea un cambio interno
  useEffect(() => {
    if (value !== lastExternalValue.current && !isInternalChange.current) {
      const newState = parseValue(value);
      setValueState(newState);
      
      // Actualizar el contenido del editor
      const currentContent = serialize(editor.children);
      if (value !== currentContent) {
        editor.children = newState;
        Editor.normalize(editor, { force: true });
        
        // Mover cursor al final
        const endPoint = Editor.end(editor, []);
        Transforms.select(editor, endPoint);
      }
    }
    lastExternalValue.current = value;
    isInternalChange.current = false;
  }, [value, serialize, editor]);

  // 6. insertVariable imperativo
  const insertVariable = useCallback(
    (variable: string) => {
      const node: CustomElement = {
        type: "variable",
        variable,
        children: [{ text: "" }],
      };
      Transforms.insertNodes(editor, node);
      Transforms.insertText(editor, " ");
      ReactEditor.focus(editor);
    },
    [editor]
  );
  useImperativeHandle(ref, () => ({ insertVariable }));

  // 7. onChange desde Slate
  const handleChange = useCallback(
    (nodes: Descendant[]) => {
      setValueState(nodes);
      isInternalChange.current = true;
      const serialized = serialize(nodes);
      onChange(serialized);
    },
    [onChange, serialize]
  );

  // 8. Backspace borra variables
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Backspace") {
      const { selection } = editor;
      if (selection && Range.isCollapsed(selection)) {
        const [match] = Editor.nodes(editor, {
          match: (n) =>
            SlateElement.isElement(n) && n.type === "variable",
        });
        if (match) {
          e.preventDefault();
          Transforms.delete(editor);
        }
      }
    }
  };

  // 9. Render inline custom
  const renderElement = useCallback(
    (props: RenderElementProps) => {
      const { element, attributes, children } = props;
      if (element.type === "variable") {
        const meta = allKeysMap[element.variable];
        return (
          <span
            {...attributes}
            contentEditable={false}
            style={{ display: "inline-flex", userSelect: "none" }}
          >
            <Badge
              style={{
                backgroundColor: meta?.color || "#4B5563",
                color: "#fff",
              }}
            >
              {meta?.label || element.variable}
            </Badge>
            {children}
          </span>
        );
      }
      return <p {...attributes}>{children}</p>;
    },
    [allKeysMap]
  );

  return (
    <Slate
      editor={editor}
      initialValue={valueState}
      onChange={handleChange}
    >
      <Editable
        renderElement={renderElement}
        placeholder="Escribe tu mensaje aquí…"
        onKeyDown={handleKeyDown}
        className="w-full min-h-[150px] border rounded-md p-2"
      />
    </Slate>
  );
});

VariableRichTextEditor.displayName = "VariableRichTextEditor";
export default VariableRichTextEditor;