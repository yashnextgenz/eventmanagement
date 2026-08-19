import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Gallery from '@/components/sections/Gallery';
import Testimonials from '@/components/sections/Testimonials';
import Process from '@/components/sections/Process';
import FaqCta from '@/components/sections/FaqCta';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import MobileBottomCta from '@/components/sections/MobileBottomCta';

export default function Home() {
  return (
    <main className="min-h-screen bg-charcoal">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Testimonials />
      <Process />
      <FaqCta />
      <Contact />
      <Footer />
      <MobileBottomCta />
      {/* Bottom padding for mobile CTA bar */}
      <div className="h-16 md:hidden" />
    </main>
  );
}
