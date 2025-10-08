import { ReactNode } from "react"
import { ButtonRoot, ButtonRootProps } from "./button-root"

export type ButtonCompound = React.FC<ButtonRootProps> & {};

export const Button: ButtonCompound = Object.assign(ButtonRoot);
