import Link from "next/link";

export type MasterCardData = {
  slug: string;
  name: string;
  title: string | null;
  category: string | null;
  location: string | null;
};

export function MasterCard({ master }: { master: MasterCardData }) {
  const initials = master.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Link
      href={`/vitrin/${master.slug}`}
      className="group flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-gold/40"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-lg font-bold text-black">
        {initials}
      </div>

      <div className="mt-4 flex flex-wrap gap-x-2 text-xs text-white/50">
        {master.category && <span>{master.category}</span>}
        {master.category && master.location && <span>·</span>}
        {master.location && <span>📍 {master.location}</span>}
      </div>

      <p className="mt-2 font-semibold text-white group-hover:text-gold-light">{master.name}</p>
      {master.title && <p className="text-sm text-white/60">{master.title}</p>}
    </Link>
  );
}
