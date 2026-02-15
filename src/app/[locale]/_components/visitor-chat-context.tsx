"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type VisitorChatContextValue = {
  open: boolean;
  openChat: () => void;
  closeChat: () => void;
};

const VisitorChatContext = createContext<VisitorChatContextValue | null>(null);

const VISITOR_TOKEN_KEY = "imobuy_visitor_token";

function getOrCreateVisitorToken(): string {
  if (typeof window === "undefined") return "";
  let token = localStorage.getItem(VISITOR_TOKEN_KEY);
  if (!token) {
    token = crypto.randomUUID();
    localStorage.setItem(VISITOR_TOKEN_KEY, token);
  }
  return token;
}

export function VisitorChatProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openChat = useCallback(() => setOpen(true), []);
  const closeChat = useCallback(() => setOpen(false), []);
  const value = useMemo(
    () => ({ open, openChat, closeChat }),
    [open, openChat, closeChat]
  );
  return (
    <VisitorChatContext.Provider value={value}>
      {children}
    </VisitorChatContext.Provider>
  );
}

export function useVisitorChat() {
  const ctx = useContext(VisitorChatContext);
  if (!ctx) throw new Error("useVisitorChat must be used within VisitorChatProvider");
  return ctx;
}

export { getOrCreateVisitorToken, VISITOR_TOKEN_KEY };
