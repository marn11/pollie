"use client";
import Link from "next/link";
import Image from "next/image";
import { Home, Plus } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
	const pathname = usePathname();
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"} 
        lg:hidden`}
      />

      {/* Sidebar */}
      <div
        className={`fixed p-4 top-0 left-0 h-screen w-64 z-50 flex flex-col bg-bg-dark border-r border-border/30 shadow-lg transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:block`}
      >
        {/* Header */}
        <div className="p-4 flex justify-between items-center">
          <Link href={"/"}>
            <div className="flex gap-3 items-center">
              <Image
                src={"/Logo.png"}
                width={36}
                height={36}
                alt="logo"
              ></Image>
              <span className="text-2xl font-semibold text-text">
                Pollie
              </span>
            </div>
          </Link>

          {/* Close button (mobile only) */}
          <button
            onClick={onClose}
            className="lg:hidden text-muted font-bold text-xl hover:bg-light px-2 rounded-lg cursor-pointer transition ease-in-out"
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2 my-5">
          <ul className="space-y-1">
            {/* Dashboard */}
            <li>
              <Link
                href="/dashboard"
                className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg hover:bg-light hover:text-primary focus:bg-light focus:text-primary focus:outline-none transition-all ease-in-out ${pathname === "/dashboard" && "text-primary bg-light"}`}
              >
                <Home strokeWidth={2} />
                <span className="font-medium text-base">Home</span>
              </Link>
            </li>

            {/* Docs */}
            <li>
              <Link
                href="/polls/create"
                className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg hover:bg-light hover:text-primary focus:bg-light focus:text-primary focus:outline-none transition-all ease-in-out ${pathname === "/polls/create" && "text-primary bg-light"}`}
              >
                <Plus strokeWidth={3} />
                <span className="font-medium text-base">Create Poll</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
