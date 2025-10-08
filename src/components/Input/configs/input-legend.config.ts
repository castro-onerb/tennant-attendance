import { cva, VariantProps } from "class-variance-authority";

export const inputLegendConfig = cva('font-medium text-red-500');

export type InputLegendVariants = VariantProps<typeof inputLegendConfig>;
