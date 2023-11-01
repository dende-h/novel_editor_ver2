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
	key: "recoil-userImageUrl",
	storage: typeof window === "undefined" ? undefined : localforage
});

const defaultImage = { url: "", fileName: "" };

export const userImageUrl = atom({
	key: "userImageUrl",
	default: defaultImage,
	effects_UNSTABLE: [persistAtom]
});
