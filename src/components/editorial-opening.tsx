"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { PartnerLogos } from "./partner-logos";
import { travelOptions } from "@/data/site";
import { photography } from "@/data/photography";
import "./editorial-opening.css";

function Letters({ word, start = 0 }: { word: string; start?: number }) {
  return <span className="ed-word" aria-hidden="true">{Array.from(word).map((character, index) =>
    <span className="ed-letter" key={index} style={{ "--i": start + index } as CSSProperties}>{character}</span>
  )}</span>;
}

export function EditorialOpening() {
  const opening = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = opening.current!;
    const hero = root.querySelector<HTMLElement>(".ed-hero")!;
    const portrait = root.querySelector<HTMLElement>(".ed-portrait")!;
    const photo = root.querySelector<HTMLImageElement>(".ed-photo")!;
    let active = true;
    // Start the title delay only after the elephants can actually be painted.
    photo.decode().catch(() => {}).then(() => { if (active) hero.dataset.shown = ""; });
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.setAttribute("data-shown", "");
        observer.unobserve(entry.target);
      }
    }, { threshold: .22 });
    root.querySelectorAll(".ed-reveal").forEach(section => observer.observe(section));
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    function draw() {
      frame = 0;
      const progress = Math.min(1, Math.max(0, -hero.getBoundingClientRect().top / hero.offsetHeight));
      hero.style.setProperty("--drift", (progress * 18) + "%");
      hero.style.setProperty("--melt", String(Math.min(1, progress * 1.5)));
      const top = portrait.getBoundingClientRect().top;
      portrait.style.setProperty("--pan", Math.max(-6, Math.min(6, (innerHeight / 2 - top) / innerHeight * 9)) + "%");
    }
    function scroll() { if (!motion.matches && !frame) frame = requestAnimationFrame(draw); }
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    return () => { active = false; observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("scroll", scroll); window.removeEventListener("resize", scroll); };
  }, []);

  return <div className="ed-opening" ref={opening}>
    <section id="home" className="ed-hero" aria-labelledby="ed-name">
      <div className="ed-drift"><div className="ed-stage">
        <Image className="ed-photo" src={photography.wildlife.src} alt={photography.wildlife.alt} fill preload sizes="100vw" unoptimized />
        <h1 id="ed-name" aria-label="SA Family Travel"><em><Letters word="SA" /></em>{" "}<Letters word="Family" start={2} />{" "}<Letters word="Travel" start={8} /></h1>
        <div className="ed-foreground" aria-hidden="true" />
      </div></div>
      <a className="ed-scroll" href="#partners" aria-label="Scroll to our trusted partners"><ArrowDown size={21} /></a>
    </section>

    <section className="ed-partners ed-reveal" id="partners" aria-labelledby="ed-partner-title">
      <div className="ed-statement">
        <h2 id="ed-partner-title" aria-label="Our trusted partners">
          <span><Letters word="Our" /> <i className="ed-pill"><Image src={photography.cape.src} alt="" fill sizes="130px" /></i> <Letters word="trusted" start={3} /></span>
          <span><Letters word="partners" start={10} /> <i className="ed-pill"><Image src={photography.safariRoute.src} alt="" fill sizes="130px" /></i></span>
        </h2>
        <p>From Cape Town to the bush, these are the people who welcome our families.</p>
      </div>
      <PartnerLogos />
    </section>

    <section className="ed-journeys ed-reveal" aria-labelledby="ed-journey-title">
      <div className="ed-grid">
        <div className="ed-title-column"><h2 id="ed-journey-title" aria-label="Three ways to travel"><Letters word="Three" /><br /><Letters word="ways" start={5} /> <Letters word="to" start={9} /><br /><Letters word="travel" start={11} /></h2>
        <a className="text-link" href="#travel-options">Explore travel options <ArrowUpRight size={16} /></a></div>
        <dl className="ed-services">{travelOptions.slice(0, 3).map((option, index) =>
          <div key={option.id} style={{ "--i": index } as CSSProperties}><dt>{option.title}</dt><dd>{["Take the wheel. We plan the route and book the stops along the way.", "Fly between lodges and spend more of your days out in the bush.", "Head out with a local guide who knows where to stop and what to look for."][index]}</dd></div>
        )}</dl>
        <div className="ed-portrait"><Image src={photography.safari.src} alt={photography.safari.alt} fill sizes="(max-width: 760px) 90vw, 31vw" /></div>
      </div>
    </section>
  </div>;
}
