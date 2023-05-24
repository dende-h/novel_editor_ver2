import localforage from "localforage";
import { atom } from "recoil";
import { recoilPersist } from "../../components/util/customRecoilPersist";

export type draftData = { id: string; goodMark: number };

localforage.config({
	driver: localforage.INDEXEDDB,
	name: "indexeddb",
	version: 2,
	storeName: "reterature"
});

const { persistAtom } = recoilPersist({
	key: "recoil-publishedDraftsData",
	storage: typeof window === "undefined" ? undefined : localforage
});

const defaultArray: draftData[] = [];

export const publishedDraftsData = atom({
	key: "publishedDraftsData",
	default: defaultArray,
	effects_UNSTABLE: [persistAtom]
});
