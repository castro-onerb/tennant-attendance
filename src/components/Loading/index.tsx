import { Icon } from "../Icon";
import { Modal } from "../Modal";

export type LoadingModalProps = {
  className?: string;
};
export function LoadingModal(props: LoadingModalProps) {
  const { className } = props;
  return (
    <Modal className={className}>
      <Modal.Body>
        <Icon
          name='loading_line'
          size={70}
          className='animate-spin text-current' />
      </Modal.Body>
    </Modal>
  );
}
