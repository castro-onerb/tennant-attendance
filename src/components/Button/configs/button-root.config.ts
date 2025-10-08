import { cva, VariantProps } from "class-variance-authority";

export const buttonConfig = cva(
  "flex justify-center items-center gap-5 p-5 text-[24px] leading-none font-medium cursor-pointer transition",
  {
    variants: {
      disabled: {
        true: "cursor-not-allowed opacity-45",
        false: "",
      },
      variant: {
        contained: '',
        outlined: 'border-2'
      },
      corner: {
        rounded: 'rounded-[16px]',
        full: 'rounded-full'
      },
      color: {
        primary: '',
        gray: ''
      },
    },
    compoundVariants: [
      {
        variant: 'contained',
        color: 'primary',
        class: 'bg-primary-500 hover:bg-primary-500/90 text-white'
      },
      {
        variant: 'contained',
        color: 'gray',
        class: 'bg-gray-500 hover:bg-gray-500/90 text-white'
      },

      {
        variant: 'outlined',
        color: 'primary',
        class: 'border-primary-500 hover:border-primary-500/90 text-primary-500 hover:text-primary-500/90'
      },
      {
        variant: 'outlined',
        color: 'gray',
        class: 'border-gray-500 hover:border-gray-500/90 text-gray-500 hover:text-gray-500/90'
      },
    ],
    defaultVariants: {
      disabled: false,
      variant: 'contained',
      corner: 'rounded',
      color: 'primary'
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonConfig>;
