import { FORMSUBMIT_ACTION } from "../data/mediaWalls";
import {
  FRAME_COLOURS,
  ITEMS,
  TYPES,
  estimate,
  money,
  normalise,
  type QuoteChoice,
} from "../data/aFrames";
import {
  DeliveryArtworkFields,
  FormSubmitHidden,
  SubmitArea,
  YourDetailsFields,
  input,
  label,
  useQuoteSubmit, DesignsField } from "./QuoteFormParts";

type Props = { choice: QuoteChoice; setChoice: (c: QuoteChoice) => void };
const SUBJECT = "A-frame quote";

export default function AFrameQuoteForm({ choice, setChoice }: Props) {
  const est = estimate(choice);
  const update = (patch: Partial<QuoteChoice>) =>
    setChoice(normalise({ ...choice, ...patch }));
  const item = ITEMS.find((i) => i.id === choice.item);
  const showColour = item?.type === "real-estate" && !item.replacement;
  const showHandle = item?.type === "folding";
  const { status, error, onSubmit } = useQuoteSubmit(
    "a-frame",
    () => `A-frame quote: ${item?.label ?? ""} × ${choice.qty}`,
  );

  const estimateText = est.ok
    ? `${money(est.total)} (${est.qty} × ${money(est.each)}). Estimate only, excludes delivery. Prices are final, no GST added.`
    : "";

  return (
    <form
      data-product-code="a-frames"
      action={FORMSUBMIT_ACTION}
      method="POST"
      onSubmit={onSubmit}
      className="space-y-6"
    >
      <FormSubmitHidden subject={SUBJECT} />
      <input type="hidden" name="Product" value={item?.label ?? ""} />
      <input type="hidden" name="Includes" value={item?.includes ?? ""} />
      {showColour && (
        <input type="hidden" name="Frame colour" value={choice.colour} />
      )}
      {showHandle && (
        <input type="hidden" name="Carry handle" value={choice.handle} />
      )}
      <input
        type="hidden"
        name="Estimate shown"
        value={estimateText || "n/a"}
      />

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-3 font-display text-xl tracking-wide">
          Your A-frame
        </legend>
        <label className={`${label} sm:col-span-2`}>
          A-frame
          <select
            className={input}
            value={choice.item}
            required
            onChange={(e) => update({ item: e.target.value })}
          >
            <option value="" disabled>
              Choose an A-frame
            </option>
            {TYPES.map((t) => (
              <optgroup key={t.id} label={t.title}>
                {ITEMS.filter((i) => i.type === t.id).map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
        {showColour && (
          <label className={label}>
            Frame colour
            <select
              className={input}
              value={choice.colour}
              onChange={(e) =>
                update({ colour: e.target.value as QuoteChoice["colour"] })
              }
            >
              {FRAME_COLOURS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
        )}
        {showHandle && (
          <label className={label}>
            Carry handle cut-out
            <select
              className={input}
              value={choice.handle}
              onChange={(e) =>
                update({ handle: e.target.value as QuoteChoice["handle"] })
              }
            >
              <option>Yes</option>
              <option>No</option>
            </select>
          </label>
        )}
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
              {est.qty} × {money(est.each)} each. Estimate only: excludes
              delivery. Prices are final, no GST added. We'll confirm the price
              in your quote.
            </p>
          </>
        ) : (
          <p className="mt-1">{est.reason} to see an estimate.</p>
        )}
      </div>

      <DeliveryArtworkFields notesHint="Where it's going, frame colour or design ideas, anything we should know" />
      <YourDetailsFields />
      <SubmitArea status={status} error={error} subject={SUBJECT} />
    </form>
  );
}
