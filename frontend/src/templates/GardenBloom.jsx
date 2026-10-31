import React from 'react';
import BaseTemplate from './BaseTemplate';

const THEME = {
  id: 'garden-bloom',
  name: 'Garden Bloom',
  themeClass: 'garden-bloom',
  defaultPrimary: '#2d6a4f',
  defaultSecondary: '#d8f3dc',
  defaultFont: 'Cormorant Garamond',
  corners: ['🍃', '🌿', '🌱', '🍃'],
  divider: '— 🌿 ❀ 🌿 —',
  emblem: '🌿',
  subtitle: 'Love blooms here · Please join our garden celebration',
  footerText: 'Surrounded by nature, blessed by love',
  darkTheme: false,
};

export default function GardenBloom({ data }) {
  return <BaseTemplate data={data} theme={THEME} />;
}
