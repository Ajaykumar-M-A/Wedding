import React from 'react';
import BaseTemplate from './BaseTemplate';

const THEME = {
  id: 'moroccan-luxe',
  name: 'Moroccan Luxe',
  themeClass: 'moroccan-luxe',
  defaultPrimary: '#fbbf24',
  defaultSecondary: '#152c6e',
  defaultFont: 'Cinzel',
  corners: ['🕌', '✨', '🪔', '🕌'],
  divider: '— 🕌 ✧ 🕌 —',
  emblem: '🕌',
  subtitle: 'Under golden riad lanterns and starry skies',
  footerText: 'A night of magic, music and Moroccan feast',
  darkTheme: true,
};

export default function MoroccanLuxe({ data }) {
  return <BaseTemplate data={data} theme={THEME} />;
}
