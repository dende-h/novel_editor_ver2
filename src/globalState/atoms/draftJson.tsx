"use client";
import { atom } from "recoil";
import { recoilPersist } from "../../components/util/customRecoilPersist";
import localforage from "localforage";

export type DraftJson = {
	id: string;
	json: string;
};

typeof window === "undefined"
	? undefined
	: localforage.config({
			driver: localforage.INDEXEDDB,
			name: "indexeddb",
			version: 2,
			storeName: "reterature"
	  });

const { persistAtom } = recoilPersist({
	key: "recoil-json",
	storage: typeof window === "undefined" ? undefined : localforage
});

const initJson: DraftJson[] = null;

export const draftsJson = atom({
	key: "draftsJson",
	default: initJson,
	effects_UNSTABLE: [persistAtom]
});
