"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

const getSnapshot = () => window.matchMedia(query).matches;
// A static first render keeps the HTML identical during hydration and avoids
// auto-starting a slideshow until the browser's preference is known.
const getServerSnapshot = () => true;

export function useReducedMotionPreference() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
