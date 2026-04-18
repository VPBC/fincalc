import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 prose prose-gray">
      <h1>Contact Us</h1>
      <p>Have a question, found a bug, or want to suggest a new calculator?</p>
      <p>Email: <strong>hello@fincalc.net</strong></p>
      <p>We read every message and typically respond within 48 hours.</p>
    </div>
  );
}
