import { DropdownRoot } from "./dropdown-root"

export type DropdownCompound = {
  Root: typeof DropdownRoot;
}

export const Dropdown: DropdownCompound = {
  Root: DropdownRoot,
}
