import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav active="/" />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
