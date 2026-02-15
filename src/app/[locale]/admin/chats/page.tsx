"use client";

import { useCallback, useState } from "react";
import { useMutation, usePaginatedQuery, useQuery } from "convex/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ChatInput } from "@/components/chat-input";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronLeftIcon } from "lucide-react";

const CHAT_MESSAGE_CLASS =
  "rounded-lg px-3 py-2 text-sm max-w-[85%] break-words [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2";

function AdminMessageBubble({
  text,
  isAdmin,
}: { text: string; isAdmin: boolean }) {
  return (
    <div
      className={cn(
        "flex w-full",
        isAdmin ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          CHAT_MESSAGE_CLASS,
          isAdmin ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        )}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
      </div>
    </div>
  );
}

function visitorLabel(visitorToken: string) {
  return `Visitor ${visitorToken.slice(0, 8)}`;
}

export default function AdminChatsPage() {
  const t = useTranslations("admin");
  const tChat = useTranslations("chat");
  const [selectedChatId, setSelectedChatId] = useState<Id<"support_chats"> | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [takeOverOpen, setTakeOverOpen] = useState(false);
  const [pendingTakeOverId, setPendingTakeOverId] = useState<Id<"support_chats"> | null>(null);

  const chats = useQuery(api.supportChat.listChats, {});
  const currentUserId = useQuery(api.supportChat.getCurrentAdminUserId, {});
  const selectedChat = useQuery(
    api.supportChat.getChat,
    selectedChatId ? { chatId: selectedChatId } : "skip"
  );
  const takeOverMutation = useMutation(api.supportChat.takeOverChat);
  const sendMessage = useMutation(api.supportChat.sendMessageAsAdmin);

  const {
    results: messages,
    status,
    loadMore,
    isLoading: isLoadingMore,
  } = usePaginatedQuery(
    api.supportChat.listMessagesForAdmin,
    selectedChatId ? { chatId: selectedChatId } : "skip",
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

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const text = inputValue.trim();
      if (!text || !selectedChatId) return;
      sendMessage({ chatId: selectedChatId, text });
      setInputValue("");
    },
    [inputValue, selectedChatId, sendMessage]
  );

  const handleTakeOverClick = useCallback(() => {
    if (!selectedChatId) return;
    setPendingTakeOverId(selectedChatId);
    setTakeOverOpen(true);
  }, [selectedChatId]);

  const handleTakeOverConfirm = useCallback(async () => {
    if (!pendingTakeOverId) return;
    await takeOverMutation({ chatId: pendingTakeOverId });
    setTakeOverOpen(false);
    setPendingTakeOverId(null);
  }, [pendingTakeOverId, takeOverMutation]);

  const isRespondent = selectedChat?.respondentId && currentUserId && selectedChat.respondentId === currentUserId;
  const canTakeOver = selectedChat?.respondentId && currentUserId && selectedChat.respondentId !== currentUserId;
  const chronologicalMessages = [...(messages ?? [])].reverse();
  const isMobile = useIsMobile();

  const chatListPanel = (
    <aside
      className={cn(
        "flex flex-col border-border bg-muted/30",
        "rounded-r-lg",
        isMobile ? "w-full min-h-0 flex-1 border-b" : "w-52 shrink-0 border-r"
      )}
    >
      <div className="border-b border-border px-3 py-2">
        <h2 className="text-sm font-medium text-foreground">{t("chatsTitle")}</h2>
      </div>
      <div className="flex-1 overflow-y-auto min-h-0">
        {chats === undefined ? (
          <div className="flex justify-center p-4">
            <Spinner className="size-5" />
          </div>
        ) : chats.length === 0 ? (
          <p className="px-3 py-4 text-sm text-muted-foreground">{t("noChatSelected")}</p>
        ) : (
          <ul className="p-1">
            {chats.map((chat) => (
              <li key={chat._id}>
                <button
                  type="button"
                  onClick={() => setSelectedChatId(chat._id)}
                  className={cn(
                    "w-full rounded-md px-2 py-2 text-left text-sm transition-colors",
                    selectedChatId === chat._id
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <span className="block truncate">
                    {visitorLabel(chat.visitorToken)}
                  </span>
                  <span className="block truncate text-xs opacity-80">
                    {formatDistanceToNow(chat.updatedAt, { addSuffix: true })}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );

  const threadPanel = (
    <div className="flex min-w-0 flex-1 flex-col bg-background min-h-0">
      <div className="border-b border-border px-3 py-2 flex items-center gap-2 shrink-0">
        {isMobile && (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => setSelectedChatId(null)}
            aria-label={t("backToChats")}
            className="shrink-0 -ml-1"
          >
            <ChevronLeftIcon className="size-5" />
          </Button>
        )}
        <span className="text-sm font-medium truncate min-w-0">
          {selectedChat && visitorLabel(selectedChat.visitorToken)}
        </span>
        <div className="flex items-center gap-2 shrink-0 ml-auto">
          {isRespondent && (
            <span className="text-xs text-muted-foreground hidden sm:inline">{t("youResponding")}</span>
          )}
          {canTakeOver && (
            <Button variant="outline" size="sm" onClick={handleTakeOverClick}>
              {t("takeOver")}
            </Button>
          )}
        </div>
      </div>
      <div
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto space-y-2 py-2 px-4 flex flex-col min-h-0"
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
          <AdminMessageBubble
            key={msg._id}
            text={msg.text}
            isAdmin={msg.sender === "admin"}
          />
        ))}
      </div>
      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSubmit={() => {
          const text = inputValue.trim();
          if (!text || !selectedChatId || canTakeOver) return;
          sendMessage({ chatId: selectedChatId, text });
          setInputValue("");
        }}
        placeholder={tChat("placeholder")}
        disabled={!selectedChatId || !!canTakeOver}
        sendAriaLabel={tChat("send")}
      />
      {inputValue && (
        <div className="mx-2 mb-2 rounded border bg-muted/50 p-2 text-xs text-muted-foreground [&_a]:text-primary [&_a]:underline">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{inputValue}</ReactMarkdown>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-[calc(100vh-7rem)] w-full min-w-0 flex-col md:flex-row">
      {/* Mobile: show list OR thread full-width (one at a time). Desktop: side-by-side */}
      {isMobile ? (
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          {!selectedChatId ? chatListPanel : threadPanel}
        </div>
      ) : (
        <>
          {chatListPanel}
          {!selectedChatId ? (
            <div className="flex min-w-0 flex-1 flex-col bg-background items-center justify-center text-muted-foreground p-8">
              {t("noChatSelected")}
            </div>
          ) : (
            threadPanel
          )}
        </>
      )}

      <AlertDialog open={takeOverOpen} onOpenChange={setTakeOverOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("takeOverConfirmTitle")}</AlertDialogTitle>
            <AlertDialogDescription>{t("takeOverConfirmDescription")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("takeOverConfirmCancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={handleTakeOverConfirm}>{t("takeOverConfirmAction")}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
