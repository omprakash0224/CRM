"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Check, X, Sparkles, Volume2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCrmStore } from "@/store/useCrmStore";
import { sound } from "@/lib/soundEffects";

interface VoiceNoteModalProps {
  open: boolean;
  onClose: () => void;
  leadId?: string;
  leadName?: string;
}

export function VoiceNoteModal({
  open,
  onClose,
  leadId,
  leadName = "Client",
}: VoiceNoteModalProps) {
  const { addLeadActivity, setNotification, leads } = useCrmStore();

  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [transcription, setTranscription] = useState("");
  const [hasRecorded, setHasRecorded] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const sampleTranscripts = [
    `Met with ${leadName} on-site at Godrej Woods. Loved the 3BHK high-floor park view. Requested formal cost sheet with 2% festive floor rise waiver. Next follow-up scheduled for Monday 11:30 AM.`,
    `Quick call with ${leadName}. Confirmed spouse is visiting the sample flat this Saturday. Arranging private chauffeur pickup. High purchase intent.`,
    `${leadName} reviewed draft agreement. Hesitation regarding club membership charges. Recommended applying 50% waiver to lock token deposit today.`,
  ];

  const handleStartRecording = () => {
    setIsRecording(true);
    setHasRecorded(false);
    setSeconds(0);
    setTranscription("");
    sound.playGpsPing();

    timerRef.current = setInterval(() => {
      setSeconds((prev) => {
        const next = prev + 1;
        if (next >= 6) {
          // Auto complete recording after 6 seconds
          handleStopRecording();
        }
        return next;
      });
    }, 1000);
  };

  const handleStopRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRecording(false);
    setHasRecorded(true);

    // Pick random realistic transcript
    const chosen =
      sampleTranscripts[Math.floor(Math.random() * sampleTranscripts.length)];
    setTranscription(chosen);
    sound.playLeadChime();
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  if (!open) return null;

  const handleSave = () => {
    if (!transcription.trim()) return;

    const targetLead = leadId || leads[0]?.id;
    if (targetLead) {
      addLeadActivity(targetLead, {
        type: "NOTE",
        description: `🎙️ Audio Voice Note Transcribed: "${transcription}"`,
        agentName: "Rajesh Sharma (Mobile Voice)",
      });
      setNotification(`✓ Voice note saved to ${leadName}'s timeline!`);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-pure/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-sm bg-white border border-hairline rounded-3xl p-6 shadow-elevation-3 space-y-4 animate-in zoom-in-95 duration-200 text-ink-pure"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-hairline pb-3">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-aubergine-50 text-aubergine border border-aubergine-200 flex items-center justify-center shadow-sm">
              <Mic className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-ink-pure">Hands-Free Voice Note</h3>
              <p className="text-[10px] text-ink-muted">Dictate call note for {leadName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-ink-muted hover:text-ink-pure hover:bg-canvas-cream transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Center Microphone Button & Waveform */}
        <div className="flex flex-col items-center justify-center py-4 space-y-3">
          <button
            type="button"
            onClick={isRecording ? handleStopRecording : handleStartRecording}
            className={`h-20 w-20 rounded-full flex items-center justify-center transition-all duration-300 relative ${
              isRecording
                ? "bg-rose-600 text-white shadow-lg shadow-rose-500/40 animate-pulse"
                : "bg-aubergine hover:bg-aubergine-dark text-white shadow-lg shadow-aubergine/30 hover:scale-105"
            }`}
          >
            {isRecording ? (
              <MicOff className="h-8 w-8" />
            ) : (
              <Mic className="h-8 w-8" />
            )}
            {isRecording && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500" />
              </span>
            )}
          </button>

          {/* Recording Timer */}
          <div className="text-center">
            <span className="font-mono text-base font-black text-ink-pure">
              00:{seconds.toString().padStart(2, "0")}
            </span>
            <p className="text-[11px] text-ink-muted mt-0.5">
              {isRecording
                ? "Listening... Tap to stop"
                : hasRecorded
                ? "Recording captured & transcribed"
                : "Tap microphone to dictate"}
            </p>
          </div>

          {/* Animated Sound Waves (when recording) */}
          {isRecording && (
            <div className="flex items-center gap-1 h-6">
              {[40, 80, 50, 90, 70, 100, 60, 85, 45, 95].map((h, i) => (
                <div
                  key={i}
                  className="w-1 bg-aubergine rounded-full animate-pulse"
                  style={{
                    height: `${h}%`,
                    animationDelay: `${i * 0.08}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Transcription Output */}
        {transcription && (
          <div className="p-3.5 rounded-2xl border border-aubergine-200 bg-aubergine-50/50 space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-aubergine">
              <Sparkles className="h-3.5 w-3.5" />
              <span>AI Speech-to-Text Transcription:</span>
            </div>
            <p className="text-ink-base leading-relaxed text-[11px] italic bg-white p-2.5 rounded-xl border border-hairline shadow-sm">
              &ldquo;{transcription}&rdquo;
            </p>
          </div>
        )}

        {/* Action Button */}
        {hasRecorded && (
          <Button
            type="button"
            onClick={handleSave}
            className="w-full h-10 rounded-full bg-aubergine hover:bg-aubergine-dark text-white font-bold text-xs gap-1.5 shadow-sm"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save Note to Lead Timeline</span>
          </Button>
        )}
      </div>
    </div>
  );
}
