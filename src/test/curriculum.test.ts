import { describe, expect, it } from "vitest";
import { MATERI } from "@/lib/materi";
import { KUIS } from "@/lib/kuis";
import { suppliesUsed, prepaidUsed, accruedInterest, straightLine } from "@/lib/accounting";

describe("kurikulum PDF sampai bab 7", () => {
  it("membatasi bab ke tujuh topik kiriman", () => {
    expect(MATERI.map((m) => m.slug)).toEqual([
      "konsep-dasar", "perlengkapan", "beban-dimuka", "pendapatan-dimuka",
      "beban-terutang", "pendapatan-akrual", "penyusutan",
    ]);
  });
  it("kuis tidak menguji materi di luar tujuh bab", () => {
    const topics = new Set(MATERI.map((m) => m.slug));
    expect(KUIS.length).toBeGreaterThan(0);
    for (const q of KUIS) expect(topics.has(q.topic)).toBe(true);
  });
  it("contoh perlengkapan PDF: 2 juta dikurangi 500 ribu", () => {
    expect(suppliesUsed(2000000, 500000)).toBe(1500000);
    expect(MATERI.find((m) => m.slug === "perlengkapan")?.tambahan?.[0]?.jurnal?.[0]?.debit).toBe(1500000);
  });
  it("contoh sewa PDF: 12 juta untuk 12 bulan dipakai 3 bulan", () => {
    expect(prepaidUsed(12000000, 12, 3)).toBe(3000000);
    expect(MATERI.find((m) => m.slug === "beban-dimuka")?.contoh?.jurnal[0]?.debit).toBe(3000000);
  });
  it("latihan bunga PDF: 20 juta, 9 persen, 2 bulan", () => {
    expect(accruedInterest(20000000, 9, 2)).toBe(300000);
  });
  it("latihan mesin PDF: 60 juta, residu 6 juta, 6 tahun, 8 bulan", () => {
    expect(straightLine(60000000, 6000000, 6, 8)).toBe(6000000);
  });
  it("setiap jurnal contoh PDF memiliki debit dan kredit yang seimbang", () => {
    const journals = MATERI.flatMap((m) => [m.contoh?.jurnal, ...(m.tambahan ?? []).map((x) => x.jurnal)]).filter((j) => j !== undefined);
    expect(journals.length).toBe(8);
    for (const journal of journals) {
      expect(journal.reduce((total, row) => total + (row.debit ?? 0), 0))
        .toBe(journal.reduce((total, row) => total + (row.kredit ?? 0), 0));
    }
  });
});