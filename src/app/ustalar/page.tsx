import { prisma } from "@/lib/db";
import { MasterCard } from "@/components/MasterCard";
import { CATEGORIES } from "@/lib/categories";
import { COUNTRIES } from "@/lib/countries";

export default async function UstalarPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; country?: string }>;
}) {
  const { q, category, country } = await searchParams;

  const profiles = await prisma.profile.findMany({
    where: {
      AND: [
        category ? { category: { equals: category } } : {},
        country ? { location: { contains: country } } : {},
        q
          ? {
              OR: [
                { user: { name: { contains: q } } },
                { title: { contains: q } },
                { bio: { contains: q } },
                { skills: { contains: q } },
              ],
            }
          : {},
      ],
    },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-[calc(100vh-64px)] bg-black">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-3xl font-bold text-white">Ustaları Keşfet</h1>
        <p className="mt-2 text-white/60">Dünyanın dört bir yanından yetenekleri arayın.</p>

        <form className="mt-8 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row">
          <input
            type="text"
            name="q"
            defaultValue={q ?? ""}
            placeholder="Hangi ustalığı arıyorsunuz?"
            className="flex-1 rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-sm text-white outline-none focus:border-gold"
          />
          <select
            name="category"
            defaultValue={category ?? ""}
            className="rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-sm text-white outline-none focus:border-gold"
          >
            <option value="">Tüm Kategoriler</option>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.tr}
              </option>
            ))}
          </select>
          <select
            name="country"
            defaultValue={country ?? ""}
            className="rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-sm text-white outline-none focus:border-gold"
          >
            <option value="">Tüm Ülkeler</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-black hover:bg-gold-light"
          >
            Ara
          </button>
        </form>

        {profiles.length === 0 ? (
          <p className="mt-12 text-center text-white/50">Aramanızla eşleşen bir Erbab bulunamadı.</p>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {profiles.map((profile) => (
              <MasterCard
                key={profile.id}
                master={{
                  slug: profile.slug,
                  name: profile.user.name,
                  title: profile.title,
                  category: profile.category,
                  location: profile.location,
                  avatarUrl: profile.avatarUrl,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
