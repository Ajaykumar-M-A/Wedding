import React from 'react';
import BaseTemplate from './BaseTemplate';

const THEME = {
  id: 'ivory-pearl',
  name: 'Ivory & Pearl Classic',
  themeClass: 'ivory-pearl',
  defaultPrimary: '#64748b',
  defaultSecondary: '#fefdf9',
  defaultFont: 'Cormorant Garamond',
  corners: ['🤍', '🕊️', '🤍', '🕊️'],
  divider: '— 🕊️ ❀ 🕊️ —',
  emblem: '🤍',
  subtitle: 'Together with their families, request your presence & blessings',
  footerText: 'Classic elegance, timeless devotion',
  darkTheme: false,
};

export default function IvoryPearl({ data }) {
  return <BaseTemplate data={data} theme={THEME} />;
}
