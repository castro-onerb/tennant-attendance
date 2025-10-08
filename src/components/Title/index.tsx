import { H1 } from "./h1"
import { H2 } from "./h2";
import { H3 } from "./h3";
import { H4 } from "./h4";

export type HeadlineCompound = {
  H1: typeof H1;
  H2: typeof H2;
  H3: typeof H3;
  H4: typeof H4;
}

export const Headline: HeadlineCompound = {
  H1,
  H2,
  H3,
  H4,
} as const;
