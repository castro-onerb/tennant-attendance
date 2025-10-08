export type { InputTextProps } from "./input-text";
import { InputText } from "./input-text";
import { InputRoot } from "./input-root";
import { InputLabel } from "./input-label";
import { InputLegend } from "./input-legend";
import { ReactNode } from "react";

export type InputCompound = React.FC<{ children: ReactNode }> & {
  Label: typeof InputLabel;
  Text: typeof InputText;
  Legend: typeof InputLegend;
};

export const Input: InputCompound = Object.assign(InputRoot, {
  Label: InputLabel,
  Text: InputText,
  Legend: InputLegend,
});
