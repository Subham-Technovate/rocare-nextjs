'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import QuoteModal from './QuoteModal';

const QuoteContext = createContext(null);

/**
 * QuoteProvider — makes the callback-request popup available anywhere in
 * the tree. Mounted once in the root layout so every CTA shares one modal.
 *
 * Usage in a client component:
 *   const { openQuote } = useQuote();
 *   <button onClick={openQuote}>Request a Callback</button>
 */
export function QuoteProvider({ children }) {
  const [open, setOpen] = useState(false);

  const openQuote = useCallback(() => setOpen(true), []);
  const closeQuote = useCallback(() => setOpen(false), []);

  const value = useMemo(() => ({ open, openQuote, closeQuote }), [open, openQuote, closeQuote]);

  return (
    <QuoteContext.Provider value={value}>
      {children}
      <QuoteModal open={open} onClose={closeQuote} />
    </QuoteContext.Provider>
  );
}

/**
 * useQuote — access the popup controls. Throws a clear error if used
 * outside the provider (which would silently do nothing otherwise).
 */
export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) {
    throw new Error('useQuote must be used within a <QuoteProvider>');
  }
  return ctx;
}
