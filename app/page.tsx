import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import GuideShowcase from "@/app/components/GuideShowcase";
import Footer from "@/app/components/Footer";
import LatestFromBlog from "@/app/components/LatestFromBlog";
import { getAllGuides } from "@/app/lib/guides";

export const revalidate = 300;

export default function Home() {
  const guides = getAllGuides();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <LatestFromBlog />
        <Hero />
        <GuideShowcase guides={guides} />
      </main>
      <Footer />
    </>
  );
}
