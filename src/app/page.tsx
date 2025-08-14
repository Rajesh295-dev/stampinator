
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";


export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <Hero />
      <Features />
      <HowItWorks />
    </main>
  );
}

