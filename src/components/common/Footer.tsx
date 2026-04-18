"use client";

import { Heart, BookOpen, Moon, Sun, Mail, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    // Check if dark mode is enabled
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark" ||
      document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  const navigationLinks = [
    { name: "About", href: "/about", icon: BookOpen },
    { name: "Contact", href: "/contact", icon: Mail },
    { name: "Privacy Policy", href: "/privacy", icon: null },
    { name: "API", href: "/api-docs", icon: ExternalLink },
  ];

  const socialLinks = [
    {
      name: "Email",
      href: "mailto:info@quranapp.com",
      icon: Mail,
      color: "hover:text-red-400",
    },
  ];

  const quickLinks = [
    { name: "Read Quran", href: "/" },
    { name: "Search", href: "/search" },
    { name: "Bookmarks", href: "/bookmarks" },
    { name: "Settings", href: "/settings" },
  ];

  return (
    <footer className="relative mt-auto bg-gradient-to-br from-base-200 via-base-200 to-base-100 border-t border-base-300">
      {/* Decorative gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Quran App
              </h3>
            </div>
            <p className="text-sm text-base-content/70 leading-relaxed">
              Your spiritual companion for reading, understanding, and
              connecting with the Holy Quran.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-full bg-base-300 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold relative inline-block">
              Navigation
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-primary rounded-full"></span>
            </h4>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-base-content/70 hover:text-primary transition-all duration-300 hover:translate-x-1"
                  >
                    {link.icon && (
                      <link.icon className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-primary rounded-full"></span>
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-base-content/70 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / CTA Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold relative inline-block">
              Stay Updated
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-primary rounded-full"></span>
            </h4>
            <p className="text-sm text-base-content/70">
              Get notified about new features and spiritual reminders.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="input input-sm input-bordered w-full bg-base-100/50 backdrop-blur-sm"
              />
              <button className="btn btn-sm btn-primary gap-2">
                <Mail className="w-3.5 h-3.5" />
                Subscribe
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs text-base-content/50 pt-2">
              <span className="inline-flex items-center gap-1">
                Made with{" "}
                <Heart className="w-3 h-3 text-red-500 animate-pulse" /> for the
                Ummah
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-base-300">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
            <div className="text-sm text-base-content/60">
              © {currentYear} Quran App. All rights reserved.
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-xs text-base-content/60">
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
              <span className="w-px h-3 bg-base-300 my-auto hidden sm:block"></span>
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <span className="w-px h-3 bg-base-300 my-auto hidden sm:block"></span>
              <a href="#" className="hover:text-primary transition-colors">
                Cookies
              </a>
            </div>

            <div className="text-xs text-base-content/50 flex items-center gap-2">
              <span>Quran data by</span>
              <a
                href="https://alquran.cloud"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                AlQuran Cloud API
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button (optional) */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible"
        id="scroll-top"
        style={{ opacity: 0, visibility: "hidden" }}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </footer>
  );
}
