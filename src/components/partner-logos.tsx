import Image from "next/image";
import { partners } from "@/data/site";

export function PartnerLogos() {
  return (
      <div className="partner-window">
        <div className="partner-track">
          {[false, true].map((duplicate) => (
            <ul className="partner-group" key={String(duplicate)} aria-hidden={duplicate || undefined}>
              {partners.map(({ name, logo }) => (
                <li key={name}><Image src={logo} alt={duplicate ? "" : name} width={144} height={60} loading="eager" unoptimized /></li>
              ))}
            </ul>
          ))}
        </div>
      </div>
  );
}
