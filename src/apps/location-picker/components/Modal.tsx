import {useRef, useEffect, type ReactNode} from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  open: boolean;
  children: ReactNode;
  onClose: () => void;
}
function Modal({ open, children, onClose }: ModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;

    if (open) {
      el.showModal();
    } else {
      el.close();
    }
  }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {open ? children : null}
    </dialog>,
    document.getElementById('modal')!
  );
}

export default Modal;
