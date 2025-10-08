export function formatWithMask(raw: string, mask: string, maskMap: Record<string, { pattern: RegExp, transform?: (c: string) => string }>) {
  let formatted = "";
  let rawIndex = 0;

  for (let i = 0; i < mask.length; i++) {
    const maskChar = mask[i];
    const rawChar = raw[rawIndex];

    if (!rawChar) break;

    if (maskMap[maskChar]) {
      const { pattern, transform } = maskMap[maskChar];
      if (pattern.test(rawChar)) {
        formatted += transform ? transform(rawChar) : rawChar;
        rawIndex++;
      } else {
        rawIndex++;
        i--;
      }
    } else {
      formatted += maskChar;
      if (rawChar === maskChar) rawIndex++;
    }
  }

  return formatted;
}
