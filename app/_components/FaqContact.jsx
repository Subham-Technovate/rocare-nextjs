'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaPhoneAlt, FaMapMarkerAlt, FaPlus } from 'react-icons/fa';
import { PHONE_DISPLAY, TEL_HREF } from '../_data/site';
import { Eyebrow } from './ui';
import QuoteButton from './QuoteButton';

const FAQS = [
  {
    q: 'Do you repair all water purifier brands?',
    a: 'Yes. Our mechanics fix Kent, Aquaguard, Pureit, Livpure, and all other major models on the market.',
  },
  {
    q: 'Do I need to carry my broken machine to a repair shop?',
    a: 'No. We offer complete doorstep service. We send our team directly to your house or office in Bhubaneswar, Cuttack, or Puri to do the work.',
  },
  {
    q: 'How do you handle the repair costs?',
    a: 'Our mechanic inspects your unit to find the exact defect. We then tell you the clear cost for the parts and the labor before we do any actual work. We do not use hidden fees.',
  },
  {
    q: 'Do you work on large industrial water filters?',
    a: 'Yes. We repair standard home units, but we also fix large industrial setups for restaurants, pharmaceutical labs, and factories.',
  },
  {
    q: 'What kind of replacement parts do you use?',
    a: 'We refuse to use cheap knock-offs. We only install original, genuine spare parts so your machine runs safely and lasts much longer.',
  },
];

function FaqItem({ item, open, onToggle }) {
  return (
    <div
      className="faq-item"
      style={{
        border: '1px solid #E3ECF4',
        borderRadius: '12px',
        padding: '0 22px',
        background: '#FFFFFF',
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          minHeight: '64px',
          fontWeight: 700,
          fontSize: '17px',
          color: '#0A2540',
          textAlign: 'left',
          cursor: 'pointer',
          padding: 0,
          fontFamily: 'inherit',
        }}
      >
        {item.q}
        <FaPlus
          size={22}
          color="#0B63B6"
          className="faq-plus"
          style={{ flexShrink: 0, transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s ease' }}
          aria-hidden="true"
        />
      </button>
      {open && <p style={{ margin: '0 0 20px' }}>{item.a}</p>}
    </div>
  );
}

export default function FaqContact() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="section-pad container-pad" style={{ padding: '104px 24px', background: '#FFFFFF' }}>
      <div
        className="faq-grid"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '56px',
          alignItems: 'start',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Eyebrow>FAQs</Eyebrow>
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
              Questions Before You Book?
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {FAQS.map((item, index) => (
              <FaqItem
                key={item.q}
                item={item}
                open={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            ))}
          </div>
        </div>

        <aside
          style={{
            background: '#0A2540',
            color: '#FFFFFF',
            borderRadius: '20px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ aspectRatio: '16 / 10', borderBottom: '2px dashed #3E6A93', boxSizing: 'border-box', position: 'relative' }}>
            <Image
              src="/images/Questions%20Before.png"
              alt="Questions to consider before booking water purifier service"
              fill
              sizes="(max-width: 680px) 100vw, 45vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div style={{ padding: '34px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <h3
              style={{
                margin: 0,
                fontFamily: "'Archivo', sans-serif",
                fontWeight: 800,
                fontSize: '28px',
                lineHeight: 1.15,
              }}
            >
              Purifier giving trouble? Talk to a mechanic now.
            </h3>
            <a
              href={TEL_HREF}
              style={{ display: 'flex', alignItems: 'center', gap: '14px', color: '#FFFFFF', textDecoration: 'none' }}
            >
              <span
                className="icon-pop"
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  background: '#FFB627',
                  color: '#0A2540',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <FaPhoneAlt size={22} aria-hidden="true" />
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.3 }}>
                <span style={{ fontSize: '14px', color: '#9FB6CB' }}>Urgent call?</span>
                <span style={{ fontWeight: 700, fontSize: '22px' }}>{PHONE_DISPLAY}</span>
              </span>
            </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.1)',
                  color: '#FFB627',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <FaMapMarkerAlt size={22} aria-hidden="true" />
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.3 }}>
                <span style={{ fontSize: '14px', color: '#9FB6CB' }}>Service areas</span>
                <span style={{ fontWeight: 700, fontSize: '18px' }}>Bhubaneswar · Cuttack · Puri</span>
              </span>
            </div>
            <QuoteButton
              style={{
                width: '100%',
              }}
            >
              Get a Quote
            </QuoteButton>
          </div>
        </aside>
      </div>
    </section>
  );
}
