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
			await localforage.setItem(key, value);
		},
		getItem: async (key: string): Promise<string> => {
			const value: string = await localforage.getItem(key);
			return value || "";
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
