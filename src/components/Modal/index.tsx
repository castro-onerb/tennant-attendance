import { ModalRoot, ModalRootProps } from "./modal-root";
import { ModalHeader, ModalHeaderClose } from "./modal-header";
import { ModalBody } from "./modal-body";
import { ModalFooter } from "./modal-footer";

export type ModalCompound = React.FC<ModalRootProps> & {
  Header: typeof ModalHeader;
  Close: typeof ModalHeaderClose;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
}

export const Modal: ModalCompound = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Close: ModalHeaderClose,
  Body: ModalBody,
  Footer: ModalFooter
});
