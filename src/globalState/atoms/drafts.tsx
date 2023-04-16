import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { draftObject } from "../selector/editorState";
import localforage from "localforage";

export type draftObjectArray = draftObject[];

localforage.config({
	driver: localforage.INDEXEDDB, // Use IndexedDB as the backend storage
	name: "drafts",
	version: 1,
	storeName: "draftObjectArray"
});

const customStorage = () => {
	return {
		setItem: (key, value) => {
			// handle setItem
			localforage.setItem(key, value);
			// if err is non-null, we got an error
		},
		getItem: (key) => {
			// handle getItem
			// this function should return something
			return localforage.getItem(key).then((value) => {
				return value as string;
			});
		},
		clear: () => {
			// clear the whole db
		}
	};
};

const { persistAtom } = recoilPersist({
	key: "recoil-persist",
	storage: typeof window === "undefined" ? undefined : customStorage()
});

const defaultArray: draftObjectArray = [];

export const drafts = atom({
	key: "drafts",
	default: defaultArray,
	effects_UNSTABLE: [persistAtom]
});
