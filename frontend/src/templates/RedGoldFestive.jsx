import React from 'react';
import BaseTemplate from './BaseTemplate';

const THEME = {
  id: 'red-gold-festive',
  name: 'Red & Gold Festive',
  themeClass: 'red-gold-festive',
  defaultPrimary: '#fbbf24',
  defaultSecondary: '#730f14',
  defaultFont: 'Cinzel',
  corners: ['🪔', '✨', '✨', '🪔'],
  divider: '— 🪔 ॥ ॐ ॥ 🪔 —',
  emblem: '🪔',
  subtitle: '॥ ॐ गं गणपतये नमः ॥ Auspicious Wedding Festivities',
  footerText: 'With happiness in our hearts, we invite you to share our joy',
  darkTheme: true,
};

export default function RedGoldFestive({ data }) {
  return <BaseTemplate data={data} theme={THEME} />;
}
