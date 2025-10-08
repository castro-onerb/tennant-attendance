import { cva, VariantProps } from "class-variance-authority";

export const inputTextConfig = cva('flex gap-2 bg-gray-200 rounded-[8px] text-gray-800');
export const inputTextFieldConfig = cva('p-3 rounded-[8px] bg-transparent text-base leading-[20px] font-medium flex-1 outline-none');

export type InputTextVariants = VariantProps<typeof inputTextConfig>;
export type InputTextFieldVariants = VariantProps<typeof inputTextFieldConfig>;
