import React from 'react';
import BaseTemplate from './BaseTemplate';

const THEME = {
  id: 'floral-romance',
  name: 'Floral Romance',
  themeClass: 'floral-romance',
  defaultPrimary: '#c9647a',
  defaultSecondary: '#f9d4d4',
  defaultFont: 'Cormorant Garamond',
  corners: ['🌸', '🌹', '🌺', '🌸'],
  divider: '— ❀ 🌸 ❀ —',
  emblem: '🌸',
  subtitle: 'Together with their families',
  footerText: '🌸 We look forward to celebrating with you 🌸',
  darkTheme: false,
};

export default function FloralRomance({ data }) {
  return <BaseTemplate data={data} theme={THEME} />;
}
