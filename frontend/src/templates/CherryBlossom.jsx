import React from 'react';
import BaseTemplate from './BaseTemplate';

const THEME = {
  id: 'cherry-blossom',
  name: 'Cherry Blossom',
  themeClass: 'cherry-blossom',
  defaultPrimary: '#e11d48',
  defaultSecondary: '#fff1f2',
  defaultFont: 'Cormorant Garamond',
  corners: ['🌸', '🌸', '🌸', '🌸'],
  divider: '— 🌸 ❀ 🌸 —',
  emblem: '🌸',
  subtitle: 'Under the gentle sakura blooms of love',
  footerText: 'May our love bloom eternal like the cherry blossoms',
  darkTheme: false,
};

export default function CherryBlossom({ data }) {
  return <BaseTemplate data={data} theme={THEME} />;
}
