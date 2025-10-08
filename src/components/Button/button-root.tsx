import { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { buttonConfig, type ButtonVariants } from "./configs/button-root.config";

export type ButtonRootProps = {
  children: ReactNode;
} & React.ComponentPropsWithRef<'button'> &
  ButtonVariants;

export function ButtonRoot(props: ButtonRootProps) {
  const { children, className, disabled, variant, color, corner, ...rest } = props;
  return (
    <button
      {...rest}
      disabled={disabled}
      className={cn(buttonConfig({ variant, color, corner, disabled: !!disabled }), className)}
    >
      {children}
    </button>
  );
}
