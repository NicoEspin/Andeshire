"use client";

import { useMemo } from "react";
import { useLocale } from "next-intl";
import { nodeColors } from "@/lib/nodeColors";
import { KEY_LABEL_MAP } from "./KEY_LABEL_MAP";
import { KEY_LABEL_MAP_EN } from "./KEY_LABEL_MAP_EN";

export interface KeyMeta {
  key: string;
  label: string;
  color: string;
}

interface ApiField {
  key: string;
}

function hashStringToIndex(str: string, length: number): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % length;
}

export function useKeyMetaMap(apiFields: ApiField[]) {
  const locale = useLocale(); // ✅ obtiene automáticamente el locale actual de next-intl

  return useMemo(() => {
    const keys = apiFields.map((field) => field.key);
    const labelMap = locale === "en" ? KEY_LABEL_MAP_EN : KEY_LABEL_MAP;

    const map: Record<string, KeyMeta> = {};
    keys.forEach((key) => {
      const label =
        labelMap[key] ||
        key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

      const index = hashStringToIndex(key, nodeColors.length);
      const color = nodeColors[index];

      map[key] = { key, label, color };
    });

    return map;
  }, [apiFields, locale]);
}
