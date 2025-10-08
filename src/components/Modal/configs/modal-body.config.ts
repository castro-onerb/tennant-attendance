import { cva, VariantProps } from "class-variance-authority";

export const modalBodyConfig = cva('flex-1 flex flex-col gap-6 p-6 overflow-y-auto');

export type ModalBodyVariants = VariantProps<typeof modalBodyConfig>;
