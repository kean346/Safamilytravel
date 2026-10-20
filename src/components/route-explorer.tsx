"use client";

import { useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Check, ChevronDown, MapPin, Plus } from "lucide-react";
import { routes } from "@/data/routes";
import { EditorialImage } from "./editorial-image";

export function RouteExplorer() {
  const [selected, setSelected] = useState(routes[0].id);
  const panel = useRef<HTMLDivElement>(null);
  const route = routes.find((item) => item.id === selected)!;
  const count = route.regions.reduce((total, region) => total + region.lodges.length, 0);

  return <div>
    <div className="route-grid" aria-label="Choose a route to preview">
      {routes.map((item) => <button type="button" key={item.id} className={`route-card${selected === item.id ? " selected" : ""}`} aria-label={`Explore ${item.name}`} aria-pressed={selected === item.id} aria-controls="route-preview" onClick={() => setSelected(item.id)}>
        <div className="route-card-art"><EditorialImage photo={item.photo} sizes="(max-width: 600px) 80vw, (max-width: 1000px) 42vw, 20vw" /><span className="route-number">{item.number}</span><span className="route-card-action">{selected === item.id ? <Check size={17} aria-hidden="true" /> : <ArrowUpRight size={17} aria-hidden="true" />}</span></div>
        <span className="route-card-location">{item.location}</span><span className="route-card-name">{item.name}</span><span className="route-card-label">{item.label}</span>
      </button>)}
    </div>
    <div className="route-preview" id="route-preview" ref={panel}>
      <div className="route-preview-heading" aria-live="polite" aria-atomic="true">
        <div><p className="eyebrow"><MapPin size={13} aria-hidden="true" /> A closer look · Route {route.number}</p><h3>{route.name}</h3><p>{route.summary}</p></div>
        <span className="property-count">{count} handpicked stays <ArrowDown size={15} aria-hidden="true" /></span>
      </div>
      <div className="region-list" key={route.id}>
        {route.regions.map((region) => <details key={region.id} className="region" name="route-regions">
          <summary><span>{region.name}<small>{region.lodges.length} {region.lodges.length === 1 ? "stay" : "stays"}</small></span><Plus size={18} className="region-plus" aria-hidden="true" /><ChevronDown size={18} className="region-minus" aria-hidden="true" /></summary>
          <ul className="lodge-list">{region.lodges.map((lodge) => <li key={lodge.id}><h4>{lodge.name}</h4><p>{lodge.summary}</p><a href={`#enquire`} className="text-link small" onClick={() => window.dispatchEvent(new CustomEvent("select-lodge", { detail: { route: route.id, lodge: lodge.name } }))}>Enquire about this stay <ArrowUpRight size={14} aria-hidden="true" /></a></li>)}</ul>
        </details>)}
      </div>
      <p className="route-note">Every family is different. We’ll confirm age policies, availability and the right fit before you book.</p>
    </div>
  </div>;
}
