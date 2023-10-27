import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
	key: "recoil-isFirstVisit",
	storage: typeof window === "undefined" ? undefined : localStorage
});

export const isFirstVisit = atom({
	key: "isFirstVisit",
	default: true,
	effects_UNSTABLE: [persistAtom]
});
