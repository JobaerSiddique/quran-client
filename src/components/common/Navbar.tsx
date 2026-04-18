"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, Settings, Home, BookOpen, Layers } from "lucide-react";
import SearchBar from "../search/SearchBar";
import SettingsSidebar from "../settings/SettingsSidebar";
import { useSettings } from "@/hooks/useSettings";

export default function Navbar() {
  const { isSettingsOpen, setIsSettingsOpen } = useSettings();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/surah/1", label: "Read", icon: BookOpen },
    { href: "/juz/1", label: "By Juz", icon: Layers },
  ];

  return (
    <>
      <div className="navbar bg-base-100 shadow-lg sticky top-0 z-30">
        <div className="navbar-start">
          <div className="dropdown">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="btn btn-ghost btn-circle lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            {isMobileMenuOpen && (
              <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon className="w-4 h-4" />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            <span className="text-primary">Quran</span> App
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link href={item.href} className={isActive ? "active" : ""}>
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="navbar-end gap-2">
          <SearchBar />
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="btn btn-ghost btn-circle"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      <SettingsSidebar
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
}
