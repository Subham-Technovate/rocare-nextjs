'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaSpinner } from 'react-icons/fa';
import Recaptcha from './Recaptcha';

const INITIAL = {
  name: '',
  email: '',
  phone: '',
  location: '',
  message: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\d{10}$/;

/**
 * HeroForm — compact lead-capture form.
 * Collects name, email, phone (Indian, +91), location and message.
 *
 * Features:
 *  - Phone input is prefixed with the Indian flag + "+91" and accepts
 *    exactly 10 digits.
 *  - Email must pass a format check.
 *  - A Google reCAPTCHA v2 ("I'm not a robot") challenge must be solved.
 *  - The submit button stays disabled until every field is valid.
 *
 * Posts to /api/contact. On success it redirects to /thank-you.
 *
 * Props:
 *  - title     : heading shown above the fields
 *  - subtitle  : small helper line under the heading
 *  - embedded  : when true, drops the card shadow/background (used inside
 *                the quote modal, which supplies its own container)
 *  - onSuccess : optional callback fired right before the thank-you redirect
 */
export default function HeroForm({
  title = 'Request a Callback',
  subtitle = 'Fill in your details and we\u2019ll get back to you fast.',
  embedded = false,
  onSuccess,
}) {
  const router = useRouter();
  const [values, setValues] = useState(INITIAL);
  const [status, setStatus] = useState('idle'); // idle | submitting | error
  const [errorMsg, setErrorMsg] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const [captchaReset, setCaptchaReset] = useState(0);
  const [touched, setTouched] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    // Phone: strip everything but digits and cap at 10.
    const next = name === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value;
    setValues((prev) => ({ ...prev, [name]: next }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  const fieldErrors = useMemo(
    () => ({
      name: values.name.trim().length < 2 ? 'Please enter your name.' : '',
      email: !EMAIL_RE.test(values.email.trim()) ? 'Please enter a valid email address.' : '',
      phone: !PHONE_RE.test(values.phone) ? 'Enter a valid 10-digit mobile number.' : '',
      location: values.location.trim().length < 2 ? 'Please enter your location.' : '',
    }),
    [values]
  );

  const isFormValid =
    !fieldErrors.name &&
    !fieldErrors.email &&
    !fieldErrors.phone &&
    !fieldErrors.location &&
    captchaToken !== '';

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === 'submitting') return;

    // Guard: never submit an invalid form (defends against Enter-key submits).
    if (!isFormValid) {
      setTouched({ name: true, email: true, phone: true, location: true });
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          phone: `+91${values.phone}`,
          recaptchaToken: captchaToken,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || 'Something went wrong. Please try again.');
      }

      setValues(INITIAL);
      setTouched({});
      setCaptchaReset((n) => n + 1);
      if (typeof onSuccess === 'function') onSuccess();
      router.push('/thank-you');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err?.message || 'Something went wrong. Please try again.');
    }
  }

  const fieldStyle = {
    width: '100%',
    minHeight: embedded ? '42px' : '38px',
    padding: embedded ? '10px 12px' : '8px 12px',
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
    marginBottom: embedded ? '6px' : '4px',
  };

  const errorStyle = {
    margin: '6px 0 0',
    color: '#C0392B',
    fontSize: '13px',
    fontWeight: 600,
  };

  const showError = (field) => touched[field] && fieldErrors[field];

  const submitDisabled = status === 'submitting' || !isFormValid;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`hero-form${embedded ? ' hero-form--embedded' : ''}`}
      style={{
        background: '#FFFFFF',
        borderRadius: '18px',
        padding: embedded ? 0 : '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: embedded ? '13px' : '9px',
        boxShadow: embedded ? 'none' : '0 24px 60px rgba(6,26,48,0.35)',
      }}
    >
      {(title || subtitle) && (
        <div className="hero-form-head">
          {title ? (
            <h3 style={{ margin: embedded ? '0 0 4px' : '0 0 2px', fontFamily: "'Archivo', sans-serif", fontSize: embedded ? '19px' : '18px', color: '#0A2540' }}>
              {title}
            </h3>
          ) : null}
          {subtitle ? (
            <p style={{ margin: 0, fontSize: embedded ? '14px' : '13px', color: '#5A6B7D' }}>{subtitle}</p>
          ) : null}
        </div>
      )}

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
            onBlur={handleBlur}
            aria-invalid={showError('name') ? 'true' : 'false'}
            className="form-field"
            style={{ ...fieldStyle, borderColor: showError('name') ? '#C0392B' : '#D5E3EF' }}
          />
          {showError('name') && <p style={errorStyle}>{fieldErrors.name}</p>}
        </div>

        <div>
          <label htmlFor="hero-phone" style={labelStyle}>
            Phone
          </label>
          <div
            style={{
              display: 'flex',
              alignItems: 'stretch',
              borderRadius: '10px',
              border: `1px solid ${showError('phone') ? '#C0392B' : '#D5E3EF'}`,
              background: '#FFFFFF',
              overflow: 'hidden',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0 10px',
                background: '#EEF5FA',
                borderRight: '1px solid #D5E3EF',
                color: '#0A2540',
                fontWeight: 700,
                fontSize: '14px',
                whiteSpace: 'nowrap',
                userSelect: 'none',
              }}
            >
              <Image src="/images/flag.png" alt="" width={20} height={14} style={{ objectFit: 'cover', display: 'block' }} />
              +91
            </span>
            <input
              id="hero-phone"
              name="phone"
              type="tel"
              required
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="90000 00000"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={10}
              aria-invalid={showError('phone') ? 'true' : 'false'}
              className="form-field"
              style={{
                flex: 1,
                minWidth: 0,
                minHeight: embedded ? '42px' : '38px',
                padding: embedded ? '10px 12px' : '8px 12px',
                border: 'none',
                background: 'transparent',
                color: '#0A2540',
                fontSize: '14px',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                outline: 'none',
              }}
            />
          </div>
          {showError('phone') && <p style={errorStyle}>{fieldErrors.phone}</p>}
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
          onBlur={handleBlur}
          aria-invalid={showError('email') ? 'true' : 'false'}
          className="form-field"
          style={{ ...fieldStyle, borderColor: showError('email') ? '#C0392B' : '#D5E3EF' }}
        />
        {showError('email') && <p style={errorStyle}>{fieldErrors.email}</p>}
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
          onBlur={handleBlur}
          aria-invalid={showError('location') ? 'true' : 'false'}
          className="form-field"
          style={{ ...fieldStyle, borderColor: showError('location') ? '#C0392B' : '#D5E3EF' }}
        />
        {showError('location') && <p style={errorStyle}>{fieldErrors.location}</p>}
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
          style={{ ...fieldStyle, minHeight: embedded ? '72px' : '56px', resize: 'vertical' }}
        />
      </div>

      <Recaptcha onToken={setCaptchaToken} resetSignal={captchaReset} />

      {status === 'error' && (
        <p role="alert" style={{ margin: 0, color: '#C0392B', fontSize: '14px', fontWeight: 600 }}>
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={submitDisabled}
        className="btn"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          minHeight: '46px',
          borderRadius: '8px',
          border: 'none',
          background: submitDisabled ? '#E4D9BF' : '#FFB627',
          color: submitDisabled ? '#8A8069' : '#0A2540',
          fontWeight: 700,
          fontSize: '15px',
          cursor: status === 'submitting' ? 'wait' : submitDisabled ? 'not-allowed' : 'pointer',
          opacity: submitDisabled && status !== 'submitting' ? 0.7 : 1,
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
