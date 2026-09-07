"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-context";

type PortfolioItem = {
  id: string;
  type: "VIDEO" | "IMAGE" | "CERTIFICATE" | "PROJECT" | "TEXT";
  title: string;
  description: string | null;
  url: string | null;
};

type ProfileData = {
  title: string | null;
  bio: string | null;
  location: string | null;
  category: string | null;
  skills: string | null;
  yearsExperience: number | null;
  avatarUrl: string | null;
};

export function ProfileEditor({
  slug,
  profile,
  portfolioItems,
}: {
  slug: string;
  profile: ProfileData;
  portfolioItems: PortfolioItem[];
}) {
  const { t } = useLanguage();
  const router = useRouter();

  const [title, setTitle] = useState(profile.title ?? "");
  const [bio, setBio] = useState(profile.bio ?? "");
  const [location, setLocation] = useState(profile.location ?? "");
  const [category, setCategory] = useState(profile.category ?? "");
  const [skills, setSkills] = useState(profile.skills ?? "");
  const [yearsExperience, setYearsExperience] = useState(
    profile.yearsExperience != null ? String(profile.yearsExperience) : "",
  );
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [items, setItems] = useState(portfolioItems);
  const [itemType, setItemType] = useState<PortfolioItem["type"]>("PROJECT");
  const [itemTitle, setItemTitle] = useState("");
  const [itemUrl, setItemUrl] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemError, setItemError] = useState<string | null>(null);

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setSaved(false);

    await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        bio,
        location,
        category,
        skills,
        yearsExperience: yearsExperience ? Number(yearsExperience) : undefined,
        avatarUrl,
      }),
    });

    setSaving(false);
    setSaved(true);
    router.refresh();
  };

  const handleAddItem = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setItemError(null);

    const res = await fetch("/api/profile/portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: itemType,
        title: itemTitle,
        url: itemUrl,
        description: itemDescription,
      }),
    });
    const data = await res.json();

    if (!res.ok) {
      setItemError(data.error ?? t.auth.genericError);
      return;
    }

    setItems((prev) => [data.item, ...prev]);
    setItemTitle("");
    setItemUrl("");
    setItemDescription("");
  };

  const handleRemoveItem = async (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    await fetch(`/api/profile/portfolio/${id}`, { method: "DELETE" });
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <a href={`/vitrin/${slug}`} className="text-sm text-gold-light hover:text-gold">
        {t.panel.viewShowcase} →
      </a>

      <h1 className="mt-4 text-2xl font-bold text-white">{t.panel.editTitle}</h1>

      <form onSubmit={handleSave} className="mt-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <label className="flex flex-col gap-1.5 text-sm text-white/80">
          {t.panel.avatarLabel}
          <div className="flex items-center gap-4">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- arbitrary user-provided URL, not a local/optimizable asset
              <img
                src={avatarUrl}
                alt=""
                className="h-14 w-14 rounded-full object-cover"
                onError={(e) => (e.currentTarget.style.visibility = "hidden")}
              />
            ) : null}
            <input
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://..."
              className="flex-1 rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-gold"
            />
          </div>
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-white/80">
          {t.panel.titleLabel}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-gold"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-white/80">
          {t.panel.bioLabel}
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-gold"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm text-white/80">
            {t.panel.locationLabel}
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-gold"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm text-white/80">
            {t.panel.categoryLabel}
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-gold"
            />
          </label>
        </div>

        <label className="flex flex-col gap-1.5 text-sm text-white/80">
          {t.panel.skillsLabel}
          <input
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder={t.panel.skillsHint}
            className="rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-gold"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-white/80 sm:w-48">
          {t.panel.experienceLabel}
          <input
            type="number"
            min={0}
            max={80}
            value={yearsExperience}
            onChange={(e) => setYearsExperience(e.target.value)}
            className="rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-gold"
          />
        </label>

        <div className="mt-2 flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-black hover:bg-gold-light disabled:opacity-60"
          >
            {t.panel.save}
          </button>
          {saved && <span className="text-sm text-white/50">{t.panel.saved}</span>}
        </div>
      </form>

      <h2 className="mt-10 text-xl font-bold text-white">{t.panel.portfolioTitle}</h2>

      <form onSubmit={handleAddItem} className="mt-4 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm text-white/80">
            {t.panel.itemTypeLabel}
            <select
              value={itemType}
              onChange={(e) => setItemType(e.target.value as PortfolioItem["type"])}
              className="rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-gold"
            >
              {Object.entries(t.panel.itemTypes).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm text-white/80">
            {t.panel.itemTitleLabel}
            <input
              required
              value={itemTitle}
              onChange={(e) => setItemTitle(e.target.value)}
              className="rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-gold"
            />
          </label>
        </div>

        <label className="flex flex-col gap-1.5 text-sm text-white/80">
          {t.panel.itemUrlLabel}
          <input
            type="url"
            value={itemUrl}
            onChange={(e) => setItemUrl(e.target.value)}
            placeholder="https://"
            className="rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-gold"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-white/80">
          {t.panel.itemDescriptionLabel}
          <input
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            className="rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-gold"
          />
        </label>

        {itemError && <p className="text-sm text-red-400">{itemError}</p>}

        <button
          type="submit"
          className="self-start rounded-full border border-gold/40 px-5 py-2 text-sm font-semibold text-gold-light hover:bg-gold/10"
        >
          {t.panel.add}
        </button>
      </form>

      {items.length === 0 ? (
        <p className="mt-6 text-sm text-white/50">{t.panel.portfolioEmpty}</p>
      ) : (
        <ul className="mt-6 flex flex-col gap-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-gold-light">
                  {t.panel.itemTypes[item.type]}
                </span>
                <p className="mt-1 font-semibold text-white">{item.title}</p>
                {item.description && <p className="mt-1 text-sm text-white/60">{item.description}</p>}
                {item.url && (
                  <a href={item.url} target="_blank" rel="noreferrer" className="mt-1 block text-sm text-gold-light hover:text-gold">
                    {item.url}
                  </a>
                )}
              </div>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="shrink-0 text-sm text-white/40 hover:text-red-400"
              >
                {t.panel.remove}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
