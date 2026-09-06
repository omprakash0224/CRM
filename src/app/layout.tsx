import type { Metadata } from "next";
import "./globals.css";
import { PersonaBar } from "@/components/layout/PersonaBar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

export const metadata: Metadata = {
  title: "PropertyBeast CRM — Real Estate Sales & Operations Platform",
  description:
    "Next-generation PropTech CRM for luxury real estate developers and high-growth brokerages.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#fdfbf7] text-ink flex flex-col font-sans antialiased selection:bg-[#eedaff] selection:text-aubergine">
        {/* Top Persona Bar for Client Demo Presenters */}
        <PersonaBar />

        <div className="flex flex-1 min-h-[calc(100vh-45px)]">
          {/* Slacc Signature Aubergine Sidebar */}
          <Sidebar />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0 bg-transparent">
            <Topbar />
            <main className="flex-1 p-6 md:p-8 max-w-[1600px] w-full mx-auto overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
