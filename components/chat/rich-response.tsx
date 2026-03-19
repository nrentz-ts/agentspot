"use client";

import { CheckCircle2, Mail, Zap, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RichContent } from "@/lib/types";
import { cn } from "@/lib/utils";

interface RichResponseProps {
  content: RichContent;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function RichResponse({ content, onConfirm, onCancel }: RichResponseProps) {
  switch (content.type) {
    case "text":
      return (
        <p className="text-[14px] leading-relaxed whitespace-pre-wrap">
          {content.text}
        </p>
      );

    case "action-card":
      return (
        <div className="rounded-xl border border-primary/15 bg-gradient-to-br from-primary/[0.04] to-primary/[0.08] p-4">
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Zap className="h-4 w-4 text-primary" />
            </div>
            <div className="space-y-1">
              <h4 className="text-[13px] font-semibold">{content.title}</h4>
              <p className="text-[13px] leading-relaxed text-muted-foreground whitespace-pre-line">
                {content.description}
              </p>
            </div>
          </div>
        </div>
      );

    case "step-list":
      return (
        <div className="space-y-2.5">
          {content.title && (
            <h4 className="text-[13px] font-semibold">{content.title}</h4>
          )}
          <div className="space-y-2">
            {content.steps?.map((step, i) => (
              <div key={i} className="flex items-start gap-2.5 text-[13px]">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                  {i + 1}
                </span>
                <span className="leading-relaxed text-muted-foreground">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      );

    case "email-summary":
      return (
        <div className="space-y-2.5">
          {content.title && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary/60" />
              <h4 className="text-[13px] font-semibold">{content.title}</h4>
              <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                {content.items?.length} emails
              </span>
            </div>
          )}
          <div className="space-y-1.5">
            {content.items?.map((email, i) => (
              <div
                key={i}
                className={cn(
                  "cursor-pointer rounded-lg border border-border p-3 transition-colors hover:bg-accent/50",
                  i === 0 && "border-primary/20 bg-primary/[0.03]"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-medium">{email.from}</span>
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40" />
                </div>
                <p className="text-[13px] font-medium text-foreground/80">
                  {email.subject}
                </p>
                <p className="mt-0.5 line-clamp-2 text-[12px] text-muted-foreground">
                  {email.snippet}
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    case "confirmation":
      return (
        <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/[0.04] to-primary/[0.1] p-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div className="space-y-3">
              <div className="space-y-1">
                <h4 className="text-[13px] font-semibold">{content.title}</h4>
                <p className="text-[13px] text-muted-foreground">
                  {content.description}
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="h-8 rounded-lg text-[12px]" onClick={onConfirm}>
                  {content.confirmLabel ?? "Confirm"}
                </Button>
                <Button size="sm" variant="outline" className="h-8 rounded-lg text-[12px]" onClick={onCancel}>
                  {content.cancelLabel ?? "Cancel"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}
