import React from 'react';
import BaseTemplate from './BaseTemplate';

const THEME = {
  id: 'south-indian',
  name: 'South Indian Traditional',
  themeClass: 'south-indian',
  defaultPrimary: '#d4af37',
  defaultSecondary: '#50030a',
  defaultFont: 'Cinzel',
  corners: ['🪷', '🪷', '🪷', '🪷'],
  divider: '— 🪷 ॥ शुभ विवाह ॥ 🪷 —',
  emblem: '🪔',
  subtitle: '॥ ॐ श्री गणेशाय नमः ॥ With the blessings of Almighty & Elders',
  footerText: '॥ माङ्गल्यं तन्तुनानेन मम जीवनहेतुना ॥ We seek your warm blessings',
  darkTheme: true,
};

export default function SouthIndian({ data }) {
  return <BaseTemplate data={data} theme={THEME} />;
}
