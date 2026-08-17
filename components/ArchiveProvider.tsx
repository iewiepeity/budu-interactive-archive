"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type State = { anomaly: number; affection: number; badges: string[]; magicType: string | null; flags: string[]; playthroughs: number };
type Archive = State & { disturb: (amount?: number) => void; addAffection: (amount: number) => void; unlock: (id: string) => void; mark: (flag: string) => void; setMagicType: (type: string) => void; completeRun: () => void; reset: () => void; ready: boolean };
const initial: State = { anomaly: 0, affection: 0, badges: [], magicType: null, flags: [], playthroughs: 0 };
const Context = createContext<Archive | null>(null);

export function ArchiveProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>(initial);
  const [ready, setReady] = useState(false);
  useEffect(() => { const raw = localStorage.getItem("budu-archive-v1"); if (raw) try { const saved=JSON.parse(raw); setState({ ...initial, ...saved, badges:Array.isArray(saved.badges)?saved.badges:[], flags:Array.isArray(saved.flags)?saved.flags:[] }); } catch {} setReady(true); }, []);
  useEffect(() => { if (ready) localStorage.setItem("budu-archive-v1", JSON.stringify(state)); }, [state, ready]);
  const value = useMemo<Archive>(() => ({ ...state, ready,
    disturb: (amount = 1) => setState(s => ({ ...s, anomaly: Math.min(5, s.anomaly + amount) })),
    addAffection: amount => setState(s => ({ ...s, affection: s.affection + amount })),
    unlock: id => setState(s => s.badges.includes(id) ? s : ({ ...s, badges: [...s.badges, id] })),
    mark: flag => setState(s => s.flags.includes(flag) ? s : ({ ...s, flags: [...s.flags, flag] })),
    setMagicType: magicType => setState(s => ({ ...s, magicType })),
    completeRun: () => setState(s => ({ ...s, playthroughs: s.playthroughs + 1, flags: s.flags.includes("prologue-complete") ? s.flags : [...s.flags, "prologue-complete"] })),
    reset: () => setState(initial),
  }), [state, ready]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useArchive() { const value = useContext(Context); if (!value) throw new Error("ArchiveProvider missing"); return value; }
