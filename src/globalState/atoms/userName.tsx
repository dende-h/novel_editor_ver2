"use client";
import localforage from "localforage";
import { atom } from "recoil";
import { recoilPersist } from "../../components/util/customRecoilPersist";

localforage.config({
	driver: localforage.INDEXEDDB,
	name: "indexeddb",
	version: 2,
	storeName: "reterature"
});

const { persistAtom } = recoilPersist({
	key: "recoil-userName",
	storage: typeof window === "undefined" ? undefined : localforage
});

export const userName = atom({
	key: "userName",
	default: "Ghost Writer",
	effects_UNSTABLE: [persistAtom]
});
