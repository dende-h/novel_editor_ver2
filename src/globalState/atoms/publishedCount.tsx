"use client";
import localforage from "localforage";
import { atom } from "recoil";
import { recoilPersist } from "../../components/util/customRecoilPersist";

typeof window === "undefined"
	? undefined
	: localforage.config({
			driver: localforage.INDEXEDDB,
			name: "indexeddb",
			version: 2,
			storeName: "reterature"
	  });

const { persistAtom } = recoilPersist({
	key: "recoil-publishedCount",
	storage: typeof window === "undefined" ? undefined : localforage
});

export const publishedCount = atom({
	key: "publishedCount",
	default: 0,
	effects_UNSTABLE: [persistAtom]
});
