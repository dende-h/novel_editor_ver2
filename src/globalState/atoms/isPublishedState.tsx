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
	key: "recoil-isPublished",
	storage: typeof window === "undefined" ? undefined : localforage
});

export const isPublishedState = atom({
	key: "isPublished",
	default: false,
	effects_UNSTABLE: [persistAtom]
});
