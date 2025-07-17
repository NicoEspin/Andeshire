export function sliceContentWithoutBreakingKeys(content: string, maxLength: number): string {
  let i = 0;
  let visibleCount = 0;
  let result = "";

  while (i < content.length && visibleCount < maxLength) {
    if (content[i] === "{" && content[i + 1] === "{") {
      const end = content.indexOf("}}", i);
      if (end !== -1) {
        const key = content.slice(i, end + 2);
        result += key;
        i = end + 2;
      } else {
        result += content[i];
        i++;
        visibleCount++;
      }
    } else {
      result += content[i];
      i++;
      visibleCount++;
    }
  }

  return result;
}
