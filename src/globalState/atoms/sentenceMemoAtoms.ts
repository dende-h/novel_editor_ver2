// src/RecoilAtoms/sentenceListAtoms.ts
import { atomFamily } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: typeof window === "undefined" ? undefined : localStorage,
});

export const sentenceMemoAtoms = atomFamily<string, string>({
  key: "sentenceMemoAtoms",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
