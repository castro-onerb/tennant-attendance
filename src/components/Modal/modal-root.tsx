import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { modalRootConfig } from './configs/modal-root.config';

export type ModalRootProps = {
  children: ReactNode;
  onClose?: () => void;
} & React.ComponentPropsWithRef<'div'>;

export function ModalRoot(props: ModalRootProps) {
  const { children, className, onClose, ...rest } = props;

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose?.();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        ref={undefined}
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
      >
      <div
        {...rest}
        className={cn(modalRootConfig(), className)}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
      </motion.div>
    </AnimatePresence>
  );
}
