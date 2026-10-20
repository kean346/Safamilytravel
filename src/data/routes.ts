import { photography, type EditorialPhoto } from "./photography";

export type Lodge = {
  id: string;
  name: string;
  summary: string;
  image: string | null;
  imageAlt: string;
  // Populate verified age policies and amenities from the property, not assumptions.
  familyNotes?: string;
};

export type Region = { id: string; name: string; lodges: Lodge[] };

export type TravelRoute = {
  id: string;
  number: string;
  name: string;
  shortName: string;
  location: string;
  label: string;
  summary: string;
  photo: EditorialPhoto;
  regions: Region[];
};

function lodge(name: string, summary: string): Lodge {
  return {
    id: name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    name,
    summary,
    image: null,
    imageAlt: `${name} — property photography to be supplied`,
  };
}

export const routes: TravelRoute[] = [
  {
    id: "safari-adventures", number: "01", name: "Safari adventures", shortName: "Safari", location: "Greater Kruger & reserves", label: "Into the wild",
    summary: "Early morning light. A rustle in the bush. The kind of family stories that begin where the road ends.",
    photo: photography.safari,
    regions: [
      { id: "sabi-sands", name: "Sabi Sands Game Reserve", lodges: [
        lodge("Singita Ebony", "A distinctive starting point for an unhurried Sabi Sands escape."),
        lodge("Singita Boulders", "A considered wilderness retreat for your Sabi Sands wish list."),
        lodge("Singita Castleton", "An intimate choice for a thoughtfully planned bush gathering."),
        lodge("Tengile River Lodge (&Beyond)", "A refined Sabi Sands escape to weave into your safari story."),
        lodge("Sabi Sabi Earth Lodge", "A striking expression of safari living in the Sabi Sands."),
        lodge("Sabi Sabi Little Bush Camp", "A smaller-scale setting for a personal wilderness journey."),
        lodge("Sabi Sabi Selati Camp", "A characterful choice for a leisurely Sabi Sands stay."),
        lodge("Sabi Sabi Bush Lodge", "A welcoming base for days shaped by the rhythm of the bush."),
      ] },
      { id: "thornybush", name: "Thornybush Game Reserve", lodges: [
        lodge("Monwana Game Lodge", "A thoughtfully selected retreat within the Thornybush landscape."),
        lodge("Royal Malewane", "A celebrated name to consider for a memorable safari escape."),
        lodge("Tintswalo", "An evocative wilderness stay for your Thornybush itinerary."),
      ] },
      { id: "timbavati-northern-kruger", name: "Timbavati Game Reserve & Northern Kruger", lodges: [
        lodge("Kings Camp", "A classic safari choice for a journey through the Timbavati."),
        lodge("Simbavati River Lodge", "A place to pause and discover the Timbavati at its own pace."),
        lodge("Simbavati Hilltop Lodge", "An inspiring addition to a carefully curated bush escape."),
        lodge("Ngala Tented Camp (&Beyond)", "A tented safari setting for an atmospheric wilderness journey."),
        lodge("The Outpost Lodge", "A distinctive retreat to explore as part of a Northern Kruger escape."),
      ] },
      { id: "madikwe", name: "Madikwe Game Reserve", lodges: [
        lodge("Morukuru Farm House", "A personal setting for gathering your favourite people in Madikwe."),
        lodge("Morukuru River Lodge", "An intimate retreat to include in your Madikwe journey."),
        lodge("Madikwe Hills", "A considered wilderness stay within the Madikwe landscape."),
        lodge("Madikwe Safari Lodge", "A memorable base for a thoughtfully planned Madikwe safari."),
        lodge("Madikwe River Lodge", "An inviting choice for an unhurried escape into Madikwe."),
      ] },
    ],
  },
  {
    id: "cape-town", number: "02", name: "Cape Town & surrounds", shortName: "Cape Town", location: "City, coast & winelands", label: "A different perspective",
    summary: "Mountain mornings, coastal drives and long lunches. Discover the many beautiful sides of the Cape.",
    photo: photography.cape,
    regions: [
      { id: "cape-coastal", name: "Cape Peninsula & Coastal", lodges: [
        lodge("Twelve Apostles", "A coastal Cape escape with the peninsula on your itinerary."),
        lodge("Chapman's Peak", "A characterful base for discovering the Cape’s scenic coastline."),
        lodge("Tintswalo Atlantic", "An atmospheric coastal retreat to complete your Cape journey."),
      ] },
      { id: "city-waterfront", name: "City & Waterfront", lodges: [
        lodge("Cape Grace", "A refined city stay for exploring Cape Town’s many layers."),
        lodge("The Silo", "A distinctive Cape Town address for your city chapter."),
      ] },
      { id: "winelands", name: "Cape Winelands", lodges: [lodge("Delaire Graff", "An elegant pause in a journey through the Cape Winelands.")] },
    ],
  },
  {
    id: "garden-route", number: "03", name: "The Garden Route", shortName: "Garden Route", location: "Forests, lagoons & coastline", label: "Take the scenic route",
    summary: "Salt in the air, forest paths underfoot and somewhere lovely to stay along the way. Make room for the unexpected.",
    photo: photography.garden,
    regions: [{ id: "coastal-lagoon", name: "Coastal & Lagoon Lodgings", lodges: [
      lodge("The Plettenberg", "An elegant coastal stop for your Garden Route story."),
      lodge("Pezula Villas", "A villa stay to consider for your family’s Garden Route escape."),
      lodge("Old Rectory (Rare Earth)", "A characterful retreat for slowing down along the coast."),
    ] }],
  },
  {
    id: "whale-route", number: "04", name: "The Whale Route", shortName: "Whale Route", location: "Hermanus & the Overberg", label: "Follow the ocean",
    summary: "Wild shores, wide horizons and nature on a grand scale. A coastal chapter worth taking your time over.",
    photo: photography.whale,
    regions: [{ id: "coastal-nature", name: "Coastal & Nature Reserves", lodges: [
      lodge("Birkenhead House (Hermanus)", "A refined Hermanus stay for a beautifully paced coastal escape."),
      lodge("Grootbos Private Nature Reserve", "A nature-focused retreat to include in your Overberg itinerary."),
      lodge("Morukuru Beach Lodge", "A coastal hideaway for an unhurried chapter by the ocean."),
      lodge("Morukuru Ocean House", "A personal coastal setting for time together by the sea."),
    ] }],
  },
  {
    id: "safari-extensions", number: "05", name: "Exclusive safari extensions", shortName: "Beyond safari", location: "Phinda & the KwaZulu-Natal coast", label: "Stay a little longer",
    summary: "One journey, another extraordinary chapter. Bring together the wilderness and the coast in a trip that feels entirely yours.",
    photo: photography.extension,
    regions: [{ id: "bucket-list", name: "Luxury Bucket-List Extensions", lodges: [
      lodge("Phinda Homestead", "A distinctive safari addition for a journey with room to linger."),
      lodge("The Oyster Box", "A coastal finale to round off your South African adventure."),
    ] }],
  },
];

export const lodgeCount = routes.reduce((total, route) => total + route.regions.reduce((sum, region) => sum + region.lodges.length, 0), 0);
