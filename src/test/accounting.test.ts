import { describe, expect, it } from "vitest";
import { accruedExpense, accruedInterest, prepaidUsed, straightLine, suppliesUsed } from "@/lib/accounting";
import { SIMS } from "@/lib/simulasi";

describe("rumus jurnal penyesuaian", () => {
  it("beban dibayar di muka: 12jt/12 × 3 bulan", () => expect(prepaidUsed(12000000, 12, 3)).toBe(3000000));
  it("beban terutang: 500rb × 3 hari", () => expect(accruedExpense(500000, 3)).toBe(1500000));
  it("bunga: 10jt × 12% × 3/12", () => expect(accruedInterest(10000000, 12, 3)).toBe(300000));
  it("penyusutan garis lurus 9 bulan", () => expect(straightLine(50000000, 5000000, 5, 9)).toBe(6750000));
  it("perlengkapan terpakai", () => expect(suppliesUsed(2500000, 800000)).toBe(1700000));
  it("setiap simulasi punya pembahasan", () => SIMS.forEach((s) => expect(s.steps.length).toBeGreaterThan(0)));
});
