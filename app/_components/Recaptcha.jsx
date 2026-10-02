'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Script from 'next/script';

/**
 * Recaptcha — Google reCAPTCHA v2 ("I'm not a robot" checkbox) widget.
 *
 * Renders the checkbox and reports the token (or empty string on expiry /
 * reset) to the parent via onToken(token). The parent sends that token to
 * the server for verification before accepting the submission.
 *
 * The site key is read from NEXT_PUBLIC_RECAPTCHA_SITE_KEY.
 *
 * Props:
 *  - onToken(token)   : called with the token string, or '' when cleared.
 *  - resetSignal(num) : change this value to force a widget reset.
 */
export default function Recaptcha({ onToken, resetSignal = 0 }) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const [scriptReady, setScriptReady] = useState(false);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const handleExpired = useCallback(() => {
    if (onToken) onToken('');
  }, [onToken]);

  // Render the widget once the Google script has loaded.
  useEffect(() => {
    if (!scriptReady || !siteKey || !containerRef.current) return;
    if (typeof window === 'undefined' || !window.grecaptcha) return;

    // Avoid double-rendering the same container.
    if (widgetIdRef.current !== null) return;

    widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
      sitekey: siteKey,
      callback: (token) => {
        if (onToken) onToken(token);
      },
      'expired-callback': handleExpired,
      'error-callback': handleExpired,
    });
  }, [scriptReady, siteKey, onToken, handleExpired]);

  // Reset the widget whenever the reset signal changes.
  useEffect(() => {
    if (!scriptReady || widgetIdRef.current === null || !window.grecaptcha) return;
    window.grecaptcha.reset(widgetIdRef.current);
  }, [resetSignal, scriptReady]);

  if (!siteKey) {
    return (
      <p style={{ margin: 0, color: '#C0392B', fontSize: '13px', fontWeight: 600 }}>
        reCAPTCHA is not configured (missing site key).
      </p>
    );
  }

  return (
    <>
      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
        onError={() => setScriptReady(false)}
      />
      <div ref={containerRef} />
    </>
  );
}
