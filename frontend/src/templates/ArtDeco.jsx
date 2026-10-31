import React from 'react';
import BaseTemplate from './BaseTemplate';

const THEME = {
  id: 'art-deco',
  name: 'Art Deco Glam',
  themeClass: 'art-deco',
  defaultPrimary: '#e5c158',
  defaultSecondary: '#141414',
  defaultFont: 'Cinzel',
  corners: ['◆', '◆', '◆', '◆'],
  divider: '— ❖ ◆ ❖ —',
  emblem: '⚜️',
  subtitle: 'A Gatsby celebration of glamour, jazz & romance',
  footerText: 'Dress to impress · An unforgettable gala awaits',
  darkTheme: true,
};

export default function ArtDeco({ data }) {
  return <BaseTemplate data={data} theme={THEME} />;
}
