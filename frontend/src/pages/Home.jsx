import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EditorialMarquee from "@/components/Marquee";
import About from "@/components/About";
import Trust from "@/components/Trust";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Blog from "@/components/Blog";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(
          () => el.scrollIntoView({ behavior: "smooth", block: "start" }),
          400
        );
      }
    }
  }, [location.hash]);

  return (
    <SmoothScroll>
      <div className="bg-paper" data-testid="home-page">
        <Header isHome />
        <main>
          <Hero />
          <EditorialMarquee />
          <About />
          <Trust />
          <div className="cv-auto"><Services /></div>
          <div className="cv-auto"><Process /></div>
          <div className="cv-auto"><Blog /></div>
          <div className="cv-auto"><Faq /></div>
          <div className="cv-auto"><Contact /></div>
        </main>
        <Footer isHome />
        <FloatingContact />
        <BackToTop />
      </div>
    </SmoothScroll>
  );
}
