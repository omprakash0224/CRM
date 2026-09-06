import { Agent, Persona } from "@/types";

export const SEED_PERSONAS: Persona[] = [
  {
    id: "persona-director",
    name: "Vivek Singhania",
    role: "DIRECTOR",
    title: "Managing Director & Founder",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    email: "vivek@propertybeast.in",
    phone: "+91 98110 99001",
    permissions: {
      canViewAllLeads: true,
      canReassign: true,
      canManageInventory: true,
      canApprovePayouts: true,
      canExportReports: true,
    },
  },
  {
    id: "persona-manager",
    name: "Ananya Roy",
    role: "SALES_MANAGER",
    title: "Head of Sales & Channel Strategy",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    email: "ananya.roy@propertybeast.in",
    phone: "+91 98200 44321",
    permissions: {
      canViewAllLeads: true,
      canReassign: true,
      canManageInventory: true,
      canApprovePayouts: false,
      canExportReports: true,
    },
  },
  {
    id: "agent-1", // Maps directly to Rajesh Sharma
    name: "Rajesh Sharma",
    role: "SALES_EXECUTIVE",
    title: "Senior Sales Executive (Luxury Gurugram)",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    email: "rajesh.sharma@propertybeast.in",
    phone: "+91 98711 22334",
    permissions: {
      canViewAllLeads: false,
      canReassign: false,
      canManageInventory: false,
      canApprovePayouts: false,
      canExportReports: false,
    },
  },
];

export const SEED_AGENTS: Agent[] = [
  {
    id: "agent-1",
    name: "Rajesh Sharma",
    email: "rajesh.sharma@propertybeast.in",
    phone: "+91 98711 22334",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    role: "Senior Sales Executive",
    targetMonthlyRevenue: 30000000, // ₹3 Cr
    closedDealsMonth: 3,
    currentRevenueMonth: 28500000,
    conversionRate: 18.5,
    activeLeadsCount: 11,
  },
  {
    id: "agent-2",
    name: "Priya Mehta",
    email: "priya.mehta@propertybeast.in",
    phone: "+91 98199 88776",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    role: "Luxury Property Consultant",
    targetMonthlyRevenue: 35000000, // ₹3.5 Cr
    closedDealsMonth: 4,
    currentRevenueMonth: 34000000,
    conversionRate: 21.2,
    activeLeadsCount: 9,
  },
  {
    id: "agent-3",
    name: "Amit Verma",
    email: "amit.verma@propertybeast.in",
    phone: "+91 98300 55441",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    role: "Residential Sales Specialist",
    targetMonthlyRevenue: 25000000, // ₹2.5 Cr
    closedDealsMonth: 2,
    currentRevenueMonth: 19000000,
    conversionRate: 14.3,
    activeLeadsCount: 8,
  },
  {
    id: "agent-4",
    name: "Sneha Kapoor",
    email: "sneha.kapoor@propertybeast.in",
    phone: "+91 98450 11223",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    role: "NRI Client Advisor",
    targetMonthlyRevenue: 40000000, // ₹4.0 Cr
    closedDealsMonth: 2,
    currentRevenueMonth: 24500000,
    conversionRate: 16.0,
    activeLeadsCount: 7,
  },
  {
    id: "agent-5",
    name: "Vikram Malhotra",
    email: "vikram.malhotra@propertybeast.in",
    phone: "+91 99887 76655",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    role: "Sales Associate",
    targetMonthlyRevenue: 20000000, // ₹2.0 Cr
    closedDealsMonth: 1,
    currentRevenueMonth: 12500000,
    conversionRate: 11.4,
    activeLeadsCount: 6,
  },
];
