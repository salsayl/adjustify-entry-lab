// Rumus-rumus jurnal penyesuaian (dipakai oleh simulasi & diuji).
export const prepaidUsed = (total: number, totalMonths: number, usedMonths: number) =>
  Math.round((total / totalMonths) * usedMonths);

export const unearnedEarned = prepaidUsed;

export const accruedExpense = (perDay: number, days: number) => perDay * days;

export const accruedInterest = (principal: number, ratePct: number, months: number) =>
  Math.round((principal * ratePct) / 100 * (months / 12));

export const straightLine = (cost: number, residual: number, years: number, months = 12) =>
  Math.round(((cost - residual) / years) * (months / 12));

export const suppliesUsed = (balance: number, remaining: number) => balance - remaining;

export const rupiah = (n: number) => "Rp" + n.toLocaleString("id-ID");
