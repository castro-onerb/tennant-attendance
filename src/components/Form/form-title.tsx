import { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { formTitleConfig } from "./configs/form-title.config";

export type FormTitleProps = {
  children: ReactNode;
} & React.ComponentPropsWithRef<'legend'>;

export function FormTitle(props: FormTitleProps) {
  const { children, className, ...rest } = props;
  return (
    <legend {...rest} className={cn(formTitleConfig(), className)}>{children}</legend>
  );
}
