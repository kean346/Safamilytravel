import Link from "next/link";

export default function NotFound() {
  return <main className="not-found container"><p className="eyebrow">A LITTLE OFF THE BEATEN TRACK</p><h1>Let’s find your way <em>back.</em></h1><p>This page isn’t part of our journey yet.</p><Link href="/" className="button button-primary">Back to the Home Page</Link></main>;
}
