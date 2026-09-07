import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PanelView } from "@/components/PanelView";
import { OffersPanel, type OfferItem } from "@/components/OffersPanel";

export default async function PanelPage() {
  const session = await getSession();
  if (!session) {
    redirect("/giris");
  }

  const [profile, followerCount, receivedOffers, sentOffers] = await Promise.all([
    session.role === "ERBAB"
      ? prisma.profile.findUnique({
          where: { userId: session.userId },
          include: { _count: { select: { portfolioItems: true } } },
        })
      : null,
    prisma.follow.count({ where: { followingId: session.userId } }),
    prisma.jobOffer.findMany({
      where: { recipientId: session.userId },
      include: { sender: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.jobOffer.findMany({
      where: { senderId: session.userId },
      include: { recipient: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const received: OfferItem[] = receivedOffers.map((offer) => ({
    id: offer.id,
    title: offer.title,
    budget: offer.budget,
    message: offer.message,
    status: offer.status,
    createdAt: offer.createdAt.toISOString(),
    counterpartName: offer.sender.name,
  }));

  const sent: OfferItem[] = sentOffers.map((offer) => ({
    id: offer.id,
    title: offer.title,
    budget: offer.budget,
    message: offer.message,
    status: offer.status,
    createdAt: offer.createdAt.toISOString(),
    counterpartName: offer.recipient.name,
  }));

  return (
    <div className="min-h-[calc(100vh-64px)] bg-black">
      <PanelView
        name={session.name}
        role={session.role}
        slug={profile?.slug ?? null}
        portfolioCount={profile?._count.portfolioItems ?? 0}
        followerCount={followerCount}
      />
      <div className="mx-auto max-w-3xl px-6 pb-16">
        <OffersPanel received={received} sent={sent} />
      </div>
    </div>
  );
}
