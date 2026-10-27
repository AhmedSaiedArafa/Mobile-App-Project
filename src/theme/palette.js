// Single source of truth for colours (taken from the main design).
// Tailwind classes read these through CSS variables (see tailwind.config.js);
// JS-only props (icon colours, Switch, placeholders) read them through useTheme().colors.

const accents = {
  light: {
    purple: { fg: '#4A31DF', bg: '#EEEBFF' },
    green: { fg: '#16A36A', bg: '#E2F6EC' },
    blue: { fg: '#2F5BEA', bg: '#E6EDFF' },
    orange: { fg: '#F07A1A', bg: '#FFEFE1' },
    red: { fg: '#E5484D', bg: '#FDECEC' },
    teal: { fg: '#0E9F9A', bg: '#E0F5F4' },
    pink: { fg: '#D9367A', bg: '#FCE8F1' },
    yellow: { fg: '#D69A00', bg: '#FFF6DB' },
  },
  dark: {
    purple: { fg: '#FFFFFF', bg: '#5B3FF0' },
    green: { fg: '#FFFFFF', bg: '#14A97A' },
    blue: { fg: '#FFFFFF', bg: '#2F6BFF' },
    orange: { fg: '#FFFFFF', bg: '#FF8A2B' },
    red: { fg: '#FFFFFF', bg: '#E5484D' },
    teal: { fg: '#FFFFFF', bg: '#13A3A0' },
    pink: { fg: '#FFFFFF', bg: '#D9367A' },
    yellow: { fg: '#1A1440', bg: '#F5C341' },
  },
};

export const palettes = {
  light: {
    background: '#F3F4FA',
    surface: '#FFFFFF',
    surfaceAlt: '#F6F6FB',
    input: '#F4F5FA',
    text: '#15123B',
    textMuted: '#6C6F8C',
    textFaint: '#A3A6BE',
    border: '#ECEDF4',
    primary: '#4A31DF',
    primarySoft: '#EEEBFF',
    onSoft: '#4A31DF', // text/icons on primarySoft
    hero: '#4A31DF',
    heroBorder: 'transparent',
    heroInner: 'rgba(255,255,255,0.12)',
    success: '#12A867',
    successSoft: '#E3F7EE',
    danger: '#E5484D',
    dangerSoft: '#FDECEC',
    warning: '#F08A24',
    tabBar: '#FFFFFF',
    tabActive: '#4A31DF',
    overlay: 'rgba(16,12,48,0.45)',
    tiles: { purple: '#F1EEFF', green: '#E4F7EE', blue: '#E8EEFF', orange: '#FFF0E3' },
    accents: accents.light,
  },
  dark: {
    background: '#0C0A2A',
    surface: '#17134A',
    surfaceAlt: '#1F1A5C',
    input: '#1F1A5C',
    text: '#FFFFFF',
    textMuted: '#B4B1DA',
    textFaint: '#7C78A8',
    border: 'rgba(255,255,255,0.08)',
    primary: '#5B3FF0',
    primarySoft: 'rgba(91,63,240,0.25)',
    onSoft: '#FFFFFF',
    hero: '#2A2386',
    heroBorder: 'rgba(255,255,255,0.18)',
    heroInner: 'rgba(255,255,255,0.07)',
    success: '#2BD48A',
    successSoft: 'rgba(43,212,138,0.15)',
    danger: '#FF6B6F',
    dangerSoft: 'rgba(255,107,111,0.15)',
    warning: '#FF9D45',
    tabBar: '#120F3E',
    tabActive: '#7C64FF',
    overlay: 'rgba(5,4,20,0.65)',
    tiles: { purple: '#25207A', green: '#0D4A47', blue: '#143479', orange: '#6B3520' },
    accents: accents.dark,
  },
};

const kebab = (s) => s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

/**
 * Flattens a palette into CSS variables: { '--surface': '#fff', '--tile-purple': ... }.
 * Accents stay JS-only: they colour icons, which need a plain colour value.
 */
export function toCssVars(p) {
  const out = {};
  Object.entries(p).forEach(([k, v]) => {
    if (typeof v === 'string') out[`--${kebab(k)}`] = v;
  });
  Object.entries(p.tiles).forEach(([k, v]) => {
    out[`--tile-${k}`] = v;
  });
  return out;
}
