import { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { modalFooterConfig } from "./configs/modal-footer.config";

export type ModalFooterProps = {
  children: ReactNode;
} & React.ComponentPropsWithRef<'div'>;

export function ModalFooter(props: ModalFooterProps) {
  const { children, className, ...rest } = props;
  return (
    <div {...rest} className={cn(modalFooterConfig() ,className)}>{children}</div>
  );
}
