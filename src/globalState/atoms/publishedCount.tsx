import localforage from "localforage";
import { atom } from "recoil";
import { recoilPersist } from "../../components/util/customRecoilPersist";

localforage.config({
	driver: localforage.INDEXEDDB,
	name: "publishedCount",
	version: 2,
	storeName: "publishedDraftsCount"
});

const { persistAtom } = recoilPersist({
	key: "recoil-persist",
	storage: typeof window === "undefined" ? undefined : localforage
});

export const publishedCount = atom({
	key: "publishedCount",
	default: 0,
	effects_UNSTABLE: [persistAtom]
});
