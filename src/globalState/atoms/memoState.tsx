import { atom } from "recoil";
export type Item = {  t: string; x: number; y: number; c: number };
export type Items = { id: string; memoList: { [key: string]: Item } };
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
	key: "recoil-persist",
	storage: typeof window === "undefined" ? undefined : localStorage
});

export const memoState = atom({
	key: "memoState",
	default: [],
	effects_UNSTABLE: [persistAtom]
});
