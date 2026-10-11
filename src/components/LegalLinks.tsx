// Small link helpers used in the legal page text (src/data/legal.tsx).
import type { ReactNode } from "react";
import { SHOP } from "../data/products";

export const Email = () => (
  <a className="font-semibold text-rust-dark underline underline-offset-2" href={`mailto:${SHOP.email}`}>
    {SHOP.email}
  </a>
);

export const Ext = ({ href, children }: { href: string; children: ReactNode }) => (
  <a className="font-semibold text-rust-dark underline underline-offset-2" href={href} target="_blank" rel="noopener">
    {children}
  </a>
);
