import React from 'react';
import BaseTemplate from './BaseTemplate';

const THEME = {
  id: 'celestial-starry',
  name: 'Celestial Starry Night',
  themeClass: 'celestial-starry',
  defaultPrimary: '#c7d2fe',
  defaultSecondary: '#0d1b4b',
  defaultFont: 'Cinzel',
  corners: ['✨', '⭐', '🌙', '✨'],
  divider: '— ✧ ✦ ⋆ ✦ ✧ —',
  emblem: '✨',
  subtitle: 'Written in the stars · Under the cosmic night sky',
  footerText: 'Dance under starlight with us',
  darkTheme: true,
};

export default function CelestialStarry({ data }) {
  return <BaseTemplate data={data} theme={THEME} />;
}
