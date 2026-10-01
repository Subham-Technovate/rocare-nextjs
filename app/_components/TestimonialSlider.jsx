'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

/**
 * TestimonialSlider — dependency-free, touch-friendly carousel.
 *
 * - Shows `slidesPerView` cards (responsive via the `perView` prop).
 * - Prev/next arrows + dot indicators.
 * - Touch swipe, keyboard (←/→) support.
 * - Loops around at both ends.
 *
 * Each `reviews` item: { tag, quote, initials, name, city }.
 */
export default function TestimonialSlider({ reviews, perView = 1 }) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);
  const touchStartX = useRef(null);

  const maxIndex = Math.max(0, reviews.length - perView);

  const goTo = useCallback(
    (next) => {
      if (next < 0) next = maxIndex;
      if (next > maxIndex) next = 0;
      setIndex(next);
    },
    [maxIndex]
  );

  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  // Keyboard navigation.
  useEffect(() => {
    const node = trackRef.current;
    if (!node) return undefined;

    function onKey(e) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goTo(index - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goTo(index + 1);
      }
    }

    node.addEventListener('keydown', onKey);
    return () => node.removeEventListener('keydown', onKey);
  }, [index, goTo]);

  // Touch swipe handlers.
  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e) {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return; // ignore taps / tiny moves
    if (delta < 0) next();
    else prev();
  }

  const slideWidth = 100 / perView;

  return (
    <div className="tslider">
      <div
        ref={trackRef}
        className="tslider-viewport"
        role="region"
        aria-roledescription="carousel"
        aria-label="Client testimonials"
        tabIndex={0}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="tslider-track"
          style={{ transform: `translateX(-${index * slideWidth}%)` }}
        >
          {reviews.map((review) => (
            <div className="tslider-slide" key={review.name} style={{ flex: `0 0 ${slideWidth}%` }}>
              <figure
                className="testimonial-pad"
                style={{
                  margin: 0,
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '34px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  height: '100%',
                  boxShadow: '0 12px 30px -20px rgba(10,37,64,0.25)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 800,
                      fontSize: '64px',
                      lineHeight: 0.6,
                      color: '#0B63B6',
                      height: '32px',
                    }}
                  >
                    &ldquo;
                  </span>
                  <span
                    style={{
                      padding: '5px 12px',
                      borderRadius: '999px',
                      background: '#E6F1FB',
                      color: '#0B63B6',
                      fontSize: '13px',
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {review.tag}
                  </span>
                </div>
                <blockquote style={{ margin: 0, fontSize: '16px', lineHeight: 1.7, color: '#3D4F63', flexGrow: 1 }}>
                  {review.quote}
                </blockquote>
                <figcaption
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    paddingTop: '20px',
                    borderTop: '1px solid #E3ECF4',
                  }}
                >
                  <span
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      background: '#0A2540',
                      color: '#FFB627',
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {review.initials}
                  </span>
                  <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.3 }}>
                    <span style={{ fontWeight: 700, color: '#0A2540' }}>{review.name}</span>
                    <span style={{ fontSize: '14px', color: '#5A6B7D' }}>{review.city}</span>
                  </span>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>

      <div className="tslider-controls">
        <button
          type="button"
          onClick={prev}
          className="tslider-arrow"
          aria-label="Previous testimonial"
        >
          <FaChevronLeft size={16} aria-hidden="true" />
        </button>

        <div className="tslider-dots" role="tablist" aria-label="Choose testimonial">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to slide ${i + 1}`}
              className={`tslider-dot${i === index ? ' is-active' : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          className="tslider-arrow"
          aria-label="Next testimonial"
        >
          <FaChevronRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
