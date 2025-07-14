// src/lib/keys/extractKeysFromContent.ts
export function extractKeysFromContent(content: string): string[] {
  const regex = /{{(.*?)}}/g;
  const matches = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    matches.push(match[1].trim());
  }
  return matches;
}
