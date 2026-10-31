import React from 'react';
import BaseTemplate from './BaseTemplate';

const THEME = {
  id: 'black-tie',
  name: 'Black Tie Elegant',
  themeClass: 'black-tie',
  defaultPrimary: '#c9a96e',
  defaultSecondary: '#111111',
  defaultFont: 'Playfair Display',
  corners: ['·', '·', '·', '·'],
  divider: '— ❖ —',
  emblem: '🥂',
  subtitle: 'Request the pleasure of your company at their black-tie wedding',
  footerText: 'Formal reception, dining & champagne celebration',
  darkTheme: true,
};

export default function BlackTie({ data }) {
  return <BaseTemplate data={data} theme={THEME} />;
}
