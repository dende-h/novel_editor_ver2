import localforage from "localforage";
import { atom } from "recoil";
import { recoilPersist } from "../../components/util/customRecoilPersist";

localforage.config({
	driver: localforage.INDEXEDDB,
	name: "userName",
	version: 2,
	storeName: "userName"
});

const { persistAtom } = recoilPersist({
	key: "recoil-persist",
	storage: typeof window === "undefined" ? undefined : localforage
});

export const userName = atom({
	key: "userName",
	default: "Ghost Writer",
	effects_UNSTABLE: [persistAtom]
});
