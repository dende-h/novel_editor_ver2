import localforage from "localforage";
import { atom } from "recoil";
import { recoilPersist } from "../../components/util/customRecoilPersist";

localforage.config({
	driver: localforage.INDEXEDDB,
	name: "isSelected",
	version: 2,
	storeName: "isSelectedFlag"
});

const { persistAtom } = recoilPersist({
	key: "recoil-isSelected",
	storage: typeof window === "undefined" ? undefined : localforage
});

export const isSelected = atom({
	key: "isSelected",
	default: false,
	effects_UNSTABLE: [persistAtom]
});
