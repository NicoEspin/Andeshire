// src/components/RemoteSelect.tsx

"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

type RemoteSelectProps = {
  label?: string;
  sliceSelector: (state: RootState) => {
    loading: boolean;
    error: string | null;
    data: any[];
    loaded: boolean;
  };
  fetchAction: (dispatch: AppDispatch) => void;
  getValue: (item: any) => string;
  getLabel: (item: any) => string;
  value: string | undefined;
  onChange: (val: string) => void;
  placeholder?: string;
};

export const RemoteSelect = ({
  label,
  sliceSelector,
  fetchAction,
  getValue,
  getLabel,
  value,
  onChange,
  placeholder,
}: RemoteSelectProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error, loaded } = useSelector(sliceSelector);
  const t = useTranslations("WorkflowDetails.RemoteSelect");

  useEffect(() => {
    if (!loaded || data.length === 0) {
      fetchAction(dispatch);
    }
  }, [loaded, data, dispatch, fetchAction]);
  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="animate-spin w-4 h-4" /> {t("loading")}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-sm">
        {t("error")}: {error}
      </div>
    );
  }

  return (
    <div className="w-full">
      {label && <label className="text-sm mb-1 block">{label}</label>}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder || t("placeholder")} />
        </SelectTrigger>
        <SelectContent>
          {data.map((item) => (
            <SelectItem key={getValue(item)} value={getValue(item)}>
              {getLabel(item)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
