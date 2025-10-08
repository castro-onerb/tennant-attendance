import { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { modalHeaderConfig } from "./configs/modal-header.config";
import { Icon } from "../Icon";

export type ModalHeaderProps = {
  children: ReactNode;
} & React.ComponentPropsWithRef<'div'>;

export function ModalHeader(props: ModalHeaderProps) {
  const { children, className, ...rest } = props;
  return (
    <div {...rest} className={cn(modalHeaderConfig() ,className)}>{children}</div>
  );
}

export type ModalHeaderCloseProps = {
  close: () => void;
} & React.ComponentPropsWithRef<'span'>;

export function ModalHeaderClose(props: ModalHeaderCloseProps) {
  const { close, className } = props;

  return (
    <span onClick={close} className={cn('cursor-pointer', className)}>
      <Icon name='close_regular' className="text-gray-700" size={30} />
    </span>
  );
}
