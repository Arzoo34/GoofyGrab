import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className="group flex items-baseline gap-0 font-[family-name:var(--font-syne)] font-extrabold uppercase leading-none tracking-tight text-paper"
      aria-label="Goofygrab home"
    >
      <span className={compact ? "text-[22px]" : "text-[28px] md:text-[32px]"}>
        Goofy
      </span>
      <span
        className={`text-radio group-hover:text-volt transition-colors ${
          compact ? "text-[22px]" : "text-[28px] md:text-[32px]"
        }`}
      >
        grab
      </span>
    </Link>
  );
}
