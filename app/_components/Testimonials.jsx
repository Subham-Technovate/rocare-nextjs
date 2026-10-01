'use client';

import { useEffect, useState } from 'react';
import { Eyebrow } from './ui';
import TestimonialSlider from './TestimonialSlider';

const REVIEWS = [
  {
    tag: 'Leak Repair',
    quote:
      'My water purifier was leaking all over the kitchen counter. I called them, and a mechanic showed up the same afternoon. He replaced a broken pipe in twenty minutes. Very clean work.',
    initials: 'DD',
    name: 'Debashish Das',
    city: 'Cuttack',
  },
  {
    tag: 'Filter Replacement',
    quote:
      'The water started tasting strange. RO Care Odisha sent someone who checked the machine and swapped out the old carbon filter. The water tastes perfectly fine now.',
    initials: 'MS',
    name: 'Manaswini Sahoo',
    city: 'Bhubaneswar',
  },
  {
    tag: 'Motor Repair',
    quote:
      'My machine was making a very loud humming noise and then stopped working. The team found a bad motor and fixed it on the spot. I did not have to take the machine anywhere.',
    initials: 'SR',
    name: 'Soumya Ranjan',
    city: 'Puri',
  },
  {
    tag: 'Installation',
    quote:
      'Bought a new RO purifier and they installed it the very next morning. Neat plumbing, wall-mount done properly, and they explained how to change filters myself. Highly recommended.',
    initials: 'PP',
    name: 'Priyanka Patnaik',
    city: 'Bhubaneswar',
  },
  {
    tag: 'Annual Maintenance',
    quote:
      'We signed up for their yearly maintenance for our restaurant unit. They visit on schedule, check the TDS, and replace parts before anything breaks. Zero downtime since we started.',
    initials: 'AK',
    name: 'Arjun Khuntia',
    city: 'Cuttack',
  },
  {
    tag: 'High TDS Fix',
    quote:
      'Our tap water TDS was very high and the purifier was not helping. Their technician tested everything and replaced the membrane. TDS is now in the safe range. Great, honest service.',
    initials: 'SN',
    name: 'Sneha Nayak',
    city: 'Puri',
  },
];

/**
 * Picks how many cards to show at once based on viewport width.
 * 1 on mobile, 2 on tablet, 3 on desktop.
 */
function usePerView() {
  const [perView, setPerView] = useState(1);

  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w >= 1024) setPerView(3);
      else if (w >= 700) setPerView(2);
      else setPerView(1);
    }

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return perView;
}

export default function Testimonials() {
  const perView = usePerView();

  return (
    <section id="reviews" className="section-pad container-pad" style={{ padding: '104px 24px', background: '#EEF5FA' }}>
      <div
        className="testimonials-wrap"
        style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '52px' }}
      >
        <div
          className="testimonials-head"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            textAlign: 'center',
            maxWidth: '720px',
            margin: '0 auto',
          }}
        >
          <Eyebrow centered>Testimonials</Eyebrow>
          <h2
            style={{
              margin: 0,
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(30px, 3.6vw, 46px)',
              lineHeight: 1.1,
              color: '#0A2540',
            }}
          >
            What Our Clients Say
          </h2>
        </div>

        <TestimonialSlider reviews={REVIEWS} perView={perView} />
      </div>
    </section>
  );
}
