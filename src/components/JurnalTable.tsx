import { rupiah } from "@/lib/accounting";
import type { Jurnal } from "@/lib/materi";

export function JurnalTable({ rows }: { rows: Jurnal }) {
  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full text-sm">
        <thead className="bg-sage">
          <tr>
            <th className="px-3 py-2 text-left">Akun</th>
            <th className="px-3 py-2 text-right">Debit</th>
            <th className="px-3 py-2 text-right">Kredit</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t bg-card">
              <td className={"px-3 py-2 " + (r.kredit ? "pl-8" : "")}>{r.akun}</td>
              <td className="px-3 py-2 text-right">{r.debit ? rupiah(r.debit) : ""}</td>
              <td className="px-3 py-2 text-right">{r.kredit ? rupiah(r.kredit) : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
