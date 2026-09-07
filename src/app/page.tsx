import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Vision } from "@/components/Vision";
import { UserTypes } from "@/components/UserTypes";
import { Features } from "@/components/Features";
import { Categories } from "@/components/Categories";
import { HowItWorks } from "@/components/HowItWorks";
import { Roadmap } from "@/components/Roadmap";
import { Waitlist } from "@/components/Waitlist";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Vision />
        <UserTypes />
        <Features />
        <Categories />
        <HowItWorks />
        <Roadmap />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
}
