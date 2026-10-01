'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Reveal — wraps content and animates it into view when the user scrolls
 * to it (fade + slide-up). Uses the Intersection Observer API.
 *
 * The observer fires as soon as ANY part of the element crosses the trigger
 * line near the bottom of the viewport, so tall sections animate reliably the
 * moment the user reaches them.
 *
 * Props:
 *  - children     : content to animate
 *  - as           : element tag to render (default 'div')
 *  - stagger      : when true, animates direct children one-by-one
 *  - delay        : extra delay in ms before the reveal starts
 *  - once         : animate only the first time it enters (default true)
 *  - className    : extra class names
 *  - style        : inline styles
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  stagger = false,
  delay = 0,
  once = true,
  className = '',
  style,
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    // Fallback for browsers without IntersectionObserver: show immediately.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      {
        // Trigger when the element's top edge is ~10% up from the bottom of
        // the viewport. threshold: 0 means "any pixel visible".
        threshold: 0,
        rootMargin: '0px 0px -12% 0px',
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  const base = stagger ? 'reveal-stagger' : 'reveal';
  const classes = [base, visible ? 'is-visible' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag
      ref={ref}
      className={classes}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
