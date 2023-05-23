import { atom } from "recoil";
import { recoilPersist } from "../../components/util/customRecoilPersist";
import localforage from "localforage";

export type draftJson = {
	id: string;
	json: string;
};

localforage.config({
	driver: localforage.INDEXEDDB,
	name: "draftsJson",
	version: 2,
	storeName: "draftsJson"
});

const { persistAtom } = recoilPersist({
	key: "recoil-json",
	storage: typeof window === "undefined" ? undefined : localforage
});

const initJson: draftJson[] = [];

export const draftsJson = atom({
	key: "draftsJson",
	default: initJson,
	effects_UNSTABLE: [persistAtom]
});
