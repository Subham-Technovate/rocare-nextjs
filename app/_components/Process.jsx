'use client';

import { FaPhoneAlt, FaCalendarAlt, FaWrench } from 'react-icons/fa';
import { Eyebrow } from './ui';
import QuoteButton from './QuoteButton';

const STEPS = [
  {
    icon: <FaPhoneAlt size={28} aria-hidden="true" />,
    number: '01',
    title: 'Call & Tell Us the Problem',
    body: 'Dial our number and tell us what is wrong with your unit.',
  },
  {
    icon: <FaCalendarAlt size={28} aria-hidden="true" />,
    number: '02',
    title: 'Pick a Time',
    body: 'Choose a time that works best for your schedule.',
  },
  {
    icon: <FaWrench size={28} aria-hidden="true" />,
    number: '03',
    title: 'Fixed On the Spot',
    body: 'Our mechanic arrives at your door, finds the exact defect, and fixes it on the spot.',
  },
];

export default function Process() {
  return (
    <section id="process" className="section-pad container-pad" style={{ padding: '104px 24px', background: '#EEF5FA' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '52px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '620px' }}>
            <Eyebrow>How We Work</Eyebrow>
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
              Our Repair Process
            </h2>
            <p style={{ margin: 0, fontSize: '17px' }}>
              Booking a repair is simple. Three steps and your purifier is running again.
            </p>
          </div>
          <QuoteButton variant="blue">Request a Callback</QuoteButton>
        </div>

        <div
          className="grid-relax grid-1-mobile"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="card-hover card-pad"
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '34px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span
                  className="card-icon"
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '14px',
                    background: '#0A2540',
                    color: '#FFB627',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {step.icon}
                </span>
                <span
                  style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 800,
                    fontSize: '44px',
                    color: '#C7DAEA',
                    lineHeight: 1,
                  }}
                >
                  {step.number}
                </span>
              </div>
              <h3 style={{ margin: 0, fontFamily: "'Archivo', sans-serif", fontSize: '22px', color: '#0A2540' }}>
                {step.title}
              </h3>
              <p style={{ margin: 0 }}>{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
