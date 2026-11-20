export const c = {
  bg: '#121212', surface: '#1B1B1B', raised: '#252525', line: '#2A2A2A', tabbar: '#171717',
  text: '#F5F5F5', muted: '#9A9A9A', dim: '#6E6E6E',
  primary: '#7C5CFA', primaryLight: '#B9A8FF', amber: '#F5C451', green: '#4ADE80', red: '#F87171', blue: '#60A5FA',
};
const fam = { 400: 'Manrope_400Regular', 500: 'Manrope_500Medium', 600: 'Manrope_600SemiBold', 700: 'Manrope_700Bold', 800: 'Manrope_800ExtraBold' } as const;
/** font(700, 16) -> text style, mirrors the design's `font: 700 16px Manrope` */
export const font = (w: 400 | 500 | 600 | 700 | 800, size: number, lh?: number) => ({
  fontFamily: fam[w], fontSize: size, lineHeight: lh ? Math.round(size * lh) : undefined,
});
export const radius = { sm: 10, md: 12, lg: 14, xl: 16 };
