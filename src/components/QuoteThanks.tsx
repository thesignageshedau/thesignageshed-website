import { QUOTE_EMAIL, TURNAROUND } from "../data/mediaWalls";
import {
  MEDIA_WALLS_HREF,
  TABLE_COVERS_HREF,
  PULL_UP_BANNERS_HREF,
  CORFLUTE_SIGNS_HREF,
  A_FRAMES_HREF,
  GAZEBOS_HREF,
  FLAGS_HREF,
  MARKET_UMBRELLAS_HREF,
  BANNERS_HREF,
  homeSection,
} from "../lib/routes";

export default function QuoteThanks() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <div className="rule mx-auto mb-4" />
        <h1 className="text-4xl sm:text-5xl">Thanks, we've got your request</h1>
        <p className="mt-5 text-lg leading-relaxed">
          We'll email you a quote with delivery included, usually within one
          business day. Nothing is printed until you've approved a proof, and
          you pay by invoice once the order is confirmed. {TURNAROUND}
        </p>
        <p className="mt-4">
          Need to add something? Email{" "}
          <a
            className="font-semibold text-rust-dark underline underline-offset-2"
            href={`mailto:${QUOTE_EMAIL}`}
          >
            {QUOTE_EMAIL}
          </a>
          .
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={MEDIA_WALLS_HREF} className="btn-outline">
            Media walls
          </a>
          <a href={TABLE_COVERS_HREF} className="btn-outline">
            Table covers
          </a>
          <a href={PULL_UP_BANNERS_HREF} className="btn-outline">
            Pull up banners
          </a>
          <a href={BANNERS_HREF} className="btn-outline">
            Vinyl and mesh banners
          </a>
          <a href={CORFLUTE_SIGNS_HREF} className="btn-outline">
            Corflute signs
          </a>
          <a href={A_FRAMES_HREF} className="btn-outline">
            A-frames
          </a>
          <a href={GAZEBOS_HREF} className="btn-outline">
            Gazebos
          </a>
          <a href={FLAGS_HREF} className="btn-outline">
            Flags
          </a>
          <a href={MARKET_UMBRELLAS_HREF} className="btn-outline">
            Market umbrellas
          </a>
          <a href={homeSection("top")} className="btn-rust">
            Home
          </a>
        </div>
      </div>
    </section>
  );
}
