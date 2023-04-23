import localforage from "localforage";
import { atom } from "recoil";
import { recoilPersist } from "../../components/util/customRecoilPersist";

localforage.config({
	driver: localforage.INDEXEDDB,
	name: "tagSearchState",
	version: 2,
	storeName: "tagSearchState"
});

const { persistAtom } = recoilPersist({
	key: "recoil-persist",
	storage: typeof window === "undefined" ? undefined : localforage
});

const defaultValue: string[] = [];

export const tagSearchState = atom({
	key: "tagSearchState",
	default: defaultValue,
	effects_UNSTABLE: [persistAtom]
});
