'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaSpinner } from 'react-icons/fa';

const INITIAL = {
  name: '',
  email: '',
  phone: '',
  location: '',
  message: '',
};

/**
 * HeroForm — compact lead-capture form.
 * Collects name, email, phone, location and message.
 *
 * Posts to /api/contact. On success it redirects the user to /thank-you.
 * On failure it shows an error and keeps the user's input so nothing is lost.
 *
 * Props:
 *  - title     : heading shown above the fields
 *  - subtitle  : small helper line under the heading
 *  - embedded  : when true, drops the card shadow/background (used inside
 *                the quote modal, which supplies its own container)
 *  - onSuccess : optional callback fired right before the thank-you redirect
 *                (e.g. to close the quote modal so it doesn't stay on screen)
 */
export default function HeroForm({
  title = 'Book a Technician',
  subtitle = 'Fill in your details and we\u2019ll get back to you fast.',
  embedded = false,
  onSuccess,
}) {
  const router = useRouter();
  const [values, setValues] = useState(INITIAL);
  const [status, setStatus] = useState('idle'); // idle | submitting | error
  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === 'submitting') return;

    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || 'Something went wrong. Please try again.');
      }

      setValues(INITIAL);
      if (typeof onSuccess === 'function') onSuccess();
      router.push('/thank-you');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err?.message || 'Something went wrong. Please try again.');
    }
  }

  const fieldStyle = {
    width: '100%',
    minHeight: '42px',
    padding: '10px 12px',
    borderRadius: '10px',
    border: '1px solid #D5E3EF',
    background: '#FFFFFF',
    color: '#0A2540',
    fontSize: '14px',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    outline: 'none',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 700,
    color: '#0A2540',
    marginBottom: '6px',
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`hero-form${embedded ? ' hero-form--embedded' : ''}`}
      style={{
        background: '#FFFFFF',
        borderRadius: '18px',
        padding: embedded ? 0 : '22px',
        display: 'flex',
        flexDirection: 'column',
        gap: '13px',
        boxShadow: embedded ? 'none' : '0 24px 60px rgba(6,26,48,0.35)',
      }}
    >
      <div className="hero-form-head">
        <h3 style={{ margin: '0 0 4px', fontFamily: "'Archivo', sans-serif", fontSize: '19px', color: '#0A2540' }}>
          {title}
        </h3>
        {subtitle ? (
          <p style={{ margin: 0, fontSize: '14px', color: '#5A6B7D' }}>{subtitle}</p>
        ) : null}
      </div>

      <div className="hero-form-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
        <div>
          <label htmlFor="hero-name" style={labelStyle}>
            Name
          </label>
          <input
            id="hero-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your full name"
            value={values.name}
            onChange={handleChange}
            className="form-field"
            style={fieldStyle}
          />
        </div>

        <div>
          <label htmlFor="hero-phone" style={labelStyle}>
            Phone
          </label>
          <input
            id="hero-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+91 90000 00000"
            value={values.phone}
            onChange={handleChange}
            className="form-field"
            style={fieldStyle}
          />
        </div>
      </div>

      <div>
        <label htmlFor="hero-email" style={labelStyle}>
          Email
        </label>
        <input
          id="hero-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={values.email}
          onChange={handleChange}
          className="form-field"
          style={fieldStyle}
        />
      </div>

      <div>
        <label htmlFor="hero-location" style={labelStyle}>
          Location
        </label>
        <input
          id="hero-location"
          name="location"
          type="text"
          required
          autoComplete="address-level2"
          placeholder="Bhubaneswar / Cuttack / Puri"
          value={values.location}
          onChange={handleChange}
          className="form-field"
          style={fieldStyle}
        />
      </div>

      <div>
        <label htmlFor="hero-message" style={labelStyle}>
          Message
        </label>
        <textarea
          id="hero-message"
          name="message"
          rows={3}
          placeholder="Tell us what's wrong with your purifier…"
          value={values.message}
          onChange={handleChange}
          className="form-field form-textarea"
          style={{ ...fieldStyle, minHeight: '72px', resize: 'vertical' }}
        />
      </div>

      {status === 'error' && (
        <p role="alert" style={{ margin: 0, color: '#C0392B', fontSize: '14px', fontWeight: 600 }}>
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          minHeight: '46px',
          borderRadius: '8px',
          border: 'none',
          background: '#FFB627',
          color: '#0A2540',
          fontWeight: 700,
          fontSize: '15px',
          cursor: status === 'submitting' ? 'wait' : 'pointer',
          opacity: status === 'submitting' ? 0.8 : 1,
        }}
      >
        {status === 'submitting' ? (
          <>
            <FaSpinner size={18} className="icon-spin" aria-hidden="true" />
            <span>Sending…</span>
          </>
        ) : (
          <span>Request a Callback</span>
        )}
      </button>
    </form>
  );
}
