import { getBreaking, getLatest } from "@/cms/store";

export function BreakingMarquee() {
  const breaking = getBreaking();
  const latest = (breaking.length ? breaking : getLatest(8));
  return (
    <div className="overflow-hidden border-y border-[var(--line)] bg-acid">
      <div className="marquee-track py-2 font-[family-name:var(--font-plex)] text-[11px] uppercase tracking-[0.2em] text-paper">
        {latest.concat(latest).map((a, i) => (
          <span key={`${a.id}-${i}`} className="mx-6 inline-flex items-center gap-6">
            <span className="text-radio">Live</span>
            {a.title}
            <span aria-hidden className="text-paper/40">
              /
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
