import { FORMSUBMIT_ACTION } from "../data/mediaWalls";
import {
  estimate,
  money,
  type GearChoice,
  type GearProduct,
} from "../data/eventGear";
import {
  DeliveryArtworkFields,
  FormSubmitHidden,
  SubmitArea,
  YourDetailsFields,
  input,
  label,
  useQuoteSubmit, DesignsField } from "./QuoteFormParts";

type Props = {
  product: GearProduct;
  choice: GearChoice;
  setChoice: (c: GearChoice) => void;
};

// Quote form for the event gear pages (gazebos, flags, market umbrellas). Same FormSubmit pattern
// as the other product forms.
export default function GearQuoteForm({ product: p, choice, setChoice }: Props) {
  const est = estimate(p, choice);
  const item = p.items.find((i) => i.id === choice.item);
  const canAddon = Boolean(p.addon && item?.priceWithAddon);
  const addon = canAddon && choice.addon;
  const update = (patch: Partial<GearChoice>) =>
    setChoice({ ...choice, ...patch });
  const { status, error, onSubmit } = useQuoteSubmit(
    p.eventName,
    () => `${p.subject}: ${item?.label ?? ""} × ${choice.qty}`,
  );
  const estimateText = est.ok
    ? `${money(est.total)} (${est.qty} × ${money(est.each)}). Estimate only, excludes delivery. Prices are final, no GST added.`
    : "";

  return (
    <form
      action={FORMSUBMIT_ACTION}
      method="POST"
      onSubmit={onSubmit}
      className="space-y-6"
    >
      <FormSubmitHidden subject={p.subject} />
      <input type="hidden" name="Product" value={item?.label ?? ""} />
      <input type="hidden" name="Includes" value={item?.includes ?? ""} />
      {p.addon && (
        <input
          type="hidden"
          name={p.addon.label}
          value={canAddon ? (addon ? "Yes" : "No") : "n/a"}
        />
      )}
      <input
        type="hidden"
        name="Estimate shown"
        value={estimateText || "n/a"}
      />

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-3 font-display text-xl tracking-wide">
          Your {p.noun}
        </legend>
        <label className={`${label} sm:col-span-2`}>
          Choose
          <select
            className={input}
            value={choice.item}
            required
            onChange={(e) => update({ item: e.target.value })}
          >
            <option value="" disabled>
              Choose a {p.noun}
            </option>
            {p.groups.map((g) => (
              <optgroup key={g.id} label={g.title}>
                {p.items
                  .filter((i) => i.group === g.id)
                  .map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.label}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
        </label>
        <label className={label}>
          Quantity
          <input
            name="Quantity"
            type="number"
            inputMode="numeric"
            min={1}
            max={99}
            step={1}
            required
            className={input}
            value={choice.qty}
            onChange={(e) => update({ qty: e.target.value })}
          />
        </label>
        <DesignsField />
        {p.addon && (
          <label className="flex items-center gap-3 self-end pb-3 text-base font-bold">
            <input
              type="checkbox"
              className="h-5 w-5 accent-rust-dark"
              checked={addon}
              disabled={!canAddon}
              onChange={(e) => update({ addon: e.target.checked })}
            />
            Add {p.addon.label.toLowerCase()}
          </label>
        )}
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
            <p className="mt-1 text-sm">
              {est.qty} × {money(est.each)} each
              {addon ? ` (with ${p.addon!.label.toLowerCase()})` : ""}.
              Estimate only: excludes delivery. Prices are final, no GST added.
              We'll confirm the price in your quote.
            </p>
          </>
        ) : (
          <p className="mt-1">{est.reason} to see an estimate.</p>
        )}
      </div>

      <DeliveryArtworkFields notesHint={p.notesHint} />
      <YourDetailsFields />
      <SubmitArea status={status} error={error} subject={p.subject} />
    </form>
  );
}
