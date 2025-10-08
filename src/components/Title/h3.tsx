import { cn } from "@/utils/cn";
import { ReactNode } from "react";

export type H3Props = {
  children: ReactNode;
} & React.ComponentPropsWithRef<'h3'>;

export function H3(props: H3Props) {
  const { children, className } = props;
  return (
    <h3
      className={cn('font-bold text-primary-500 text-[20px] leading-[28px]', className)}>
      {children}
    </h3>
  );
}
