import { cn } from "@/utils/cn";
import { ReactNode } from "react";

export type H2Props = {
  children: ReactNode;
} & React.ComponentPropsWithRef<'h2'>;

export function H2(props: H2Props) {
  const { children, className } = props;
  return (
    <h2
      className={cn('font-bold text-primary-500 text-[28px] leading-[36px]', className)}>
      {children}
    </h2>
  );
}
