import { atom } from "recoil";
export type Item = { id: string | null; t: string; x: number; y: number; c: number };
export type Items = { [key: string]: Item };
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
	key: "recoil-persist",
	storage: typeof window === "undefined" ? undefined : localStorage
});

export const memoState = atom({
	key: "memoState",
	default: null,
	effects_UNSTABLE: [persistAtom]
});
