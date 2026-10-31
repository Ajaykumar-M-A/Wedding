import React from 'react';
import BaseTemplate from './BaseTemplate';

const THEME = {
  id: 'beach-sunset',
  name: 'Beach Sunset',
  themeClass: 'beach-sunset',
  defaultPrimary: '#ff6b4a',
  defaultSecondary: '#20b2aa',
  defaultFont: 'Dancing Script',
  corners: ['🌴', '🌊', '🐚', '🌴'],
  divider: '— 🌊 🐚 🌊 —',
  emblem: '🌅',
  subtitle: 'Tides, sunset breeze & forever vows',
  footerText: 'Celebrate barefoot under the sunset skies',
  darkTheme: false,
};

export default function BeachSunset({ data }) {
  return <BaseTemplate data={data} theme={THEME} />;
}
