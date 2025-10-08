import { cva, VariantProps } from "class-variance-authority";

export const modalRootConfig = cva('bg-white flex flex-col max-h-[95dvh] rounded-[24px] border-2 border-gray-100 shadow-xl');

export type ModalRootVariants = VariantProps<typeof modalRootConfig>;
