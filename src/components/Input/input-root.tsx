import { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type InputRootProps = {
  children: ReactNode;
} & React.ComponentPropsWithRef<'div'>;

export function InputRoot({ children, className, ...rest }: InputRootProps) {
  return (
    <div {...rest} className={cn('flex flex-col gap-1', className)}>{children}</div>
  );
}
