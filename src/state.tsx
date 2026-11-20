import React, { createContext, useContext, useState } from 'react';
import { Coverage, renderStencilUri } from './stencil/pipeline';

export type Style = 'Linework' | 'Shading' | 'Crosshatch';
export type Stencil = { id: string; photoUri: string; style: Style; color: string; cov: Coverage; uri: string; createdAt: number };
type S = {
  credits: number; setCredits: (n: number) => void;
  style: Style; setStyle: (s: Style) => void;
  photoUri: string | null; setPhotoUri: (u: string | null) => void;
  lineColor: string; setLineColor: (c: string) => void;
  stencil: Stencil | null; history: Stencil[];
  addStencil: (s: Stencil) => void; openStencil: (id: string) => void; removeStencil: (id: string) => void; recolor: (color: string) => void;
};
const Ctx = createContext<S>(null as any);
export const useApp = () => useContext(Ctx);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [credits, setCredits] = useState(59);
  const [style, setStyle] = useState<Style>('Crosshatch');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [lineColor, setLineColor] = useState('#7E22CE');
  const [stencil, setStencil] = useState<Stencil | null>(null);
  const [history, setHistory] = useState<Stencil[]>([]);
  const addStencil = (s: Stencil) => { setStencil(s); setHistory((h) => [s, ...h]); };
  const openStencil = (id: string) => setHistory((h) => { const f = h.find((x) => x.id === id); if (f) setStencil(f); return h; });
  const removeStencil = (id: string) => { setHistory((h) => h.filter((x) => x.id !== id)); setStencil((s) => (s && s.id === id ? null : s)); };
  const recolor = (color: string) => {
    setLineColor(color);
    if (!stencil) return;
    const next = { ...stencil, color, uri: renderStencilUri(stencil.cov, color) };
    setStencil(next);
    setHistory((h) => h.map((x) => (x.id === next.id ? next : x)));
  };
  return <Ctx.Provider value={{ credits, setCredits, style, setStyle, photoUri, setPhotoUri, lineColor, setLineColor, stencil, history, addStencil, openStencil, removeStencil, recolor }}>{children}</Ctx.Provider>;
}
