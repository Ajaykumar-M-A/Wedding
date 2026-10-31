import React from 'react';
import BaseTemplate from './BaseTemplate';

const THEME = {
  id: 'rustic-boho',
  name: 'Rustic Boho',
  themeClass: 'rustic-boho',
  defaultPrimary: '#c4714a',
  defaultSecondary: '#e8d5b7',
  defaultFont: 'Playfair Display',
  corners: ['🌾', '🌿', '🌾', '🌿'],
  divider: '— 🌾 𑁍 🌾 —',
  emblem: '🌾',
  subtitle: 'Join us as two paths become one in love',
  footerText: 'Dancing under the open sky and celebrating love',
  darkTheme: false,
};

export default function RusticBoho({ data }) {
  return <BaseTemplate data={data} theme={THEME} />;
}
