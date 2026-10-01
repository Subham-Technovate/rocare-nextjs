import TopBar from './_components/TopBar';
import Header from './_components/Header';
import Hero from './_components/Hero';
import FeatureCards from './_components/FeatureCards';
import WhyChooseUs from './_components/WhyChooseUs';
import DoorstepBand from './_components/DoorstepBand';
import CommonIssues from './_components/CommonIssues';
import Process from './_components/Process';
import Testimonials from './_components/Testimonials';
import CtaBand from './_components/CtaBand';
import FaqContact from './_components/FaqContact';
import Footer from './_components/Footer';
import Reveal from './_components/Reveal';

export default function Page() {
  return (
    <div
      style={{
        fontFamily: "'DM Sans', system-ui, sans-serif",
        color: '#3D4F63',
        background: '#FFFFFF',
        fontSize: '16px',
        lineHeight: 1.6,
      }}
    >
      <TopBar />
      <Header />
      <Hero />
      <Reveal>
        <FeatureCards />
      </Reveal>
      <Reveal>
        <WhyChooseUs />
      </Reveal>
      <Reveal>
        <DoorstepBand />
      </Reveal>
            <Reveal>
        <Process />
      </Reveal>
      <Reveal>
        <CommonIssues />
      </Reveal>

      <Reveal>
        <Testimonials />
      </Reveal>
      <Reveal>
        <CtaBand />
      </Reveal>
      <Reveal>
        <FaqContact />
      </Reveal>
      <Footer />
    </div>
  );
}
