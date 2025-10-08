import { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { inputLabelConfig } from "./configs/input-label.config";
import { Icon } from "../Icon";

export type InputLabelProps = {
  required?: boolean;
  children: ReactNode;
} & React.ComponentPropsWithRef<'label'>;

export function InputLabel(props: InputLabelProps) {
  const { required, children, className, ...rest } = props;
  return (
    <label
      {...rest}
      className={cn(inputLabelConfig(), className)}>
      {children} {required && <Icon size={10} className='text-red-500' name='asterisk_line' />}
    </label>
  );
}
