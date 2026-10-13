export function SponsoredLabel({ name }: { name?: string }) {
  return (
    <span className="inline-flex items-center gap-1 border border-radio bg-radio px-2 py-[3px] font-[family-name:var(--font-plex)] text-[10px] font-medium uppercase tracking-[0.16em] text-void">
      Sponsored{name ? ` · ${name}` : ""}
    </span>
  );
}
