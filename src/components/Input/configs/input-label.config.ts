import { cva, VariantProps } from "class-variance-authority";

export const inputLabelConfig = cva('flex gap-1 text-gray-800 text-base font-bold leading-[20px]');

export type InputLabelVariants = VariantProps<typeof inputLabelConfig>;
