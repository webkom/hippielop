// Modal as a separate component
import { type ReactNode, useEffect, useRef } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export const Modal = ({ open, onClose, children, className }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const onDialogClick = (event: MouseEvent) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (!isInDialog) {
        onClose();
      }
    };

    dialog.addEventListener("click", onDialogClick);
    return () => {
      dialog.removeEventListener("click", onDialogClick);
    };
  }, [onClose]);

  return (
    <dialog ref={dialogRef} onCancel={onClose} className={className}>
      <button
        onClick={onClose}
        className="absolute right-0 top-0 z-0 rounded px-3 py-1"
      >
        X
      </button>
      {children}
    </dialog>
  );
};
