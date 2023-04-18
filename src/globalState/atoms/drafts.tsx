/* eslint-disable @typescript-eslint/ban-ts-comment */
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { draftObject } from "../selector/editorState";
import localforage from "localforage";
import { PersistStorage } from "recoil-persist";

export type draftObjectArray = draftObject[];

localforage.config({
	driver: localforage.INDEXEDDB,
	name: "drafts",
	version: 2,
	storeName: "draftObject"
});

const customStorage = (): PersistStorage => {
	return {
		setItem: async (key: string, value: string) => {
			console.log(`Saving data for key ${key}: ${value}`);
			await localforage.setItem(key, value);
			console.log(`Saved data for key ${key}: ${value}`);
		},
		getItem: async (key: string): Promise<string> => {
			console.log(`Retrieving data for key ${key}`);
			const value: string = await localforage.getItem(key);
			console.log(`Retrieved data for key ${key}: ${value}`);
			return value === null ? undefined : value;
		}
	};
};

const { persistAtom } = recoilPersist({
	key: "recoil-persist",

	storage: typeof window === "undefined" ? undefined : customStorage()
});

export const drafts = atom({
	key: "drafts",
	default: [],
	effects_UNSTABLE: [persistAtom]
});
