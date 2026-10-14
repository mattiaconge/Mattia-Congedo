import { sizeGuide, sizeGuideHeaders } from "@/lib/data/sizeGuide";

export function SizeGuideTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[440px] text-left text-xs">
        <thead>
          <tr className="border-b border-ink text-[10px] uppercase tracking-[0.2em]">
            {sizeGuideHeaders.map((h) => (
              <th key={h} className="py-3 font-normal">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sizeGuide.map((row) => (
            <tr key={row[0]} className="border-b border-line">
              {row.map((cell, i) => (
                <td key={i} className="py-3">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-[11px] text-ink/50">
        Misure indicative del corpo. Ogni marchio veste in modo diverso: in caso di dubbio scrivici su WhatsApp, ti consigliamo la taglia giusta.
      </p>
    </div>
  );
}
