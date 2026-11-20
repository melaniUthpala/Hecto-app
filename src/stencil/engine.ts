/**
 * On-device stencil engine (no server, no native modules).
 * photo pixels -> grayscale -> "ink coverage" map (0..255) for one of three styles.
 * Coverage is kept so the line colour can be changed instantly without re-processing.
 */
export type StencilStyle = 'Linework' | 'Shading' | 'Crosshatch';
export type Coverage = { w: number; h: number; data: Uint8Array };

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = (a: number, b: number, v: number) => { const t = clamp01((v - a) / (b - a)); return t * t * (3 - 2 * t); };

export function toGray(rgba: ArrayLike<number>, w: number, h: number): Float32Array {
  const g = new Float32Array(w * h);
  for (let i = 0, p = 0; i < g.length; i++, p += 4) g[i] = (0.299 * rgba[p] + 0.587 * rgba[p + 1] + 0.114 * rgba[p + 2]) / 255;
  return g;
}

/** stretch contrast between the 2nd and 98th percentile */
export function normalize(g: Float32Array): Float32Array {
  const hist = new Uint32Array(256);
  for (let i = 0; i < g.length; i++) hist[Math.min(255, (g[i] * 255) | 0)]++;
  const lo = g.length * 0.02, hi = g.length * 0.98;
  let acc = 0, a = 0, b = 255;
  for (let i = 0; i < 256; i++) { acc += hist[i]; if (acc >= lo) { a = i; break; } }
  acc = 0;
  for (let i = 0; i < 256; i++) { acc += hist[i]; if (acc >= hi) { b = i; break; } }
  const span = Math.max(24, b - a);
  const out = new Float32Array(g.length);
  for (let i = 0; i < g.length; i++) out[i] = clamp01((g[i] * 255 - a) / span);
  return out;
}

export function gaussian(src: Float32Array, w: number, h: number, sigma: number): Float32Array {
  const r = Math.max(1, Math.ceil(sigma * 2.5));
  const k = new Float32Array(2 * r + 1);
  let sum = 0;
  for (let i = -r; i <= r; i++) { const v = Math.exp(-(i * i) / (2 * sigma * sigma)); k[i + r] = v; sum += v; }
  for (let i = 0; i < k.length; i++) k[i] /= sum;
  const tmp = new Float32Array(w * h), out = new Float32Array(w * h);
  for (let y = 0; y < h; y++) {
    const row = y * w;
    for (let x = 0; x < w; x++) {
      let s = 0;
      for (let i = -r; i <= r; i++) { let xx = x + i; if (xx < 0) xx = 0; else if (xx >= w) xx = w - 1; s += src[row + xx] * k[i + r]; }
      tmp[row + x] = s;
    }
  }
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let s = 0;
      for (let i = -r; i <= r; i++) { let yy = y + i; if (yy < 0) yy = 0; else if (yy >= h) yy = h - 1; s += tmp[yy * w + x] * k[i + r]; }
      out[y * w + x] = s;
    }
  }
  return out;
}

/** 1 where the pixel is plain background connected to the image border (so we don't hatch backdrops) */
export function backgroundMask(g: Float32Array, w: number, h: number): Uint8Array {
  const border: number[] = [];
  for (let x = 0; x < w; x += 3) { border.push(g[x], g[(h - 1) * w + x]); }
  for (let y = 0; y < h; y += 3) { border.push(g[y * w], g[y * w + w - 1]); }
  border.sort((a, b) => a - b);
  const med = border[border.length >> 1];
  let spread = 0;
  for (const v of border) spread += Math.abs(v - med);
  spread /= border.length;
  const mask = new Uint8Array(w * h);
  if (spread > 0.12) return mask; // busy border: no clean backdrop to remove
  const q = new Int32Array(w * h);
  let head = 0, tail = 0;
  // seeds: border pixels close to the border median; then grow through smooth gradients only,
  // so soft vignettes/glows are removed but real edges (petals, skin outline) stop the fill
  const seed = (i: number) => { if (!mask[i] && Math.abs(g[i] - med) < 0.2 + spread) { mask[i] = 1; q[tail++] = i; } };
  const grow = (j: number, from: number) => { if (!mask[j] && Math.abs(g[j] - g[from]) < 0.03 && Math.abs(g[j] - med) < 0.45) { mask[j] = 1; q[tail++] = j; } };
  for (let x = 0; x < w; x++) { seed(x); seed((h - 1) * w + x); }
  for (let y = 0; y < h; y++) { seed(y * w); seed(y * w + w - 1); }
  while (head < tail) {
    const i = q[head++], x = i % w, y = (i / w) | 0;
    if (x > 0) grow(i - 1, i);
    if (x < w - 1) grow(i + 1, i);
    if (y > 0) grow(i - w, i);
    if (y < h - 1) grow(i + w, i);
  }
  // reject if it swallowed almost everything (then it is not a backdrop)
  let n = 0; for (let i = 0; i < mask.length; i++) n += mask[i];
  if (n > mask.length * 0.85) return new Uint8Array(w * h);
  // erode a few pixels so the subject outline itself survives
  let cur = mask;
  for (let it = 0; it < 4; it++) {
    const nx = new Uint8Array(w * h);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const i = y * w + x;
      nx[i] = cur[i] && (x === 0 || cur[i - 1]) && (x === w - 1 || cur[i + 1]) && (y === 0 || cur[i - w]) && (y === h - 1 || cur[i + w]) ? 1 : 0;
    }
    cur = nx;
  }
  return cur;
}

const BAYER = [0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22,
  3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21];

export function buildCoverage(gray: Float32Array, w: number, h: number, style: StencilStyle, onStep?: () => Promise<void>): Promise<Coverage> | Coverage {
  return (async () => {
    const g = normalize(gray);
    const g1 = gaussian(g, w, h, 1.0);
    const g2 = gaussian(g, w, h, 1.7);
    if (onStep) await onStep();
    const bg = backgroundMask(gaussian(g, w, h, 2), w, h);
    const tone = gaussian(g, w, h, style === 'Shading' ? 2.2 : 1.6);
    if (onStep) await onStep();

    const out = new Uint8Array(w * h);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = y * w + x;
        const d = g1[i] - g2[i];
        let line = smooth(0.012, 0.05, -d) * 0.95 + smooth(0.03, 0.09, d) * 0.25;
        let fill = 0;
        const dark = 1 - tone[i];
        if (style === 'Shading') {
          const t = smooth(0.28, 0.9, dark);
          const th = (BAYER[(((y >> 1) & 7) << 3) | ((x >> 1) & 7)] + 0.5) / 64;
          fill = t > th ? 0.85 : 0;
          line *= 0.8;
        } else if (style === 'Crosshatch') {
          const P = 6;
          const ln = (v: number) => { const m = ((v % P) + P) % P; return m < 1 ? 1 : m < 2 ? 2 - m : 0; };
          if (dark > 0.28) fill = Math.max(fill, ln(x + y) * 0.9);
          if (dark > 0.5) fill = Math.max(fill, ln(x - y) * 0.9);
          if (dark > 0.7) fill = Math.max(fill, ln(y * 1.0) * 0.9);
          if (dark > 0.86) fill = Math.max(fill, ln(x * 1.0) * 0.9);
          line *= 0.9;
        }
        if (bg[i]) { fill = 0; line *= 0.15; }
        out[i] = Math.round(255 * clamp01(Math.max(line, fill)));
      }
    }
    return { w, h, data: out };
  })() as any;
}

/** ink coverage + colour -> RGBA (transparent background, so it can sit on skin) */
export function coverageToRGBA(cov: Coverage, hex: string, mirror = false): Uint8Array {
  const r = parseInt(hex.slice(1, 3), 16), gC = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
  const { w, h, data } = cov;
  const out = new Uint8Array(w * h * 4);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const sx = mirror ? w - 1 - x : x;
    const a = data[y * w + sx], o = (y * w + x) * 4;
    out[o] = r; out[o + 1] = gC; out[o + 2] = b; out[o + 3] = a;
  }
  return out;
}
