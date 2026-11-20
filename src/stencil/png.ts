import { encodeBase64 } from './base64';

/** Minimal PNG writer (uncompressed "stored" deflate blocks) so no zlib/native module is needed. */
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf: Uint8Array, start: number, end: number): number {
  let c = 0xffffffff;
  for (let i = start; i < end; i++) c = CRC_TABLE[(c ^ buf[i]) & 255] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
const u32 = (b: Uint8Array, o: number, v: number) => { b[o] = (v >>> 24) & 255; b[o + 1] = (v >>> 16) & 255; b[o + 2] = (v >>> 8) & 255; b[o + 3] = v & 255; };

/** rgba: w*h*4 bytes -> PNG bytes */
export function encodePNG(rgba: Uint8Array, w: number, h: number): Uint8Array {
  const rowLen = w * 4 + 1;
  const raw = new Uint8Array(rowLen * h);
  for (let y = 0; y < h; y++) { raw[y * rowLen] = 0; raw.set(rgba.subarray(y * w * 4, (y + 1) * w * 4), y * rowLen + 1); }

  // zlib stream with stored blocks
  const MAX = 65535;
  const blocks = Math.max(1, Math.ceil(raw.length / MAX));
  const zlen = 2 + raw.length + blocks * 5 + 4;
  const z = new Uint8Array(zlen);
  let o = 0;
  z[o++] = 0x78; z[o++] = 0x01;
  let a = 1, b = 0;
  for (let p = 0; p < raw.length; p += MAX) {
    const len = Math.min(MAX, raw.length - p);
    z[o++] = p + len >= raw.length ? 1 : 0;
    z[o++] = len & 255; z[o++] = (len >> 8) & 255; z[o++] = ~len & 255; z[o++] = (~len >> 8) & 255;
    z.set(raw.subarray(p, p + len), o); o += len;
  }
  for (let i = 0; i < raw.length; i++) { a = (a + raw[i]) % 65521; b = (b + a) % 65521; }
  u32(z, o, ((b << 16) | a) >>> 0); o += 4;

  const out = new Uint8Array(8 + 25 + 12 + z.length + 12);
  out.set([137, 80, 78, 71, 13, 10, 26, 10], 0);
  let p = 8;
  const chunk = (type: string, data: Uint8Array) => {
    u32(out, p, data.length);
    for (let i = 0; i < 4; i++) out[p + 4 + i] = type.charCodeAt(i);
    out.set(data, p + 8);
    u32(out, p + 8 + data.length, crc32(out, p + 4, p + 8 + data.length));
    p += 12 + data.length;
  };
  const ihdr = new Uint8Array(13);
  u32(ihdr, 0, w); u32(ihdr, 4, h); ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  chunk('IHDR', ihdr);
  chunk('IDAT', z);
  chunk('IEND', new Uint8Array(0));
  return out.subarray(0, p);
}

export const pngDataUri = (rgba: Uint8Array, w: number, h: number) => 'data:image/png;base64,' + encodeBase64(encodePNG(rgba, w, h));
