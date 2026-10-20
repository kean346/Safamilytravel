"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, CarFront, Compass, Plane, Sparkles } from "lucide-react";
import { travelOptions } from "@/data/site";

const icons = { car: CarFront, plane: Plane, compass: Compass, sparkles: Sparkles };

export function TravelOptions() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = travelOptions[active];
  const Icon = icons[current.icon];

  function move(index: number) {
    const next = (index + travelOptions.length) % travelOptions.length;
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="travel-selector">
      <div className="travel-tabs" role="tablist" aria-label="Ways to travel">
        {travelOptions.map((option, index) => {
          const TabIcon = icons[option.icon];
          return <button key={option.id} id={`travel-tab-${option.id}`} role="tab" aria-selected={active === index} aria-controls={`travel-panel-${option.id}`} tabIndex={active === index ? 0 : -1} ref={(element) => { tabs.current[index] = element; }} onClick={() => setActive(index)} onKeyDown={(event) => {
            if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
              event.preventDefault();
              move(event.key === "Home" ? 0 : event.key === "End" ? travelOptions.length - 1 : active + (event.key === "ArrowRight" ? 1 : -1));
            }
          }} className={`travel-tab${active === index ? " active" : ""}`} type="button"><TabIcon size={21} strokeWidth={1.4} aria-hidden="true" /><span>{option.title}</span><ArrowUpRight size={15} className="tab-arrow" aria-hidden="true" /></button>;
        })}
      </div>
      {travelOptions.map((option, index) => <div key={option.id} id={`travel-panel-${option.id}`} role="tabpanel" aria-labelledby={`travel-tab-${option.id}`} hidden={active !== index} tabIndex={0} className="travel-panel">
        {active === index && <><div className="travel-panel-icon"><Icon size={55} strokeWidth={1} aria-hidden="true" /></div><div><p className="eyebrow">{option.eyebrow}</p><h3>{option.title === "Self-drive" ? "Freedom, with every detail considered." : option.title === "Fly-in safaris" ? "Let the adventure take flight." : option.title === "Guided tours" ? "Discover more. Wonder a little longer." : "No two families. No two journeys."}</h3><p>{option.description}</p><p className="travel-detail">{option.detail}</p><a href={`#enquire`} className="text-link">Let’s plan your journey <ArrowUpRight size={17} aria-hidden="true" /></a></div></>}
      </div>)}
    </div>
  );
}
