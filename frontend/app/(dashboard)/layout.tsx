"use client";
import { ReactNode, useState } from "react";
import { Menu, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className="h-screen flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col">
          <header className="flex items-center justify-between mx-6 px-4 py-4 border-b border-border/30">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden rounded-lg bg-light text-text px-3 py-2 hover:-translate-y-0.5 cursor-pointer transition shadow-sm"
              >
                <Menu className="text-muted" />
              </button>
            </div>
          </header>
          <main className="h-full flex-1 p-4 overflow-auto">{children}</main>
        </div>
      </div>
    </>
  );
}
