import { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { formConfig } from "./configs/form.config";

export type FormRootProps = {
  children: ReactNode;
} & React.ComponentPropsWithRef<'form'>;

export function FormRoot(props: FormRootProps) {
  const { children, className, ...rest } = props;
  return (
    <form {...rest} className={cn(formConfig(), className)}>{children}</form>
  );
}
