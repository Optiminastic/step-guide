import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import GuideShowcase from "@/app/components/GuideShowcase";
import Footer from "@/app/components/Footer";
import JsonLd from "@/app/components/JsonLd";
import { getAllCards } from "@/app/lib/content";
import { websiteSchema, organizationSchema } from "@/app/lib/seo";

export const revalidate = 300;

export default async function Home() {
  // Guides + published Signalor posts, newest first — the latest post leads.
  const items = await getAllCards();

  return (
    <>
      <JsonLd data={[websiteSchema(), organizationSchema()]} />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <GuideShowcase items={items} />
      </main>
      <Footer />
    </>
  );
}
