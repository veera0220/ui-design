import { useState, useCallback } from "react";

export interface UseDisclosureReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

/**
 * useDisclosure — manages boolean open/close state.
 * Useful for modals, drawers, dropdowns.
 *
 * @example
 * const { isOpen, open, close } = useDisclosure();
 * <Button onClick={open}>Open Modal</Button>
 * <Modal open={isOpen} onClose={close} />
 */
export function useDisclosure(defaultOpen = false): UseDisclosureReturn {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const open   = useCallback(() => setIsOpen(true), []);
  const close  = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);
  return { isOpen, open, close, toggle };
}
