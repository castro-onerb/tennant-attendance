import { cva, VariantProps } from "class-variance-authority";

export const formConfig = cva('flex flex-col gap-3 p-[24px] rounded-[24px] bg-gray-50');

export type FormConfigVariants = VariantProps<typeof formConfig>;
