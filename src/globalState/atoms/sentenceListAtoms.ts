import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export type SentenceData = {
	id: string;
	original: string;
	translated: string;
	memo: string;
};

const { persistAtom } = recoilPersist({
	key: "recoil-persist",
	storage: typeof window === "undefined" ? undefined : localStorage
});

const defaultValue: SentenceData[] = [];

export const sentenceListAtoms = atom({
	key: "sentenceListAtoms",
	default: defaultValue,
	effects_UNSTABLE: [persistAtom]
});
