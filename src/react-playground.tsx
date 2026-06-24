import * as React from 'react';
import { createRoot } from 'react-dom/client';

import './app.css';
import {
  Button,
  type ButtonAppearance,
  type ButtonHierarchy,
  type ButtonSize,
  type ButtonState
} from './lib/Button/Button';

const APPEARANCES: ButtonAppearance[] = ['brand', 'registration'];
const HIERARCHIES_BY_APPEARANCE: Record<ButtonAppearance, ButtonHierarchy[]> = {
  brand: ['primary', 'secondary', 'ghost'],
  registration: ['primary', 'secondary']
};
const SIZES: ButtonSize[] = ['md', 'sm'];
const STATES: ButtonState[] = ['default', 'hover', 'pressed', 'disabled'];

const colHeaderStyle: React.CSSProperties = {
  font: '600 11px/1 system-ui',
  color: '#64748b',
  textTransform: 'uppercase',
  letterSpacing: '0.04em'
};

const rowHeaderStyle: React.CSSProperties = {
  ...colHeaderStyle,
  justifySelf: 'end'
};

function AllVariants() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'max-content repeat(4, max-content)',
        columnGap: 24,
        rowGap: 20,
        alignItems: 'center',
        padding: 24,
        background: '#fafbfc'
      }}
    >
      <span />
      {STATES.map((state) => (
        <span key={state} style={colHeaderStyle}>
          {state}
        </span>
      ))}

      {APPEARANCES.map((appearance, idx) => (
        <React.Fragment key={appearance}>
          <div
            style={{
              gridColumn: '1 / -1',
              font: '700 11px/1 system-ui',
              color: '#0f172a',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              padding: '8px 0 0',
              borderTop: idx === 0 ? 'none' : '1px solid #e2e8f0'
            }}
          >
            appearance · {appearance}
          </div>

          {HIERARCHIES_BY_APPEARANCE[appearance].flatMap((hierarchy) =>
            SIZES.flatMap((size) => [
              <span key={`${appearance}-${hierarchy}-${size}-label`} style={rowHeaderStyle}>
                {hierarchy} · {size}
              </span>,
              ...STATES.map((state) => (
                <Button
                  key={`${appearance}-${hierarchy}-${size}-${state}`}
                  appearance={appearance}
                  hierarchy={hierarchy}
                  size={size}
                  state={state}
                  label="Button"
                />
              ))
            ])
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

createRoot(document.getElementById('react-root')!).render(
  <React.StrictMode>
    <AllVariants />
  </React.StrictMode>
);
