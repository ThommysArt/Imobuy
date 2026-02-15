"use client"

import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { useVisitorChat } from "./visitor-chat-context"

export function FloatingCTA() {
  const t = useTranslations("common.button")
  const tChat = useTranslations("chat")
  const tAria = useTranslations("common.aria")
  const [isExpanded, setIsExpanded] = useState(false)
  const { openChat } = useVisitorChat()

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isExpanded && (
        <div className="flex flex-col gap-2 bg-white dark:bg-background rounded-lg shadow-lg border border-border p-2 min-w-[200px]">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-md transition-colors text-left w-full"
            onClick={() => { openChat(); setIsExpanded(false); }}
          >
            {tChat("title")}
          </button>
          <Link
            href="/contact"
            className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-md transition-colors"
            onClick={() => setIsExpanded(false)}
          >
            {t("contactUs")}
          </Link>
          <Link
            href="tel:+82212345678"
            className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-md transition-colors"
            onClick={() => setIsExpanded(false)}
          >
            {t("callNow")}
          </Link>
          <a
            href="https://wa.me/82123456789"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-md transition-colors"
            onClick={() => setIsExpanded(false)}
          >
            WhatsApp
          </a>
        </div>
      )}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all flex items-center justify-center",
          isExpanded && "bg-primary/90"
        )}
        aria-label={tAria("contactOptions")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn("transition-transform", isExpanded && "rotate-45")}
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
      </button>
    </div>
  )
}
