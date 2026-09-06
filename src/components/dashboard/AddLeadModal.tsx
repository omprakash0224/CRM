"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCrmStore } from "@/store/useCrmStore";
import { LeadSource, LeadTag } from "@/types";
import { UserPlus } from "lucide-react";

interface AddLeadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddLeadModal({ open, onOpenChange }: AddLeadModalProps) {
  const { addLead, agents, projects, setNotification } = useCrmStore();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+91 ");
  const [email, setEmail] = useState("");
  const [source, setSource] = useState<LeadSource>("META_ADS");
  const [preferredProject, setPreferredProject] = useState(projects[0]?.name || "Godrej Woods");
  const [preferredBhk, setPreferredBhk] = useState("3BHK");
  const [budgetMin, setBudgetMin] = useState("20000000"); // 2 Cr
  const [budgetMax, setBudgetMax] = useState("30000000"); // 3 Cr
  const [assignedAgentId, setAssignedAgentId] = useState(agents[0]?.id || "agent-1");
  const [tag, setTag] = useState<LeadTag>("Hot");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const bMin = parseInt(budgetMin) || 15000000;
    const bMax = parseInt(budgetMax) || 25000000;

    const newLead = addLead({
      name,
      phone,
      email: email || `${name.toLowerCase().replace(/\s+/g, "")}@gmail.com`,
      source,
      stage: "NEW_LEAD",
      budgetMin: bMin,
      budgetMax: bMax,
      preferredLocation: preferredProject.includes("Oberoi") ? "Mumbai" : "Gurugram",
      preferredBhk,
      preferredProject,
      assignedAgentId,
      tags: [tag, "High Intent"],
      aiScore: Math.floor(75 + Math.random() * 20),
      aiIntent: `Direct manual inquiry registered for ${preferredProject} ${preferredBhk}. High interest level.`,
      aiBreakdown: [
        { factor: "Direct lead capture verification", points: 30 },
        { factor: "Budget matches inventory", points: 30 },
        { factor: "Immediate follow-up pending", points: 25 },
      ],
      notes: notes || `Direct inquiry added via Executive Command Center.`,
      interactionHistory: [
        {
          id: `act-${Date.now()}`,
          type: "INBOUND_LEAD",
          description: `Direct inquiry captured via CRM Quick Add (${source})`,
          timestamp: new Date().toISOString(),
          agentName: agents.find((a) => a.id === assignedAgentId)?.name || "System",
        },
      ],
    });

    setNotification(`✓ Lead "${newLead.name}" added and assigned to ${agents.find((a) => a.id === assignedAgentId)?.name}!`);
    onOpenChange(false);

    // Reset form
    setName("");
    setPhone("+91 ");
    setEmail("");
    setNotes("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg text-ink">
            <div className="h-8 w-8 rounded-full bg-canvas-lavender text-aubergine flex items-center justify-center">
              <UserPlus className="h-4 w-4" />
            </div>
            <span>Create New Inbound Lead</span>
          </DialogTitle>
          <DialogDescription className="text-xs text-ink-mute">
            Register a prospect into PropertyBeast CRM. The lead will immediately enter the pipeline and generate an assignment notification.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2 text-xs">
          {/* Row 1: Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-bold text-ink">Client Full Name *</label>
              <Input
                placeholder="e.g. Vikramaditya Rathore"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="text-xs h-10"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-ink">Mobile Phone *</label>
              <Input
                placeholder="+91 98110 12345"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="text-xs h-10"
              />
            </div>
          </div>

          {/* Row 2: Email & Source */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-bold text-ink">Email Address</label>
              <Input
                type="email"
                placeholder="client@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-xs h-10"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-ink">Lead Source</label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value as LeadSource)}
                className="w-full h-10 rounded border border-hairline bg-white px-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-aubergine"
              >
                <option value="META_ADS">Meta Lead Ads (Facebook / Instagram)</option>
                <option value="MAGICBRICKS">MagicBricks Verified</option>
                <option value="HOUSING_COM">Housing.com</option>
                <option value="NINETY_NINE_ACRES">99acres Portal</option>
                <option value="GOOGLE_ADS">Google Search Ads</option>
                <option value="REFERRAL">Client / HNI Referral</option>
                <option value="WALK_IN">Branch Office Walk-in</option>
              </select>
            </div>
          </div>

          {/* Row 3: Project Interest & Configuration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-bold text-ink">Target Project</label>
              <select
                value={preferredProject}
                onChange={(e) => setPreferredProject(e.target.value)}
                className="w-full h-10 rounded border border-hairline bg-white px-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-aubergine"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name} ({p.city})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-ink">Desired BHK</label>
              <select
                value={preferredBhk}
                onChange={(e) => setPreferredBhk(e.target.value)}
                className="w-full h-10 rounded border border-hairline bg-white px-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-aubergine"
              >
                <option value="2BHK">2 BHK Luxury</option>
                <option value="3BHK">3 BHK Standard</option>
                <option value="3BHK+S">3 BHK + Servant Room</option>
                <option value="4BHK">4 BHK Royal Suite</option>
                <option value="Penthouse">Sky Penthouse</option>
              </select>
            </div>
          </div>

          {/* Row 4: Budget Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-bold text-ink">Min Budget (INR)</label>
              <Input
                type="number"
                step="500000"
                value={budgetMin}
                onChange={(e) => setBudgetMin(e.target.value)}
                className="text-xs h-10 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-ink">Max Budget (INR)</label>
              <Input
                type="number"
                step="500000"
                value={budgetMax}
                onChange={(e) => setBudgetMax(e.target.value)}
                className="text-xs h-10 font-mono"
              />
            </div>
          </div>

          {/* Row 5: Assigned Agent & Tag */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-bold text-ink">Assign to Agent</label>
              <select
                value={assignedAgentId}
                onChange={(e) => setAssignedAgentId(e.target.value)}
                className="w-full h-10 rounded border border-hairline bg-white px-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-aubergine"
              >
                {agents.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} ({a.role})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-ink">Initial Priority Tag</label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value as LeadTag)}
                className="w-full h-10 rounded border border-hairline bg-white px-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-aubergine"
              >
                <option value="Hot">🔥 Hot (Immediate closing)</option>
                <option value="NRI">🌍 NRI / International Buyer</option>
                <option value="Investor">💼 Investor (Capital gain)</option>
                <option value="High Intent">⚡ High Intent (Pre-approved)</option>
                <option value="First Time Buyer">🏡 First Time Homebuyer</option>
              </select>
            </div>
          </div>

          {/* Row 6: Client Requirement Notes */}
          <div className="space-y-1.5">
            <label className="font-bold text-ink">Special Notes & Preferences</label>
            <textarea
              rows={2}
              placeholder="e.g. Inquired about floor rise charges, prefers East-facing unit with two car parking slots."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded border border-hairline bg-white p-3 text-xs text-ink placeholder:text-ink-mute focus:outline-none focus:ring-2 focus:ring-aubergine"
            />
          </div>

          <DialogFooter className="pt-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => onOpenChange(false)}
              className="text-xs px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              className="text-xs px-7 shadow-elevation-1"
            >
              <UserPlus className="h-4 w-4 mr-1.5" />
              Add to CRM Pipeline
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
