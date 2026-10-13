import Link from "next/link";
import { ACCENT_CLASS } from "@/lib/site";
import type { Category } from "@/types/cms";

export function CategoryTag({
  category,
  href,
}: {
  category: Category;
  href?: string;
}) {
  return (
    <Link
      href={href ?? `/category/${category.slug}`}
      className={`inline-flex items-center px-2 py-[3px] font-[family-name:var(--font-plex)] text-[10px] font-medium uppercase tracking-[0.18em] ${ACCENT_CLASS[category.accent]}`}
    >
      {category.name}
    </Link>
  );
}
