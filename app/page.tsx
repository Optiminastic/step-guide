import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import GuideShowcase from "@/app/components/GuideShowcase";
import Footer from "@/app/components/Footer";
import { getAllCards } from "@/app/lib/content";

export const revalidate = 300;

export default async function Home() {
  // Guides + published Signalor posts, newest first — the latest post leads.
  const items = await getAllCards();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <GuideShowcase items={items} />
      </main>
      <Footer />
    </>
  );
}
