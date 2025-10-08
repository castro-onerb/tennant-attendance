import { cn } from "@/utils/cn";
import { ReactNode } from "react";

export type H4Props = {
  children: ReactNode;
} & React.ComponentPropsWithRef<'h4'>;

export function H4(props: H4Props) {
  const { children, className } = props;
  return (
    <h4
      className={cn('font-bold text-primary-500 text-[18px] leading-[24px]', className)}>
      {children}
    </h4>
  );
}
