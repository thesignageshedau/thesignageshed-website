// Launch promos end at 11:59:59 pm on 31 Oct 2026, Australian Eastern Daylight Time (AEDT, UTC+11).
// After that moment the badges and discount links disappear automatically.
export const PROMO_END = new Date("2026-11-01T00:00:00+11:00");

export function promoActive(now: Date = new Date()): boolean {
  return now.getTime() < PROMO_END.getTime();
}
