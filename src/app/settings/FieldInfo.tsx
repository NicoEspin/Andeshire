import { Info } from "lucide-react";

export default function FieldInfo({ text }: { text: string }) {
  return (
    <div className="flex items-start text-sm text-muted-foreground space-x-1">
      <Info className="w-4 h-4 mt-0.5" />
      <p>{text}</p>
    </div>
  );
}
