import localforage from "localforage";
import { atom } from "recoil";
import { recoilPersist } from "../../components/util/customRecoilPersist";

localforage.config({
	driver: localforage.INDEXEDDB,
	name: "lastPublishedTime",
	version: 2,
	storeName: "lastPublishedTime"
});

const { persistAtom } = recoilPersist({
	key: "recoil-lastPublishedTime",
	storage: typeof window === "undefined" ? undefined : localforage
});

const initialValue = "No novels in public";

export const lastPublishedTime = atom({
	key: "lastPublishedTime",
	default: initialValue,
	effects_UNSTABLE: [persistAtom]
});
