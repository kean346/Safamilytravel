"use client";

import Image from "next/image";
import { useState } from "react";
import type { EditorialPhoto } from "@/data/photography";

export type MediaState = "loading" | "photo" | "artwork";

export function EditorialImage({ photo, sizes, priority = false, className = "", onStateChange }: {
  photo: EditorialPhoto;
  sizes: string;
  priority?: boolean;
  className?: string;
  onStateChange?: (state: MediaState) => void;
}) {
  const [state, setState] = useState<MediaState>("loading");

  function report(next: MediaState) {
    setState(next);
    onStateChange?.(next);
  }

  return <div className={`editorial-media ${className}`} data-media-state={state}>
    <Image className="editorial-fallback" src={photo.fallback} alt={state === "photo" ? "" : photo.fallbackAlt} aria-hidden={state === "photo"} fill priority={priority} sizes={sizes} style={{ objectPosition: photo.position }} />
    {state !== "artwork" && <Image className={`editorial-photo${state === "photo" ? " loaded" : ""}`} src={photo.src} alt={state === "photo" ? photo.alt : ""} aria-hidden={state !== "photo"} fill priority={priority} sizes={sizes} style={{ objectPosition: photo.position }} onLoad={() => report("photo")} onError={() => report("artwork")} />}
  </div>;
}
