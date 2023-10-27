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
	key: "recoil-passWord",
	storage: typeof window === "undefined" ? undefined : localforage
});

const initValue: string = null;

export const passWord = atom({
	key: "passWord",
	default: initValue,
	effects_UNSTABLE: [persistAtom]
});
