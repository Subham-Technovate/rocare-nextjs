'use client';

import { useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import HeroForm from './HeroForm';

/**
 * QuoteModal — accessible dialog that hosts the lead form.
 *
 * - Closes on backdrop click, the × button, or Escape.
 * - Locks body scroll while open.
 * - Moves focus into the dialog on open and restores it on close.
 * - Basic focus trap (keeps Tab within the dialog).
 */
export default function QuoteModal({ open, onClose }) {
  const dialogRef = useRef(null);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    previouslyFocused.current = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    // Focus the first focusable element inside the dialog.
    const node = dialogRef.current;
    if (node) {
      const focusable = node.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable) focusable.focus();
    }

    function onKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Focus trap.
      if (e.key === 'Tab' && node) {
        const items = node.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
      if (previouslyFocused.current && previouslyFocused.current.focus) {
        previouslyFocused.current.focus();
      }
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="quote-overlay"
      onMouseDown={(e) => {
        // Only close when the backdrop itself is clicked (not its children).
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="quote-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-modal-title"
      >
        <button
          type="button"
          className="quote-close"
          onClick={onClose}
          aria-label="Close quote form"
        >
          <FaTimes size={18} aria-hidden="true" />
        </button>

        <div className="quote-dialog-head">
          <h2 id="quote-modal-title" className="quote-dialog-title">
            Get a Free Quote
          </h2>
          <p className="quote-dialog-sub">
            Tell us about your purifier and we&rsquo;ll call you back with a clear price.
          </p>
        </div>

        <HeroForm
          embedded
          title="Request a Quote"
          subtitle="No hidden fees. We&rsquo;ll confirm the exact cost before any work starts."
        />
      </div>
    </div>
  );
}
