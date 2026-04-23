"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/solstrandhage/akutt", label: "Akutt" },
  { href: "/solstrandhage/hms", label: "HMS" },
  { href: "/solstrandhage/for-beboere", label: "For beboere" },
  { href: "/solstrandhage/vedlikehold", label: "Vedlikehold" },
  { href: "/solstrandhage/skjemaer", label: "Skjemaer" },
  { href: "/solstrandhage/styret", label: "Styret" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-foreground/10 bg-surface/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between gap-4">
        <Link
          href="/solstrandhage"
          className="flex items-center gap-3 no-underline group"
        >
          <Image
            src="/logo-icon.png"
            alt=""
            width={48}
            height={17}
            priority
            className="h-7 w-auto sm:h-8 transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-serif text-lg sm:text-xl tracking-tight text-foreground hidden xs:inline sm:inline">
            Solstrand hage sameie
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-x-5 text-sm">
          {navLinks.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative no-underline transition-colors py-1 ${
                  active
                    ? "text-accent"
                    : "text-foreground/80 hover:text-accent"
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-0 right-0 -bottom-0.5 h-px bg-accent origin-left transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label={open ? "Lukk meny" : "Åpne meny"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-foreground hover:bg-foreground/5 transition-colors"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line
              x1="3"
              y1="6"
              x2="19"
              y2="6"
              className="origin-center transition-transform duration-300"
              style={{ transform: open ? "translate(0,5px) rotate(45deg)" : "" }}
            />
            <line
              x1="3"
              y1="11"
              x2="19"
              y2="11"
              className="transition-opacity duration-200"
              style={{ opacity: open ? 0 : 1 }}
            />
            <line
              x1="3"
              y1="16"
              x2="19"
              y2="16"
              className="origin-center transition-transform duration-300"
              style={{ transform: open ? "translate(0,-5px) rotate(-45deg)" : "" }}
            />
          </svg>
        </button>
      </div>

      <div
        className={`md:hidden grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <nav className="border-t border-foreground/10 bg-surface px-6 py-3 flex flex-col">
            {navLinks.map((link, i) => {
              const active =
                pathname === link.href ||
                pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-3 no-underline border-b border-foreground/5 last:border-b-0 transition-colors ${
                    active
                      ? "text-accent font-medium"
                      : "text-foreground/85 hover:text-accent"
                  }`}
                  style={{
                    opacity: open ? 1 : 0,
                    transform: open ? "translateX(0)" : "translateX(-8px)",
                    transition: `opacity 300ms ${i * 40 + 80}ms, transform 300ms ${i * 40 + 80}ms`,
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
