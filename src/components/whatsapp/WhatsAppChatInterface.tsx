"use client";

import React, { useState } from "react";
import { useCrmStore } from "@/store/useCrmStore";
import { Lead, WhatsAppMessage } from "@/types";
import { SEED_WHATSAPP_TEMPLATES } from "@/data/templates";
import {
  MessageSquare,
  Send,
  Phone,
  CheckCheck,
  FileText,
  Search,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatRelativeTime } from "@/lib/utils";

interface WhatsAppChatInterfaceProps {
  onCallClient: (lead: Lead) => void;
}

export function WhatsAppChatInterface({
  onCallClient,
}: WhatsAppChatInterfaceProps) {
  const { leads, threads, sendWhatsAppMessage, simulateClientReply } =
    useCrmStore();

  const [selectedLeadId, setSelectedLeadId] = useState<string>(
    leads[0]?.id || "lead-new-1"
  );
  const [inputText, setInputText] = useState("");
  const [search, setSearch] = useState("");

  const activeLead = leads.find((l) => l.id === selectedLeadId) || leads[0];
  const activeThread: WhatsAppMessage[] = threads[activeLead.id] || [];

  const filteredLeads = leads.filter((l) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      l.name.toLowerCase().includes(q) ||
      l.phone.includes(q) ||
      (l.preferredProject && l.preferredProject.toLowerCase().includes(q))
    );
  });

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    sendWhatsAppMessage(activeLead.id, inputText);
    setInputText("");
  };

  const handleApplyTemplate = (templateId: string) => {
    const template = SEED_WHATSAPP_TEMPLATES.find((t) => t.id === templateId);
    if (!template) return;

    let populated = template.bodyText
      .replace(/{{1}}/g, activeLead.name)
      .replace(/{{2}}/g, activeLead.preferredProject || "Gurugram Luxury Residences")
      .replace(/{{3}}/g, activeLead.preferredLocation || "Prime Location")
      .replace(/{{4}}/g, activeLead.preferredBhk || "3BHK Luxury")
      .replace(/{{5}}/g, "Rajesh Sharma")
      .replace(/{{6}}/g, "+91 98711 22334");

    sendWhatsAppMessage(activeLead.id, populated, true, template.title);
  };

  const handleSimulateReply = () => {
    simulateClientReply(activeLead.id);
  };

  return (
    <div className="rounded-2xl border border-hairline bg-white overflow-hidden shadow-elevation-1 flex flex-col md:flex-row h-[720px]">
      {/* Left Column: Conversations List */}
      <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-hairline flex flex-col bg-[#fdfbf7] shrink-0">
        {/* Search header */}
        <div className="p-4 border-b border-hairline space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-ink flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4 text-aubergine" />
              <span>WhatsApp Inquiries</span>
            </span>
            <Badge variant="aubergine" className="text-[10px]">
              Meta Cloud API
            </Badge>
          </div>

          <div className="relative">
            <Search className="absolute left-2.5 top-3 h-3 w-3 text-ink-mute" />
            <Input
              placeholder="Search chat or client..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-9 text-xs"
            />
          </div>
        </div>

        {/* Lead Chats List */}
        <div className="flex-1 overflow-y-auto divide-y divide-hairline">
          {filteredLeads.map((lead) => {
            const isSelected = lead.id === activeLead.id;
            const thread = threads[lead.id] || [];
            const lastMsg = thread[thread.length - 1];

            return (
              <div
                key={lead.id}
                onClick={() => setSelectedLeadId(lead.id)}
                className={`p-3.5 cursor-pointer transition-all flex items-start space-x-3 select-none ${
                  isSelected
                    ? "bg-white border-l-4 border-aubergine shadow-sm"
                    : "hover:bg-white/60 border-l-4 border-transparent"
                }`}
              >
                <div className="relative shrink-0">
                  <div className="h-10 w-10 rounded-full bg-canvas-lavender text-aubergine flex items-center justify-center font-bold text-xs ring-1 ring-hairline">
                    {lead.name[0]}
                  </div>
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#007a5a] ring-2 ring-white" />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-ink truncate">
                      {lead.name}
                    </span>
                    <span className="text-[10px] text-ink-mute font-mono">
                      {lastMsg
                        ? formatRelativeTime(lastMsg.timestamp)
                        : formatRelativeTime(lead.updatedAt)}
                    </span>
                  </div>

                  <p className="text-[11px] text-ink-mute truncate">
                    {lastMsg ? lastMsg.message : `Interested in ${lead.preferredProject}`}
                  </p>

                  <div className="flex items-center space-x-2 text-[10px] text-ink-mute">
                    <span className="text-aubergine font-bold truncate">
                      {lead.preferredProject || "Gurugram"}
                    </span>
                    <span>•</span>
                    <span className="font-mono text-[#d97706] font-bold">
                      AI: {lead.aiScore}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Chat Window */}
      <div className="flex-1 flex flex-col bg-[#fdfbf7] overflow-hidden">
        {/* Chat Window Header */}
        <div className="p-4 border-b border-hairline bg-white flex items-center justify-between gap-3 shrink-0 shadow-sm">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="h-10 w-10 rounded-full bg-canvas-lavender text-aubergine flex items-center justify-center font-bold text-sm ring-1 ring-hairline shrink-0">
              {activeLead.name[0]}
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-sm text-ink truncate">
                  {activeLead.name}
                </h3>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#ecfdf5] text-[#007a5a] border border-[#a7f3d0] gap-0.5">
                  <ShieldCheck className="h-2.5 w-2.5" />
                  Verified Business
                </span>
              </div>
              <p className="text-[11px] text-ink-mute font-mono flex items-center gap-1.5 truncate">
                <span>{activeLead.phone}</span>
                <span>•</span>
                <span className="text-aubergine font-semibold">
                  {activeLead.preferredProject} ({activeLead.preferredBhk})
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {/* Simulate Client Reply button */}
            <Button
              size="sm"
              variant="secondary"
              onClick={handleSimulateReply}
              className="h-8 text-xs gap-1 font-bold text-[#d97706] border-[#fde68a] bg-[#fef3c7] hover:bg-[#fde68a]"
              title="Simulate client texting back"
            >
              <Zap className="h-3 w-3 fill-current text-[#d97706]" />
              <span className="hidden sm:inline">Simulate Reply</span>
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => onCallClient(activeLead)}
              className="h-8 text-xs gap-1 border-[#1264a3] text-[#1264a3] hover:bg-[#eef5fc]"
            >
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Call</span>
            </Button>
          </div>
        </div>

        {/* Chat Messages Stream */}
        <div className="flex-1 p-5 overflow-y-auto space-y-3 bg-[#fdfbf7]">
          {activeThread.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <MessageSquare className="h-8 w-8 text-aubergine mx-auto opacity-80" />
              <p className="text-xs font-bold text-ink">
                Start WhatsApp Conversation with {activeLead.name}
              </p>
              <p className="text-[11px] text-ink-mute max-w-sm mx-auto">
                Use one of the pre-approved Meta message templates below to dispatch brochures, location coordinates, or pricing updates.
              </p>
            </div>
          ) : (
            activeThread.map((msg) => {
              if (msg.sender === "SYSTEM") {
                return (
                  <div
                    key={msg.id}
                    className="flex justify-center my-2 text-center"
                  >
                    <span className="text-[10px] text-ink-mute bg-white border border-hairline px-3 py-1 rounded-full shadow-sm">
                      {msg.message}
                    </span>
                  </div>
                );
              }

              const isAgent = msg.sender === "AGENT";

              return (
                <div
                  key={msg.id}
                  className={`flex ${
                    isAgent ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] md:max-w-[70%] p-3.5 rounded-2xl space-y-1.5 shadow-sm text-xs leading-relaxed ${
                      isAgent
                        ? "bg-[#4a154b] text-white rounded-tr-none shadow-elevation-1"
                        : "bg-white text-ink rounded-tl-none border border-hairline shadow-sm"
                    }`}
                  >
                    {msg.isTemplate && (
                      <div className="text-[9px] font-bold uppercase tracking-wider text-[#eedaff] pb-1 border-b border-white/20 flex items-center gap-1">
                        <FileText className="h-2.5 w-2.5" />
                        Meta Approved Template • {msg.templateName}
                      </div>
                    )}

                    <p className="whitespace-pre-wrap">{msg.message}</p>

                    <div
                      className={`flex items-center justify-end space-x-1 text-[10px] font-mono pt-0.5 ${
                        isAgent ? "text-[#d9bdde]" : "text-ink-mute"
                      }`}
                    >
                      <span>
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      {isAgent && (
                        <CheckCheck className="h-3.5 w-3.5 text-[#eedaff]" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pre-Approved Meta Template Quick Picker Bar */}
        <div className="p-3 border-t border-hairline bg-white space-y-1.5 shadow-sm">
          <div className="flex items-center justify-between text-[10px] text-ink-mute font-bold px-1">
            <span>Meta-Approved Templates (1-Click Personalized Send):</span>
            <span className="text-[#007a5a]">Official Business Account</span>
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            {SEED_WHATSAPP_TEMPLATES.map((tpl) => (
              <button
                key={tpl.id}
                type="button"
                onClick={() => handleApplyTemplate(tpl.id)}
                className="px-3 py-1 rounded-full text-[11px] font-bold bg-canvas-cream hover:bg-[#eedaff] text-ink border border-hairline whitespace-nowrap transition-colors flex items-center gap-1 shrink-0"
              >
                <span>{tpl.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Message Input Form */}
        <form
          onSubmit={handleSendMessage}
          className="p-3.5 border-t border-hairline bg-white flex items-center space-x-2"
        >
          <Input
            placeholder="Type a message or pick an approved template..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 text-xs h-10"
          />

          <Button
            type="submit"
            variant="default"
            className="h-10 px-6 text-xs gap-1 shadow-elevation-1"
          >
            <Send className="h-3.5 w-3.5 mr-1" />
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}
