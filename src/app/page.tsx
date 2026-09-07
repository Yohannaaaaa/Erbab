import { prisma } from "@/lib/db";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { DiscoverBar } from "@/components/DiscoverBar";
import { Categories } from "@/components/Categories";
import { FeaturedMasters } from "@/components/FeaturedMasters";
import { PromoCards } from "@/components/PromoCards";
import { Vision } from "@/components/Vision";
import { UserTypes } from "@/components/UserTypes";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Roadmap } from "@/components/Roadmap";
import { Waitlist } from "@/components/Waitlist";

export default async function Home() {
  const profiles = await prisma.profile.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  const masters = profiles.map((profile) => ({
    slug: profile.slug,
    name: profile.user.name,
    title: profile.title,
    category: profile.category,
    location: profile.location,
    avatarUrl: profile.avatarUrl,
  }));

  return (
    <>
      <Hero />
      <Stats />
      <DiscoverBar />
      <Categories />
      <FeaturedMasters masters={masters} />
      <PromoCards />
      <Vision />
      <UserTypes />
      <Features />
      <HowItWorks />
      <Roadmap />
      <Waitlist />
    </>
  );
}
