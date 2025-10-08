import { useState, useCallback } from "react";

type MaskChar = {
  pattern: RegExp;
  transform?: (c: string) => string;
};

type MaskMap = Record<string, MaskChar>;

export function useMask(
  initialValue: string,
  mask: string,
  maskMap: MaskMap,
  onValueChange?: (value: string) => void,
  unmaskRegex: RegExp = /\D/g
) {
  const formatValue = useCallback(
    (raw: string) => {
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
    },
    [mask, maskMap]
  );

  // state já recebe o valor formatado
  const [value, setValue] = useState(() => formatValue(initialValue));

  const onChange = useCallback(
    (input: string) => {
      const cleanInput = input.replace(/\s/g, "");
      const formatted = formatValue(cleanInput);
      setValue(formatted);

      const currentUnmasked = formatted.replace(unmaskRegex, "");
      if (onValueChange) onValueChange(currentUnmasked);

      return formatted;
    },
    [formatValue, onValueChange, unmaskRegex]
  );

  const unmasked = value.replace(unmaskRegex, "");

  const isValid = useCallback(() => {
    if (!value) return false;

    let rawIndex = 0;
    for (let i = 0; i < mask.length; i++) {
      const maskChar = mask[i];
      const rawChar = value[rawIndex];

      if (!rawChar) return false;

      if (maskMap[maskChar]) {
        if (!maskMap[maskChar].pattern.test(rawChar)) return false;
        rawIndex++;
      } else {
        if (rawChar !== maskChar) return false;
        rawIndex++;
      }
    }
    return true;
  }, [value, mask, maskMap]);

  return { value, setValue, onChange, unmasked, isValid: isValid() };
}
