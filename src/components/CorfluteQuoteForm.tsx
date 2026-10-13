import { useState } from "react";
import { FORMSUBMIT_ACTION } from "../data/mediaWalls";
import {
  EXTRA_DESIGN,
  EYELETS,
  EYELET_EACH,
  SIDES,
  ORIENTATIONS,
  SIZES,
  THICKNESSES,
  estimate,
  money,
  normalise,
  type Eyelets,
  type QuoteChoice,
  type Sides,
  type Thickness,
} from "../data/corfluteSigns";
import {
  DeliveryArtworkFields,
  FormSubmitHidden,
  SubmitArea,
  YourDetailsFields,
  input,
  label,
  useQuoteSubmit,
} from "./QuoteFormParts";

type Props = { choice: QuoteChoice; setChoice: (c: QuoteChoice) => void };
const SUBJECT = "Corflute sign quote";

export default function CorfluteQuoteForm({ choice, setChoice }: Props) {
  const est = estimate(choice);
  const update = (patch: Partial<QuoteChoice>) =>
    setChoice(normalise({ ...choice, ...patch }));
  const [orientation, setOrientation] = useState<string>("Portrait");
  const size = SIZES.find((s) => s.id === choice.size);
  const sizeLabel = size
    ? `${size.label} (${orientation.toLowerCase()})`
    : "";
  const sidesLabel = SIDES.find((s) => s.id === choice.sides)?.label ?? "";
  const thickLabel =
    THICKNESSES.find((t) => t.id === choice.thickness)?.label ?? "";
  const eyeletLabel = EYELETS.find((e) => e.id === choice.eyelets)?.label ?? "";
  const { status, error, onSubmit } = useQuoteSubmit(
    "corflute",
    () =>
      `Corflute quote: ${sizeLabel} ${choice.thickness} ${sidesLabel} × ${choice.qty}`,
  );

  const estimateText = est.ok
    ? `${money(est.total)} for ${est.qty} signs (${est.band}: ${money(est.signs)}${est.eyelets ? `, eyelets ${money(est.eyelets)}` : ""}${est.designs ? `, extra designs ${money(est.designs)}` : ""}). Estimate only, excludes delivery.`
    : "";

  return (
    <form
      data-product-code="corflute-signs"
      action={FORMSUBMIT_ACTION}
      method="POST"
      onSubmit={onSubmit}
      className="space-y-6"
    >
      <FormSubmitHidden subject={SUBJECT} />
      <input
        type="hidden"
        name="Product"
        value={`Premium corflute signs, ${choice.thickness}`}
      />
      <input type="hidden" name="Thickness" value={thickLabel} />
      <input type="hidden" name="Size" value={sizeLabel} />
      <input type="hidden" name="Orientation" value={orientation} />
      <input type="hidden" name="Printing" value={sidesLabel} />
      <input type="hidden" name="Eyelets" value={eyeletLabel} />
      <input
        type="hidden"
        name="Estimate shown"
        value={estimateText || "n/a"}
      />

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-3 font-display text-xl tracking-wide">
          Your corflute signs
        </legend>
        <label className={label}>
          Size
          <select
            className={input}
            value={choice.size}
            required
            onChange={(e) => update({ size: e.target.value })}
          >
            <option value="" disabled>
              Choose a size
            </option>
            {SIZES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        <label className={label}>
          Orientation
          <select
            className={input}
            value={orientation}
            onChange={(e) => setOrientation(e.target.value)}
          >
            {ORIENTATIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
        <label className={THICKNESSES.length > 1 ? label : "hidden"}>
          Thickness
          <select
            className={input}
            value={choice.thickness}
            onChange={(e) => update({ thickness: e.target.value as Thickness })}
          >
            {THICKNESSES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
        <label className={label}>
          Printing
          <select
            className={input}
            value={choice.sides}
            onChange={(e) => update({ sides: e.target.value as Sides })}
          >
            {SIDES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        <label className={label}>
          Eyelets{" "}
          <span className="font-normal text-charcoal/70">
            ({money(EYELET_EACH)} per eyelet, per sign)
          </span>
          <select
            className={input}
            value={choice.eyelets}
            onChange={(e) => update({ eyelets: e.target.value as Eyelets })}
          >
            {EYELETS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <label className={label}>
          Number of signs
          <input
            name="Quantity"
            type="number"
            inputMode="numeric"
            min={1}
            max={999}
            step={1}
            required
            className={input}
            value={choice.qty}
            onChange={(e) => update({ qty: e.target.value })}
          />
        </label>
        <label className={label}>
          Number of different designs/artworks
          <input
            name="Number of designs"
            type="number"
            inputMode="numeric"
            min={1}
            max={999}
            step={1}
            required
            className={input}
            value={choice.designs}
            onChange={(e) => update({ designs: e.target.value })}
          />
          <span className="mt-1 block text-xs font-normal text-charcoal/70">
            1 design is included. Each extra design is {money(EXTRA_DESIGN)}.
          </span>
        </label>
      </fieldset>

      <div
        aria-live="polite"
        className="rounded-xl border-2 border-rust bg-cream px-5 py-4"
      >
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-rust-dark">
          Estimated price
        </p>
        {est.ok ? (
          <>
            <p
              className="mt-1 font-display text-3xl tracking-wide"
              data-testid="estimate"
            >
              {money(est.total)}
            </p>
            <ul className="mt-1 space-y-0.5 text-sm">
              <li>
                {est.qty} {est.qty === 1 ? "sign" : "signs"}:{" "}
                {est.perSign !== undefined
                  ? `${est.qty} × ${money(est.perSign)} = ${money(est.signs)}`
                  : `${money(est.signs)} flat price (${est.band.replace(" (flat price)", "")})`}
              </li>
              {est.eyelets > 0 && <li>Eyelets: {money(est.eyelets)}</li>}
              {est.designs > 0 && <li>Extra designs: {money(est.designs)}</li>}
            </ul>
            <p className="mt-1 text-sm">
              Estimate only: excludes delivery.
              We'll confirm the price in your quote.
            </p>
          </>
        ) : (
          <p className="mt-1">{est.reason} to see an estimate.</p>
        )}
      </div>

      <DeliveryArtworkFields notesHint="Where the signs are going, how you'll mount them, eyelet positions, anything we should know" />
      <YourDetailsFields />
      <SubmitArea status={status} error={error} subject={SUBJECT} />
    </form>
  );
}
