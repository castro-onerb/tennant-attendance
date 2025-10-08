import { cva, VariantProps } from "class-variance-authority";

export const modalHeaderConfig = cva('flex justify-between gap-6 p-6 border-b-2 border-gray-100');

export type ModalHeaderVariants = VariantProps<typeof modalHeaderConfig>;
