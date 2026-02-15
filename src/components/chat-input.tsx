"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { SendHorizontalIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const MIN_ROWS = 1;
const MAX_HEIGHT_PX = 160;
const LINE_HEIGHT_APPROX = 24;
const MIN_HEIGHT_PX = 40;

export type ChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  disabled?: boolean;
  sendAriaLabel?: string;
  className?: string;
};

export function ChatInput({
  value,
  onChange,
  onSubmit,
  placeholder,
  disabled,
  sendAriaLabel = "Send",
  className,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const newHeight = Math.min(Math.max(el.scrollHeight, MIN_HEIGHT_PX), MAX_HEIGHT_PX);
    el.style.height = `${newHeight}px`;
  }, []);

  useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        const trimmed = value.trim();
        if (trimmed && !disabled) {
          onSubmit();
        }
      }
    },
    [value, disabled, onSubmit]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit();
    },
    [onSubmit]
  );

  return (
    <form onSubmit={handleSubmit} className={cn("border-t p-2", className)}>
      <InputGroup className="items-end rounded-lg border bg-background has-[textarea]:h-auto transition-[height] duration-200 ease-out">
        <InputGroupTextarea
          ref={textareaRef}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={MIN_ROWS}
          className={cn(
            "min-h-9 max-h-40 flex-1 resize-none overflow-y-auto py-2 transition-[height] duration-200 ease-out",
            "rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0"
          )}
        />
        <InputGroupAddon align="inline-end" className="self-end pb-1.5 pr-1">
          <InputGroupButton
            type="submit"
            size="icon-sm"
            disabled={disabled || !value.trim()}
            aria-label={sendAriaLabel}
          >
            <SendHorizontalIcon className="size-4" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
}
