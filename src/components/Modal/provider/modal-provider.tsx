import clsx from "clsx";
import { createContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

export type ModalId = string;

export type OpenMode =
  | 'push'        // empilha por cima
  | 'replace'     // substitui o modal do topo (se houver)
  | 'singleton'   // garante uma única instância (por chave)
  | 'replaceAll'; //Substitui todos os modais abertos

export type GlobalModalOptions = {
  id?: ModalId;
  mode?: OpenMode;
  singletonKey?: string;

  backdrop?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  className?: string;

  onClose?: () => void;
}

export type ModalEntry = {
  id: ModalId;
  content: ReactNode;
  options: Required<Pick<GlobalModalOptions, 'backdrop' | 'closeOnBackdrop' | 'closeOnEsc'>> &
    Omit<GlobalModalOptions, 'backdrop' | 'closeOnBackdrop' | 'closeOnEsc'>;
}

export type Ctx = {
  open: (content: ReactNode, options?: GlobalModalOptions) => ModalId;
  replaceTop: (content: React.ReactNode, options?: Omit<GlobalModalOptions, 'mode'>) => ModalId;
  close: (id: ModalId) => void;
  closeTop: () => void;
  closeAll: () => void;
  isOpenSingleton: (key: string) => boolean;
  stack: ModalEntry[];
}

const GlobalModalContext = createContext<Ctx | null>(null);

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export function GlobalModalProvider({ children }: { children: ReactNode }) {
  const [stack, setStack] = useState<ModalEntry[]>([]);
  const portalElRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let el = document.getElementById('global-modal-root');
    if (!el) {
      el = document.createElement('div');
      el.id = 'global-modal-root';
      document.body.appendChild(el);
    }
    portalElRef.current = el;
  }, []);

  const close = (id: ModalId) => {
    setStack((prev) => {
      const entry = prev.find((m) => m.id === id);
      entry?.options.onClose?.();
      return prev.filter((m) => m.id !== id);
    });
  };

  const closeTop = () => {
    setStack((prev) => {
      if (prev.length === 0) return prev;
      const top = prev[prev.length - 1];
      top.options.onClose?.();
      return prev.slice(0, -1);
    });
  };

  const closeAll = () => {
    setStack((prev) => {
      prev.forEach((m) => m.options.onClose?.());
      return [];
    });
  };

  const isOpenSingleton = (key: string) =>
    stack.some((m) => m.options.singletonKey === key);

  const open = (content: React.ReactNode, options?: GlobalModalOptions & { mode?: OpenMode }): ModalId => {
    const id = options?.id ?? uid();
    const normalized: ModalEntry = {
      id,
      content,
      options: {
        mode: options?.mode ?? 'push',
        singletonKey: options?.singletonKey,
        backdrop: options?.backdrop ?? true,
        closeOnBackdrop: options?.closeOnBackdrop ?? true,
        closeOnEsc: options?.closeOnEsc ?? true,
        className: options?.className,
        onClose: options?.onClose,
      },
    };

    setStack((prev) => {
      if (normalized.options.mode === 'singleton' && normalized.options.singletonKey) {
        const idx = prev.findIndex((m) => m.options.singletonKey === normalized.options.singletonKey);
        if (idx >= 0) {
          const newStack = prev.slice();
          newStack[idx] = { ...normalized, id: prev[idx].id };
          return newStack;
        }
        return [...prev, normalized];
      }

      if (normalized.options.mode === 'replace' && prev.length > 0) {
        const newStack = prev.slice();
        const top = newStack[newStack.length - 1];
        top.options.onClose?.();
        newStack[newStack.length - 1] = normalized;
        return newStack;
      }

      if (normalized.options.mode === 'replaceAll') {
        // Fecha todos os modais existentes
        prev.forEach(m => m.options.onClose?.());
        return [normalized];
      }

      return [...prev, normalized];
    });

    return id;
  }


  const replaceTop: Ctx['replaceTop'] = (content, options) =>
    open(content, { ...options, mode: 'replace' });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      const top = stack[stack.length - 1];
      if (top?.options.closeOnEsc) closeTop();
    };
    if (stack.length > 0) {
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }
  }, [stack]);

  const ctx = useMemo<Ctx>(
    () => ({ open, replaceTop, close, closeTop, closeAll, isOpenSingleton, stack }),
    [stack]
  );

  return (
    <GlobalModalContext.Provider value={ctx}>
      {children}
      {portalElRef.current &&
        createPortal(
          <ModalStackRenderer stack={stack} onCloseId={close} />,
          portalElRef.current
        )}
    </GlobalModalContext.Provider>
  );
}

export { GlobalModalContext };

function ModalStackRenderer({
  stack,
  onCloseId,
}: {
  stack: ModalEntry[];
  onCloseId: (id: ModalId) => void;
}) {
  return (
    <>
      {stack.map((entry, i) => {
        const z = 1000 + i * 10;
        return (
          <div
            key={entry.id}
            className={clsx(
              'fixed inset-0 flex items-center justify-center',
              entry.options.backdrop && 'bg-black/15'
            )}
            style={{ zIndex: z }}
            onClick={() => {
              if (entry.options.closeOnBackdrop) onCloseId(entry.id);
            }}
          >
            {entry.content}
          </div>
        );
      })}
    </>
  );
}
