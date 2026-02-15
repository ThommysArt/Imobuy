"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMutation, usePaginatedQuery } from "convex/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { api } from "@/convex/_generated/api";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { ChatInput } from "@/components/chat-input";
import { useVisitorChat, getOrCreateVisitorToken } from "./visitor-chat-context";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const CHAT_MESSAGE_CLASS =
  "rounded-lg px-3 py-2 text-sm max-w-[85%] break-words [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2";

function MessageBubble({
  text,
  isVisitor,
}: { text: string; isVisitor: boolean }) {
  return (
    <div
      className={cn(
        "flex w-full",
        isVisitor ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          CHAT_MESSAGE_CLASS,
          isVisitor
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
      </div>
    </div>
  );
}

export function VisitorChatSheet() {
  const t = useTranslations("chat");
  const { open, closeChat } = useVisitorChat();
  const [visitorToken, setVisitorToken] = useState<string>("");
  const [inputValue, setInputValue] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const getOrCreateChat = useMutation(api.supportChat.getOrCreateChat);
  const sendMessage = useMutation(api.supportChat.sendMessageAsVisitor);

  useEffect(() => {
    if (open && typeof window !== "undefined") {
      setVisitorToken(getOrCreateVisitorToken());
    }
  }, [open]);

  useEffect(() => {
    if (!open || !visitorToken) return;
    getOrCreateChat({ visitorToken }).catch(() => {});
  }, [open, visitorToken, getOrCreateChat]);

  const {
    results: messages,
    status,
    loadMore,
    isLoading: isLoadingMore,
  } = usePaginatedQuery(
    api.supportChat.listMessagesForVisitor,
    visitorToken ? { visitorToken } : "skip",
    { initialNumItems: 20 }
  );

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      if (el.scrollTop < 80 && status === "CanLoadMore" && !isLoadingMore) {
        loadMore(20);
      }
    },
    [loadMore, status, isLoadingMore]
  );

  const handleSend = useCallback(() => {
    const text = inputValue.trim();
    if (!text || !visitorToken) return;
    sendMessage({ visitorToken, text });
    setInputValue("");
  }, [inputValue, visitorToken, sendMessage]);

  const chronologicalMessages = [...(messages ?? [])].reverse();

  return (
    <Sheet open={open} onOpenChange={(o) => !o && closeChat()}>
      <SheetContent
        side="right"
        className="flex w-full flex-col sm:max-w-md"
        showCloseButton={true}
      >
        <SheetHeader>
          <SheetTitle>{t("title")}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-1 flex-col min-h-0">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto space-y-2 py-2 flex flex-col"
          >
            {status === "LoadingFirstPage" && (
              <div className="flex justify-center py-4">
                <Spinner className="size-6" />
              </div>
            )}
            {status !== "LoadingFirstPage" && isLoadingMore && (
              <div className="flex justify-center py-2">
                <Spinner className="size-5" />
              </div>
            )}
            {chronologicalMessages.map((msg) => (
              <MessageBubble
                key={msg._id}
                text={msg.text}
                isVisitor={msg.sender === "visitor"}
              />
            ))}
          </div>
          <ChatInput
            value={inputValue}
            onChange={setInputValue}
            onSubmit={handleSend}
            placeholder={t("placeholder")}
            disabled={!visitorToken}
            sendAriaLabel={t("send")}
          />
          {inputValue && (
            <div className="mx-2 mb-2 rounded border bg-muted/50 p-2 text-xs text-muted-foreground [&_a]:text-primary [&_a]:underline">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {inputValue}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
