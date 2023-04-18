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
		setItem: (key: string, value: string) => {
			// handle setItem
			localforage.setItem(key, value);
			// if err is non-null, we got an error
		},
		getItem: (key: string) => {
			// handle getItem
			// this function should return something
			return new Promise<string>((resolve, reject) => {
				localforage.getItem(key, (err, value: string | null) => {
					if (err) {
						reject(err);
					} else {
						resolve(value || "");
					}
				});
			});
		}
	};
};

const { persistAtom } = recoilPersist({
	key: "recoil-persist",
	// @ts-ignore
	storage: typeof window === "undefined" ? undefined : customStorage()
});

const defaultArray: draftObjectArray = [];

export const drafts = atom({
	key: "drafts",
	default: defaultArray,
	effects_UNSTABLE: [persistAtom]
});
