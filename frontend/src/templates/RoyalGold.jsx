import React from 'react';
import BaseTemplate from './BaseTemplate';

const THEME = {
  id: 'royal-gold',
  name: 'Royal Gold',
  themeClass: 'royal-gold',
  defaultPrimary: '#c9a96e',
  defaultSecondary: '#0a0a2e',
  defaultFont: 'Cinzel',
  corners: ['⚜️', '⚜️', '⚜️', '⚜️'],
  divider: '— ✦ ⚜ ✦ —',
  emblem: '👑',
  subtitle: 'Cordially invite you to celebrate the royal union of',
  footerText: 'Your royal presence is graciously requested',
  darkTheme: true,
};

export default function RoyalGold({ data }) {
  return <BaseTemplate data={data} theme={THEME} />;
}
