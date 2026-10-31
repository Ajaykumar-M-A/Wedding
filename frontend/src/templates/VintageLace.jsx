import React from 'react';
import BaseTemplate from './BaseTemplate';

const THEME = {
  id: 'vintage-lace',
  name: 'Vintage Lace',
  themeClass: 'vintage-lace',
  defaultPrimary: '#8b7355',
  defaultSecondary: '#f5f0e8',
  defaultFont: 'Playfair Display',
  corners: ['❦', '❦', '❦', '❦'],
  divider: '— ❦ 𑁍 ❦ —',
  emblem: '📜',
  subtitle: 'The honor of your gracious presence is requested',
  footerText: 'An enduring story written through time',
  darkTheme: false,
};

export default function VintageLace({ data }) {
  return <BaseTemplate data={data} theme={THEME} />;
}
