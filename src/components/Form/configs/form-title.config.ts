import { cva, VariantProps } from "class-variance-authority";

export const formTitleConfig = cva('flex gap-1.5 text-[18px] font-bold leading-[24px] text-primary-500');

export type FormTitleVariants = VariantProps<typeof formTitleConfig>;
