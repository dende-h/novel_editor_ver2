import localforage from "localforage";
import { atom } from "recoil";
import { recoilPersist } from "../../components/util/customRecoilPersist";

localforage.config({
	driver: localforage.INDEXEDDB,
	name: "indexeddb",
	version: 2,
	storeName: "reterature"
});

const { persistAtom } = recoilPersist({
	key: "recoil-isFirstVisit",
	storage: typeof window === "undefined" ? undefined : localforage
});

export const isFirstVisit = atom({
	key: "isFirstVisit",
	default: true,
	effects_UNSTABLE: [persistAtom]
});
