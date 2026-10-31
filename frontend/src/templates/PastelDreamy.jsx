import React from 'react';
import BaseTemplate from './BaseTemplate';

const THEME = {
  id: 'pastel-dreamy',
  name: 'Pastel Dreamy',
  themeClass: 'pastel-dreamy',
  defaultPrimary: '#8b5cf6',
  defaultSecondary: '#f3e8ff',
  defaultFont: 'Dancing Script',
  corners: ['🦋', '☁️', '✨', '🦋'],
  divider: '— 🦋 ✧ 🦋 —',
  emblem: '🦋',
  subtitle: 'A fairy tale beginning for two hearts',
  footerText: 'Once upon a time is starting now',
  darkTheme: false,
};

export default function PastelDreamy({ data }) {
  return <BaseTemplate data={data} theme={THEME} />;
}
