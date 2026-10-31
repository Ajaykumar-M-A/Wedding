import React from 'react';
import BaseTemplate from './BaseTemplate';

const THEME = {
  id: 'purple-royale',
  name: 'Purple Royale',
  themeClass: 'purple-royale',
  defaultPrimary: '#e2e8f0',
  defaultSecondary: '#360a59',
  defaultFont: 'Playfair Display',
  corners: ['👑', '💜', '💎', '👑'],
  divider: '— 👑 ✦ 👑 —',
  emblem: '💜',
  subtitle: 'An imperial celebration of everlasting love',
  footerText: 'Honored to celebrate with our closest family and friends',
  darkTheme: true,
};

export default function PurpleRoyale({ data }) {
  return <BaseTemplate data={data} theme={THEME} />;
}
