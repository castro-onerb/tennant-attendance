import { cn } from "@/utils/cn";
import { ReactNode } from "react";

export type H1Props = {
  children: ReactNode;
} & React.ComponentPropsWithRef<'h1'>;

export function H1(props: H1Props) {
  const { children, className } = props;
  return (
    <h1
      className={cn('font-bold text-primary-500 text-[40px] leading-[48px]', className)}>
      {children}
    </h1>
  );
}
