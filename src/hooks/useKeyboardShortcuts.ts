"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useCrmStore } from "@/store/useCrmStore";
import { sound } from "@/lib/soundEffects";

export function useKeyboardShortcuts() {
  const router = useRouter();
  const pathname = usePathname();
  const { simulateInboundLead } = useCrmStore();

  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isPitchGuideOpen, setIsPitchGuideOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in form controls
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      // Don't trigger if Ctrl/Meta/Alt is pressed (except '?' which might use Shift)
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const key = e.key.toLowerCase();

      switch (key) {
        case "d":
          router.push("/dashboard");
          break;
        case "p":
          router.push("/pipeline");
          break;
        case "i":
          router.push("/inventory");
          break;
        case "v":
          router.push("/visits");
          break;
        case "w":
          router.push("/whatsapp");
          break;
        case "a":
          router.push("/ai-assistant");
          break;
        case "c":
          router.push("/commissions");
          break;
        case "b":
          router.push("/analytics");
          break;
        case "m":
          router.push("/mobile");
          break;
        case "s":
          simulateInboundLead("META_ADS");
          sound.playLeadChime();
          break;
        case "?":
        case "/":
          if (e.shiftKey || key === "?") {
            setIsShortcutsOpen((prev) => !prev);
          }
          break;
        case "g":
          setIsPitchGuideOpen((prev) => !prev);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, simulateInboundLead]);

  return {
    isShortcutsOpen,
    setIsShortcutsOpen,
    isPitchGuideOpen,
    setIsPitchGuideOpen,
  };
}
