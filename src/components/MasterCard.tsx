import Link from "next/link";
import { Avatar } from "@/components/Avatar";

export type MasterCardData = {
  slug: string;
  name: string;
  title: string | null;
  category: string | null;
  location: string | null;
  avatarUrl?: string | null;
};

export function MasterCard({ master }: { master: MasterCardData }) {
  return (
    <Link
      href={`/vitrin/${master.slug}`}
      className="group flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-gold/40"
    >
      <Avatar src={master.avatarUrl} name={master.name} className="h-14 w-14 text-lg" />

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
