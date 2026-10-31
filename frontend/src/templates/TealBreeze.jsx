import React from 'react';
import BaseTemplate from './BaseTemplate';

const THEME = {
  id: 'teal-breeze',
  name: 'Teal Breeze Modern',
  themeClass: 'teal-breeze',
  defaultPrimary: '#0f766e',
  defaultSecondary: '#f0fdfa',
  defaultFont: 'Inter',
  corners: ['🌊', '🍃', '🍃', '🌊'],
  divider: '— 🌊 ✦ 🌊 —',
  emblem: '🌊',
  subtitle: 'Cool ocean breeze & warm lifelong vows',
  footerText: 'Join us for a breezy celebration of love',
  darkTheme: false,
};

export default function TealBreeze({ data }) {
  return <BaseTemplate data={data} theme={THEME} />;
}
