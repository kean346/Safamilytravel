import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";
import { Brand } from "./brand";

function Instagram({ size = 19 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".75" fill="currentColor" stroke="none" /></svg>;
}

export function Footer() {
  return <footer className="site-footer">
    <div className="container footer-grid">
      <div className="footer-brand"><Brand light /><p>Wild places. Warm welcomes.<br />Memories for every generation.</p><a href={site.instagram} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="SA Family Travel on Instagram (opens in a new tab)"><Instagram size={19} aria-hidden="true" /><span>@safamilytravel_</span><ArrowUpRight size={14} aria-hidden="true" /></a></div>
      <div><h2 className="eyebrow">Explore</h2><ul className="footer-links"><li><a href="#travel-options">Travel options</a></li><li><a href="#routes">Our routes</a></li><li><a href="#partners">Our partners</a></li><li><a href="#our-story">Our story</a></li><li><a href="#enquire">Plan your escape</a></li></ul></div>
      <div><h2 className="eyebrow">Let’s talk travel</h2><div className="footer-contact"><Mail size={15} aria-hidden="true" /><div>{site.emails.map((email) => <a key={email} href={`mailto:${email}`}>{email}</a>)}</div></div><div className="footer-contact"><Phone size={15} aria-hidden="true" /><div>{site.phone.map((phone) => <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>)}</div></div><p className="footer-contact"><MapPin size={15} aria-hidden="true" />{site.location}</p></div>
      <div className="footer-inspiration"><h2 className="eyebrow">A little wanderlust</h2><p>A glimpse of the places we love, and inspiration for your next family chapter.</p><a href={site.instagram} target="_blank" rel="noopener noreferrer" className="text-link">Follow the journey <ArrowUpRight size={16} aria-hidden="true" /></a><small>Our newsletter is coming soon.</small></div>
    </div>
    <div className="container footer-bottom"><p>© {new Date().getFullYear()} SA Family Travel. All rights reserved.</p><p>Rooted in South Africa. Made for your family.</p></div>
  </footer>;
}
