import Image from "next/image";
import { site } from "@/data/site";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <a href="#home" className={`brand${light ? " brand-light" : ""}`} aria-label="SA Family Travel home">
      {site.logo && <Image src={site.logo} alt="" width={52} height={48} className="brand-icon" />}
      <span className="brand-type"><span className="brand-name">SA family travel<span className="brand-dot">.</span></span><span className="brand-caption">EXTRAORDINARY PLACES. TOGETHER.</span></span>
    </a>
  );
}
