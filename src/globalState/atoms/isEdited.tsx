import localforage from "localforage";
import { atom } from "recoil";
import { recoilPersist } from "../../components/util/customRecoilPersist";


localforage.config({
	driver: localforage.INDEXEDDB,
	name: "isEdited",
	version: 2,
	storeName: "isEditedFlag"
});

const { persistAtom } = recoilPersist({
	key: "recoil-persist",
	storage: typeof window === "undefined" ? undefined : localforage
});

export const isEdited = atom({
	key: "isEdited",
	default: false,
	effects_UNSTABLE: [persistAtom]
});
