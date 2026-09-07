import { prisma } from "@/lib/db";

const TR_MAP: Record<string, string> = {
  ç: "c",
  ğ: "g",
  ı: "i",
  ö: "o",
  ş: "s",
  ü: "u",
  Ç: "c",
  Ğ: "g",
  İ: "i",
  Ö: "o",
  Ş: "s",
  Ü: "u",
};

export function slugify(input: string) {
  const normalized = input
    .split("")
    .map((char) => TR_MAP[char] ?? char)
    .join("");

  return normalized
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "erbab";
}

export async function generateUniqueSlug(name: string) {
  const base = slugify(name);
  let slug = base;
  let suffix = 1;

  while (await prisma.profile.findUnique({ where: { slug } })) {
    suffix += 1;
    slug = `${base}-${suffix}`;
  }

  return slug;
}
