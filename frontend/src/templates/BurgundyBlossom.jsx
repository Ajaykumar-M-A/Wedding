import React from 'react';
import BaseTemplate from './BaseTemplate';

const THEME = {
  id: 'burgundy-blossom',
  name: 'Burgundy Blossom',
  themeClass: 'burgundy-blossom',
  defaultPrimary: '#f472b6',
  defaultSecondary: '#480614',
  defaultFont: 'Playfair Display',
  corners: ['🌹', '🥀', '🌹', '🥀'],
  divider: '— 🌹 ❀ 🌹 —',
  emblem: '🌹',
  subtitle: 'Velvet roses, autumn warmth & eternal devotion',
  footerText: 'Surrounded by warmth, wine & lifelong love',
  darkTheme: true,
};

export default function BurgundyBlossom({ data }) {
  return <BaseTemplate data={data} theme={THEME} />;
}
