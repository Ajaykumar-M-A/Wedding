import React from 'react';
import BaseTemplate from './BaseTemplate';

const THEME = {
  id: 'north-indian',
  name: 'North Indian Vibrant',
  themeClass: 'north-indian',
  defaultPrimary: '#ffd166',
  defaultSecondary: '#780231',
  defaultFont: 'Cinzel',
  corners: ['🪔', '🌺', '🌺', '🪔'],
  divider: '— ✨ शुभ लग्न ✨ —',
  emblem: '🪔',
  subtitle: 'Band Baaja Baaraat! Join our grand wedding celebration',
  footerText: 'Celebration, dhol beats & lifelong memories await you',
  darkTheme: true,
};

export default function NorthIndian({ data }) {
  return <BaseTemplate data={data} theme={THEME} />;
}
