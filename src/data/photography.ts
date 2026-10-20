export type EditorialPhoto = {
  src: string;
  alt: string;
  fallback: string;
  fallbackAlt: string;
  position?: string;
  sourceUrl?: string;
};

function unsplash(id: string, width = 1800) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
}

// Destination inspiration only; never presented as photographs of a named lodge.
// Photographs were downloaded through the supported proxy with TLS verification.
// Local assets keep the page independent of external services at runtime.
// Source URLs are retained for attribution and future refreshes.
export const photography = {
  wildlife: {
    src: "/images/photography/elephants.jpg",
    sourceUrl: unsplash("photo-1564760055775-d63b17a55c44", 2000),
    alt: "Two African elephants standing in open grassland beneath a pink sunset",
    fallback: "/images/wildlife-artwork.png",
    fallbackAlt: "Original wildlife artwork of an elephant and calf in golden evening light",
    position: "67% center",
  },
  safari: {
    src: "/images/photography/safari.jpg",
    sourceUrl: unsplash("photo-1516426122078-c23e76319801", 2400),
    alt: "A safari vehicle beneath acacia trees at sunset — safari inspiration",
    fallback: "/images/wildlife-artwork.png",
    fallbackAlt: "Original wildlife artwork of an elephant and calf in golden evening light",
    position: "68% center",
  },
  cape: {
    src: "/images/photography/cape.jpg",
    sourceUrl: unsplash("photo-1580060839134-75a5edca2e99", 2000),
    alt: "Cape Town's mountain and coastal scenery — destination inspiration",
    fallback: "/images/cape.svg",
    fallbackAlt: "Illustrated Cape mountain and coastline",
    position: "center",
  },
  garden: {
    src: "/images/photography/garden.jpg",
    sourceUrl: unsplash("photo-1441974231531-c6227db76b6e", 1800),
    alt: "Sunlight filtering through a lush forest — Garden Route inspiration",
    fallback: "/images/garden.svg",
    fallbackAlt: "Illustrated green coastline and lagoon",
    position: "center",
  },
  whale: {
    src: "/images/photography/whale.jpg",
    sourceUrl: unsplash("photo-1568430462989-44163eb1752f", 2000),
    alt: "A humpback whale breaching in the open ocean — coastal journey inspiration",
    fallback: "/images/whale.svg",
    fallbackAlt: "Illustrated whale tail off a quiet coastline",
    position: "center",
  },
  extension: {
    src: "/images/photography/extension.jpg",
    sourceUrl: unsplash("photo-1546182990-dffeafbe841d", 1600),
    alt: "A male lion framed by green foliage — safari extension inspiration",
    fallback: "/images/extension.svg",
    fallbackAlt: "Illustrated warm coastline with a palm tree",
    position: "center",
  },
} satisfies Record<string, EditorialPhoto>;

export const heroDestinations = [
  { id: "safari", number: "01", title: "Safari adventures", subtitle: "Wild at heart", location: "The call of the wild", photo: photography.wildlife },
  { id: "cape", number: "02", title: "Cape Town & surrounds", subtitle: "A new perspective", location: "Mountain, ocean, magic", photo: photography.cape },
  { id: "whale", number: "03", title: "The Whale Route", subtitle: "Follow the ocean", location: "Where the wild meets the water", photo: photography.whale },
] as const;
