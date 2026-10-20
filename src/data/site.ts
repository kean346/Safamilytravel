export const site = {
  name: "SA Family Travel",
  url: "https://safamilytravel.co",
  tagline: "Welcome to SA family travel where your family's dreams are made reality",
  phone: ["+27 78 444 4949", "+27 73 140 0341"],
  emails: ["jay@safamilytravel.com", "marketing@safamilytravel.com"],
  instagram: "https://www.instagram.com/safamilytravel_/",
  location: "Pretoria, South Africa",
  // Web-prepared derivative of the attached icon; replace with the original
  // binary when available. See README for asset provenance.
  logo: "/images/brand-icon.png" as string | null,
  enquiryEmail: process.env.NEXT_PUBLIC_ENQUIRY_EMAIL?.trim() || null,
};

export const travelOptions = [
  {
    id: "self-drive",
    title: "Self-drive",
    eyebrow: "Your pace. Your adventure.",
    description: "Take the scenic route. We shape the journey and handpick the stays, leaving you free to stop, explore and linger a little longer.",
    detail: "An independently paced itinerary, thoughtfully planned around your family.",
    icon: "car",
  },
  {
    id: "fly-in",
    title: "Fly-in safaris",
    eyebrow: "Less travelling. More discovering.",
    description: "Trade the long drive for a new perspective. Let us plan a fly-in safari that brings your family closer to the wilderness.",
    detail: "Flight and transfer options tailored to your chosen lodges and travel dates.",
    icon: "plane",
  },
  {
    id: "guided",
    title: "Guided tours",
    eyebrow: "A little local knowledge goes a long way.",
    description: "See beyond the guidebook with a thoughtfully guided journey. Discover the landscapes, stories and small moments that make a place unforgettable.",
    detail: "Expert-led experiences, with time to be curious and room to be spontaneous.",
    icon: "compass",
  },
  {
    id: "bespoke",
    title: "Bespoke trips",
    eyebrow: "Entirely, wonderfully yours.",
    description: "A first safari, a milestone celebration or three generations together. Tell us what matters, and we’ll build a journey around it.",
    detail: "A personal itinerary shaped around your interests, ages and wish list.",
    icon: "sparkles",
  },
] as const;

export const partners = ["Madikwe Hills", "Morukuru Family", "Royal Malewane", "Sabi Sabi", "Singita"];
