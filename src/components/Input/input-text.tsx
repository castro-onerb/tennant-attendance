import { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { inputTextConfig, inputTextFieldConfig } from './configs/input-text.config';

export type InputTextProps = {
  left?: ReactNode;
  right?: ReactNode;
} & Omit<React.ComponentPropsWithRef<'input'>, 'size'>;

export function InputText(props: InputTextProps) {
  const { onChange, left, right, className, ...rest } = props;
  return (
    <div className={cn(inputTextConfig())}>
      {left}
      <input {...rest} onChange={onChange} className={cn(inputTextFieldConfig(), className)} />
      {right}
    </div>
  );
}
