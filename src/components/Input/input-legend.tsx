import { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { inputLegendConfig } from "./configs/input-legend.config";

export type InputLegendProps = {
  children: ReactNode;
} & React.ComponentPropsWithRef<'span'>;

export function InputLegend(props: InputLegendProps) {
  const { children, className, ...rest } = props;
  return (
    <span {...rest} className={cn(inputLegendConfig(), className)}>{children}</span>
  );
}
