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
  safariRoute: {
    src: "/images/photography/safari-zebra.jpg",
    sourceUrl: unsplash("photo-1515205244153-fce4e5d8bc49", 1800),
    alt: "A zebra standing in golden savanna grass with a herd in the distance",
    fallback: "/images/wildlife-artwork.png",
    fallbackAlt: "Original wildlife artwork of an elephant and calf in golden evening light",
    position: "100% center",
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
    src: "/images/photography/garden-coast.jpg",
    sourceUrl: unsplash("photo-1547036967-23d11aacaee0", 1800),
    alt: "An aerial view of a rocky shoreline, sandy beach and clear turquoise water — coastal journey inspiration",
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
    src: "/images/photography/safari-cheetah.jpg",
    sourceUrl: unsplash("photo-1624958319297-d1aa3a41378e", 1800),
    alt: "A cheetah sitting in open grassland and looking into the distance",
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
