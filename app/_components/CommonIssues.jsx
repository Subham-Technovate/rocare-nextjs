'use client';

import { FaArrowRight } from 'react-icons/fa';
import {
  LuGauge,
  LuFilter,
  LuTimer,
  LuWrench,
  LuVolume2,
  LuPower,
} from 'react-icons/lu';
import { TEL_HREF } from '../_data/site';
import { Eyebrow } from './ui';

const ISSUES = [
  {
    icon: <LuGauge size={64} strokeWidth={1.5} aria-hidden="true" />,
    tag: 'Membrane Check',
    title: 'High TDS Levels',
    body: 'We adjust and replace membranes so your drinking water is safe and healthy.',
  },
  {
    icon: <LuFilter size={64} strokeWidth={1.5} aria-hidden="true" />,
    tag: 'Carbon Filter',
    title: 'Bad Taste or Odor',
    body: 'We swap out old filters that cause your water to smell or taste weird.',
  },
  {
    icon: <LuTimer size={64} strokeWidth={1.5} aria-hidden="true" />,
    tag: 'Pressure Check',
    title: 'Slow Water Flow',
    body: 'We clear blockages and check the water pressure so your tank fills up on schedule.',
  },
  {
    icon: <LuWrench size={64} strokeWidth={1.5} aria-hidden="true" />,
    tag: 'Pipe & Joint Fix',
    title: 'Water Leakage',
    body: 'We fix dripping pipes, broken joints, and cracked plastic housings to stop the mess.',
  },
  {
    icon: <LuVolume2 size={64} strokeWidth={1.5} aria-hidden="true" />,
    tag: 'Motor Repair',
    title: 'Machine Making Noise',
    body: 'We inspect the booster pump and motor to stop loud vibrations and humming.',
  },
  {
    icon: <LuPower size={64} strokeWidth={1.5} aria-hidden="true" />,
    tag: 'Power Supply',
    title: 'Dead System',
    body: 'We repair electrical issues and faulty wiring to get your unit working again.',
  },
];

export default function CommonIssues() {
  return (
    <section id="issues" className="section-pad container-pad" style={{ padding: '104px 24px', background: '#FFFFFF' }}>
      <div className="issues-wrap" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '52px' }}>
        <div
          className="issues-head"
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
          <Eyebrow centered>Common Water Issues We Fix</Eyebrow>
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
            What Is Wrong With Your Machine?
          </h2>
        </div>

        <div
          className="grid-relax issues-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {ISSUES.map((issue) => (
            <div
              key={issue.title}
              className="card-hover"
              style={{
                border: '1px solid #E3ECF4',
                borderRadius: '16px',
                overflow: 'hidden',
                background: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                className="issue-head"
                style={{
                  height: '150px',
                  background: '#EEF5FA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 28px',
                  color: '#0B63B6',
                }}
              >
                <span className="card-icon" style={{ display: 'flex' }}>
                  {issue.icon}
                </span>
                <span
                  style={{
                    padding: '6px 14px',
                    borderRadius: '999px',
                    background: '#0B63B6',
                    color: '#FFFFFF',
                    fontSize: '13px',
                    fontWeight: 700,
                  }}
                >
                  {issue.tag}
                </span>
              </div>
              <div className="issue-body" style={{ padding: '26px 28px 28px', display: 'flex', flexDirection: 'column', gap: '10px', flexGrow: 1 }}>
                <h3
                  style={{
                    margin: 0,
                    fontFamily: "'Archivo', sans-serif",
                    fontSize: '22px',
                    color: '#0A2540',
                  }}
                >
                  {issue.title}
                </h3>
                <p style={{ margin: 0, flexGrow: 1 }}>{issue.body}</p>
                <a
                  href={TEL_HREF}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    minHeight: '44px',
                  }}
                >
                  Book this fix <FaArrowRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
