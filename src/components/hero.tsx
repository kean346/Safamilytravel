"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowUpRight, Compass, MapPin, Pause, Play } from "lucide-react";
import { heroDestinations } from "@/data/photography";
import { site } from "@/data/site";
import { EditorialImage, type MediaState } from "./editorial-image";
import { useReducedMotionPreference } from "./use-reduced-motion-preference";

export function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [mediaState, setMediaState] = useState<MediaState>("loading");
  const reducedMotion = useReducedMotionPreference();
  const current = heroDestinations[active];

  useEffect(() => {
    if (paused || reducedMotion !== false) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        setActive((value) => (value + 1) % heroDestinations.length);
        setMediaState("loading");
      }
    }, 9000);
    return () => window.clearInterval(timer);
  }, [active, paused, reducedMotion]);

  function select(index: number) {
    if (index !== active) { setActive(index); setMediaState("loading"); }
    setPaused(true);
  }

  return <section className="hero cinematic-hero" id="home" aria-labelledby="hero-title" aria-roledescription="carousel">
    <div className="hero-scene" aria-label={current.title} aria-roledescription="slide" role="group">
      <AnimatePresence initial={false}>
        <motion.div key={current.id} className="hero-scene-layer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 1.2 }}>
          <EditorialImage photo={current.photo} sizes="100vw" priority className="cinema-pan" onStateChange={setMediaState} />
        </motion.div>
      </AnimatePresence>
    </div>
    <div className="hero-shade" />
    <div className="hero-film-grain" aria-hidden="true" />
    <div className="container hero-content">
      <div className="hero-kicker"><span className="live-dot" /><span>SOUTH AFRICA, TOGETHER</span><span className="hero-kicker-line" /><span>25+ YEARS OF EXPERIENCE</span></div>
      <h1 id="hero-title"><span className="hero-title-line">Wild places.</span><span className="hero-title-line">Wonderful <em>memories.</em></span></h1>
      <p className="hero-description">{site.tagline}.</p>
      <div className="hero-actions"><a href="#enquire" className="button button-light">Make it your family’s story <ArrowUpRight size={17} aria-hidden="true" /></a><a href="#routes" className="hero-secondary-link">Explore our routes <span><ArrowDown size={15} aria-hidden="true" /></span></a></div>
      <div className="hero-proof"><span className="hero-proof-number">25<span>+</span></span><span>YEARS EXPLORING.<br />EVERY JOURNEY PERSONAL.</span><span className="hero-proof-divider" /><span className="hero-proof-note">Thoughtfully planned.<br />Wonderfully remembered.</span></div>
    </div>

    <div className="hero-location"><MapPin size={13} aria-hidden="true" /><span>{current.location}</span><span className="hero-location-dot" /><span>Journey inspiration</span></div>
    <a className="hero-discovery-card" href="#routes"><span className="discovery-icon"><Compass size={28} strokeWidth={1} aria-hidden="true" /></span><span><small>NO ORDINARY FAMILY HOLIDAY</small><strong>A little closer to extraordinary.</strong></span><ArrowUpRight size={23} strokeWidth={1.2} aria-hidden="true" /></a>

    <div className="container hero-bottom">
      <div className="hero-destination-controls" role="group" aria-label="Hero destinations">{heroDestinations.map((destination, index) => <button key={destination.id} className={`hero-destination${active === index ? " active" : ""}`} type="button" aria-label={`Show ${destination.title}`} aria-pressed={active === index} onClick={() => select(index)}><span className="destination-line"><span key={`${active}-${paused}-${reducedMotion}`} className={active === index && !paused && reducedMotion === false ? "destination-progress" : ""} /></span><span className="destination-label"><small>{destination.number}</small><span><strong>{destination.title}</strong><em>{destination.subtitle}</em></span></span></button>)}</div>
      <div className="hero-bottom-actions">{!reducedMotion && <button className="hero-playback" type="button" aria-label={paused ? "Play destination slideshow" : "Pause destination slideshow"} onClick={() => setPaused(!paused)}>{paused ? <Play size={12} fill="currentColor" aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}</button>}<a href="#why-us" className="hero-scroll" aria-label="Discover why families choose us"><span>SCROLL TO DISCOVER</span><ArrowDown size={17} aria-hidden="true" /></a></div>
    </div>
    <div className="hero-media-credit">{mediaState === "photo" ? <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Photography · Unsplash <ArrowUpRight size={9} aria-hidden="true" /></a> : <span>{active === 0 ? "Original wildlife artwork" : "Illustrated destination preview"}</span>}</div>
    <span className="hero-side-note">THE BEST THINGS IN LIFE ARE SHARED</span>
  </section>;
}
