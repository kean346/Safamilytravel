"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { routes } from "@/data/routes";
import { site } from "@/data/site";

type Enquiry = { name: string; email: string; route: string; dates: string; travellers: string; message: string };

export function EnquiryForm() {
  const [destination, setDestination] = useState("");
  const [message, setMessage] = useState("");
  const [draft, setDraft] = useState<Enquiry | null>(null);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const draftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function selectLodge(event: Event) {
      const selected = (event as CustomEvent<{ route: string; lodge: string }>).detail;
      setDestination(selected.route);
      setMessage(`I’d love to know more about ${selected.lodge}.`);
      setDraft(null);
    }
    window.addEventListener("select-lodge", selectLodge);
    return () => window.removeEventListener("select-lodge", selectLodge);
  }, []);

  useEffect(() => { if (draft) draftRef.current?.focus(); }, [draft]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setDraft({
      name: String(data.get("name")).trim(), email: String(data.get("email")).trim(),
      route: routes.find((route) => route.id === destination)?.name || "I’d like some inspiration",
      dates: String(data.get("dates")).trim() || "Flexible / to be discussed",
      travellers: String(data.get("travellers")).trim() || "To be discussed", message: message.trim(),
    });
    setCopyState("idle");
  }

  const text = draft ? `SA Family Travel enquiry\n\nName: ${draft.name}\nEmail: ${draft.email}\nJourney: ${draft.route}\nTravel dates: ${draft.dates}\nTravellers: ${draft.travellers}\n\n${draft.message}` : "";

  return <form className="enquiry-form" onSubmit={submit} onChange={() => { setDraft(null); setCopyState("idle"); }}>
    <div className="form-heading"><span className="eyebrow">Your next chapter starts here</span><span className="form-required">* Required</span></div>
    <div className="form-grid">
      <label>Your name *<input autoComplete="name" name="name" placeholder="First and last name" required maxLength={100} pattern=".*\S.*" /></label>
      <label>Email address *<input autoComplete="email" type="email" name="email" placeholder="you@example.com" required maxLength={254} /></label>
      <label>Where would you love to go?<select name="route" value={destination} onChange={(event) => setDestination(event.target.value)}><option value="">I’d like some inspiration</option>{routes.map((route) => <option key={route.id} value={route.id}>{route.name}</option>)}</select></label>
      <label>When are you thinking?<input name="dates" placeholder="e.g. July 2027, or flexible" maxLength={120} /></label>
      <label className="full-width">Who’s coming along?<input name="travellers" placeholder="e.g. 2 adults and 2 children, ages 6 and 10" maxLength={200} /></label>
      <label className="full-width">Tell us about your dream trip *<textarea name="message" rows={3} placeholder="The places, the pace, the little things that matter to your family…" required maxLength={3000} value={message} onChange={(event) => setMessage(event.target.value)} /></label>
    </div>
    <p className="form-privacy">Your details stay in this browser until you choose to share them. Enquiry delivery is being arranged; you can prepare and copy your enquiry below.</p>
    <button type="submit" className="button button-primary form-submit">Prepare my enquiry <ArrowUpRight size={17} aria-hidden="true" /></button>
    {draft && <div className="enquiry-draft" ref={draftRef} tabIndex={-1}>
      <p className="eyebrow">Ready when you are</p><h3>Your enquiry is prepared.</h3><p>Nothing has been sent. {site.enquiryEmail ? "Open your email app to review and send it, or copy the details." : "Copy your details and share them with our team using a contact option below."}</p>
      <label className="draft-label" htmlFor="prepared-enquiry">Your enquiry</label><textarea id="prepared-enquiry" readOnly value={text} rows={9} />
      <div className="draft-actions"><button className="button button-outline" type="button" onClick={async () => {
        try { await navigator.clipboard.writeText(text); setCopyState("copied"); } catch { setCopyState("failed"); }
      }}>{copyState === "copied" ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}{copyState === "copied" ? "Copied" : "Copy enquiry"}</button>
      {site.enquiryEmail && <a className="button button-primary" href={`mailto:${site.enquiryEmail}?subject=${encodeURIComponent(`Family travel enquiry — ${draft.name}`)}&body=${encodeURIComponent(text)}`}><Mail size={16} aria-hidden="true" />Open email app</a>}</div>
      <p role="status" className="copy-status">{copyState === "copied" ? "Enquiry copied. Nothing has been sent automatically." : copyState === "failed" ? "Copy wasn’t available. Select the text above to copy it manually." : "You can edit your details above to prepare a new draft."}</p>
    </div>}
  </form>;
}
