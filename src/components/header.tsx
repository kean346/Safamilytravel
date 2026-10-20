"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Brand } from "./brand";

const links = [
  { href: "#travel-options", label: "Travel options" },
  { href: "#routes", label: "Our routes" },
  { href: "#partners", label: "Our partners" },
  { href: "#our-story", label: "Our story" },
];

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}
const getScrollSnapshot = () => window.scrollY > 70;
const getServerSnapshot = () => false;

export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const scrolled = useSyncExternalStore(subscribeToScroll, getScrollSnapshot, getServerSnapshot);
  const solid = scrolled || open;

  return (
    <header className={`site-header${solid ? " is-solid" : ""}`} onKeyDown={(event) => {
      if (event.key === "Escape" && open) { setOpen(false); toggle.current?.focus(); }
    }}>
      <div className="header-inner container">
        <Brand light={!solid} />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>
        <a href="#enquire" className="button button-primary header-cta">Plan your escape <ArrowUpRight size={16} aria-hidden="true" /></a>
        <button ref={toggle} className="menu-toggle" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!open}>
        {[...links, { href: "#enquire", label: "Plan your escape" }].map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}<ArrowUpRight size={16} aria-hidden="true" /></a>)}
      </nav>
    </header>
  );
}
