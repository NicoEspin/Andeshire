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

function hashStringToIndex(str: string, length: number): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % length;
}

export function useKeyMetaMap(apiFields: ApiField[]) {
  return useMemo(() => {
    const keys = apiFields.map((field) => field.key);

    const map: Record<string, KeyMeta> = {};
    keys.forEach((key) => {
      const label =
        KEY_LABEL_MAP[key] ||
        key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

      const index = hashStringToIndex(key, nodeColors.length);
      const color = nodeColors[index];

      map[key] = { key, label, color };
    });

    return map;
  }, [apiFields]);
}
