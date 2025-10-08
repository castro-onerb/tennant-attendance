import { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { modalBodyConfig } from "./configs/modal-body.config";

export type ModalBodyProps = {
  children: ReactNode;
} & React.ComponentPropsWithRef<'div'>;

export function ModalBody(props: ModalBodyProps) {
  const { children, className, ...rest } = props;
  return (
    <div {...rest} className={cn(modalBodyConfig(), className)}>
      {children}
    </div>
  );
}
