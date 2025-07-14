// src/lib/keys/useKeyMetaMap.ts
import { useMemo } from "react";
import { nodeColors } from "@/lib/nodeColors";
import { KEY_LABEL_MAP } from "./KEY_LABEL_MAP";


export interface KeyMeta {
  key: string;
  label: string;
  color: string;
}

interface ApiField {
  key: string;
}

export function useKeyMetaMap(apiFields: ApiField[]) {
  return useMemo(() => {
    // Extrae todas las keys
    const keys = apiFields.map((field) => field.key);

    // Ordena para consistencia de color
    keys.sort();

    // Genera el map
    const map: Record<string, KeyMeta> = {};
    keys.forEach((key, index) => {
      const label =
        KEY_LABEL_MAP[key] ||
        key
          .replace(/_/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()); // fallback

      const color = nodeColors[index % nodeColors.length];

      map[key] = { key, label, color };
    });

    return map;
  }, [apiFields]);
}
