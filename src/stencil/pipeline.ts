import { Image } from 'react-native';
import * as IM from 'expo-image-manipulator';
import { decodeBase64 } from './base64';
import { toGray, buildCoverage, coverageToRGBA, Coverage, StencilStyle } from './engine';
import { pngDataUri } from './png';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jpeg = require('jpeg-js');

export const tick = () => new Promise<void>((r) => setTimeout(r, 24));
export type { Coverage, StencilStyle };

const getSize = (uri: string) => new Promise<{ w: number; h: number }>((res, rej) => Image.getSize(uri, (w, h) => res({ w, h }), rej));

/** shrink the photo (stencils don't need 12 MP) and return JPEG base64 */
async function shrinkToJpegBase64(uri: string, maxSide: number): Promise<string> {
  const { w, h } = await getSize(uri);
  const scale = Math.min(1, maxSide / Math.max(w, h));
  const size = w >= h ? { width: Math.round(w * scale) } : { height: Math.round(h * scale) };
  const M: any = IM;
  if (M.ImageManipulator?.manipulate) {
    const ctx = M.ImageManipulator.manipulate(uri);
    ctx.resize(size);
    const ref = await ctx.renderAsync();
    const out = await ref.saveAsync({ format: M.SaveFormat.JPEG, compress: 0.9, base64: true });
    return out.base64;
  }
  const out = await M.manipulateAsync(uri, [{ resize: size }], { format: M.SaveFormat.JPEG, compress: 0.9, base64: true });
  return out.base64;
}

export async function photoToGray(uri: string, maxSide = 640) {
  const b64 = await shrinkToJpegBase64(uri, maxSide);
  const img = jpeg.decode(decodeBase64(b64), { useTArray: true, formatAsRGBA: true });
  return { gray: toGray(img.data, img.width, img.height), w: img.width as number, h: img.height as number };
}

export async function makeCoverage(gray: Float32Array, w: number, h: number, style: StencilStyle, onStep: () => Promise<void>): Promise<Coverage> {
  return (await buildCoverage(gray, w, h, style, onStep)) as Coverage;
}

/** coverage + colour -> transparent PNG data URI */
export const renderStencilUri = (cov: Coverage, color: string, mirror = false) => pngDataUri(coverageToRGBA(cov, color, mirror), cov.w, cov.h);
