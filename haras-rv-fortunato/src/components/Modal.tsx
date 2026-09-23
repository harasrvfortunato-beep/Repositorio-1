import { useEffect, useRef, type ReactNode } from "react";
import { IconClose } from "./Icons";

type Props = {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
};

/** Modal acessível baseado no <dialog> nativo (fecha com Esc e clique fora). */
export function Modal({ open, onClose, labelledBy, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="m-auto w-[calc(100%-2rem)] max-w-4xl overflow-visible rounded-[2rem] bg-transparent p-0 backdrop:bg-musgo-900/70 backdrop:backdrop-blur-sm"
    >
      <div className="relative max-h-[90dvh] overflow-y-auto rounded-[2rem] bg-areia-50">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-4 right-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-areia-50/90 text-musgo-900 shadow-md hover:bg-white"
        >
          <IconClose />
        </button>
        {children}
      </div>
    </dialog>
  );
}
