import { FormTitle } from "./form-title";
import { FormRoot, FormRootProps } from "./form-root";

export type FormCompound =React.FC<FormRootProps> & {
  Title: typeof FormTitle;
}

export const Form: FormCompound = Object.assign(FormRoot, {
  Title: FormTitle
})
