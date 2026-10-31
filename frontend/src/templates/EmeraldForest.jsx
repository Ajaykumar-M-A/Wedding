import React from 'react';
import BaseTemplate from './BaseTemplate';

const THEME = {
  id: 'emerald-forest',
  name: 'Emerald Forest',
  themeClass: 'emerald-forest',
  defaultPrimary: '#f59e0b',
  defaultSecondary: '#043d2f',
  defaultFont: 'Playfair Display',
  corners: ['🌲', '🍃', '🍂', '🌲'],
  divider: '— 🌲 𑁍 🌲 —',
  emblem: '🌲',
  subtitle: 'Deep in the enchanted woodland, two souls unite',
  footerText: 'Rooted in love, reaching for the stars',
  darkTheme: true,
};

export default function EmeraldForest({ data }) {
  return <BaseTemplate data={data} theme={THEME} />;
}
