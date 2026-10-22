// Customer reviews. Real, verbatim reviews only, with the customer's permission to show them.
// Leave the array empty and the section doesn't render. Never write or paraphrase reviews here.
export type Review = {
  id: string;
  quote: string;
  name: string; // as the customer agreed to be shown, e.g. "Sam, cafe owner"
  source?: string; // e.g. "Google review"
};

export const REVIEWS: Review[] = [];
