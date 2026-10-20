import { ArrowDownRight, ArrowUpRight, Binoculars, Compass, Heart, MapPin, Quote, Sun } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { TravelOptions } from "@/components/travel-options";
import { RouteExplorer } from "@/components/route-explorer";
import { EnquiryForm } from "@/components/enquiry-form";
import { Hero } from "@/components/hero";
import { EditorialImage } from "@/components/editorial-image";
import { photography } from "@/data/photography";
import { partners, site } from "@/data/site";

const reasons = [
  { number: "01", title: "Experience you can feel", text: "With 25+ years of experience, we bring a personal understanding of the places, the people and the details that make a journey special." },
  { number: "02", title: "Your family comes first", text: "Little explorers, seasoned travellers and everyone in between. We shape each holiday around the people who matter most to you." },
  { number: "03", title: "Exceptional, never ordinary", text: "Handpicked luxury stays and thoughtfully connected experiences. A journey that feels effortless, from the first conversation to the last sunset." },
];

export default function Home() {
  return <><Header /><main id="main-content">
    <Hero />

    <div className="promise-strip"><div className="container promise-inner"><span><Compass size={18} aria-hidden="true" />Local knowledge. Personal care.</span><span><Heart size={18} aria-hidden="true" />Thoughtfully made for families.</span><span><Sun size={19} aria-hidden="true" />Extraordinary from start to finish.</span></div></div>

    <section className="section why-section container" id="why-us" aria-labelledby="why-title">
      <Reveal className="why-intro"><p className="eyebrow">THE SA FAMILY TRAVEL DIFFERENCE</p><h2 id="why-title">More than a holiday.<br />A little piece of <em>forever.</em></h2><p>Some moments stay with you. Your child’s first elephant. An ocean that stretches forever. A story shared around the fire.</p><p>We bring those moments closer, with beautifully considered journeys through the South Africa we know and love.</p><a href="#enquire" className="text-link">Let’s make it yours <ArrowUpRight size={17} aria-hidden="true" /></a><div className="why-signoff"><span className="handwritten">Adventure, with heart.</span><span className="fine-line" /></div></Reveal>
      <Reveal className="why-reasons"><p className="eyebrow">WHY CHOOSE US?</p>{reasons.map((reason) => <article className="reason" key={reason.number}><span>{reason.number}</span><div><h3>{reason.title}</h3><p>{reason.text}</p></div></article>)}</Reveal>
    </section>

    <section className="options-section section" id="travel-options" aria-labelledby="options-title"><div className="container"><Reveal className="section-heading"><div><p className="eyebrow">ONE BEAUTIFUL COUNTRY. ENDLESS POSSIBILITIES.</p><h2 id="options-title">Your journey.<br className="mobile-break" /> <em>Your way.</em></h2></div><p>Follow your own compass. We’ll take care of the details.</p></Reveal><TravelOptions /></div></section>

    <section className="section routes-section" id="routes" aria-labelledby="routes-title"><div className="container"><Reveal className="section-heading"><div><p className="eyebrow">FIVE ROUTES. COUNTLESS STORIES.</p><h2 id="routes-title">Where will your story <em>take you?</em></h2></div><p>From the first light over the bush to the last light on the coast. Choose a route to explore its handpicked stays.</p></Reveal><RouteExplorer /></div></section>

    <section className="story-section" id="our-story" aria-labelledby="story-title"><div className="story-art"><EditorialImage photo={{ ...photography.safari, fallback: "/images/wildlife-artwork.png", position: "78% center" }} sizes="(max-width: 760px) 100vw, 50vw" /><span className="story-image-caption"><MapPin size={13} aria-hidden="true" /> ROOTED IN SOUTH AFRICA</span></div><Reveal className="story-copy"><p className="eyebrow">GOOD JOURNEYS BEGIN WITH GOOD PEOPLE</p><h2 id="story-title">A love for Africa.<br />A passion for <em>people.</em></h2><p>Meet Jay Maan, the heart behind SA Family Travel. A safari guide, open-fire chef and photographic safari pioneer with Nikon SA, Jay brings more than 25 years of experience to every journey.</p><p>From stories around the fire to getting that once-in-a-lifetime photograph, it’s the personal touches that make all the difference.</p><div className="story-quote"><Quote size={23} strokeWidth={1.2} aria-hidden="true" /><p>Beautiful places bring us together.<br />Shared moments make them unforgettable.</p></div><span className="story-attribution">OUR PHILOSOPHY</span><a href="#enquire" className="text-link">Start a conversation <ArrowUpRight size={17} aria-hidden="true" /></a></Reveal></section>

    <section className="partners-section container" id="partners" aria-labelledby="partners-title"><p className="eyebrow" id="partners-title">EXTRAORDINARY STAYS. EXCEPTIONAL COMPANY.</p><div className="partner-list">{partners.map((partner) => <span key={partner}>{partner}</span>)}</div><p className="partner-caption">A few of the exceptional names in our collection.</p></section>

    <section className="enquiry-section section" id="enquire" aria-labelledby="enquiry-title"><div className="container enquiry-layout"><Reveal className="enquiry-intro"><p className="eyebrow">LET’S DREAM A LITTLE</p><h2 id="enquiry-title">Your next great<br />family story<br /><em>starts here.</em></h2><p>Tell us a little about your people and your plans. We’ll help turn the “one day” into a journey to remember.</p><div className="enquiry-illustration"><Binoculars size={56} strokeWidth={0.8} aria-hidden="true" /><span>BIG DREAMS.<br />THOUGHTFUL DETAILS.</span><ArrowDownRight size={36} strokeWidth={1} aria-hidden="true" /></div><a href={`tel:${site.phone[0].replace(/\s/g, "")}`} className="enquiry-phone">Prefer a conversation?<strong>{site.phone[0]}</strong></a></Reveal><EnquiryForm /></div></section>
    <div className="closing-line"><span>Leave the planning to us.</span><span>Keep the memories forever.</span><Heart size={17} strokeWidth={1.2} aria-hidden="true" /></div>
  </main><Footer /></>;
}
