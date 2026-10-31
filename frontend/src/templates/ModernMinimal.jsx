import React from 'react';
import BaseTemplate from './BaseTemplate';

const THEME = {
  id: 'modern-minimal',
  name: 'Modern Minimal',
  themeClass: 'modern-minimal',
  defaultPrimary: '#111111',
  defaultSecondary: '#e5e7eb',
  defaultFont: 'Inter',
  corners: ['·', '·', '·', '·'],
  divider: '— — — —',
  emblem: '◻',
  subtitle: 'INVITE YOU TO CELEBRATE THEIR WEDDING',
  footerText: 'Join us for drinks, dinner & celebration',
  darkTheme: false,
};

export default function ModernMinimal({ data }) {
  return <BaseTemplate data={data} theme={THEME} />;
}
