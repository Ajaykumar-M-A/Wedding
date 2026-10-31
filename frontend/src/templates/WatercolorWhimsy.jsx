import React from 'react';
import BaseTemplate from './BaseTemplate';

const THEME = {
  id: 'watercolor-whimsy',
  name: 'Watercolor Whimsy',
  themeClass: 'watercolor-whimsy',
  defaultPrimary: '#3b82f6',
  defaultSecondary: '#fdf2f8',
  defaultFont: 'Great Vibes',
  corners: ['🎨', '💧', '🌸', '🎨'],
  divider: '— 🎨 ❀ 🎨 —',
  emblem: '🎨',
  subtitle: 'Painted with love · Step into our watercolor canvas',
  footerText: 'Every brushstroke tells our story',
  darkTheme: false,
};

export default function WatercolorWhimsy({ data }) {
  return <BaseTemplate data={data} theme={THEME} />;
}
