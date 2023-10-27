"use client";
import { atom } from "recoil";
import { recoilPersist } from "../../components/util/customRecoilPersist";
import { draftObject } from "../selector/editorState";
import localforage from "localforage";

export type draftObjectArray = draftObject[];

localforage.config({
	driver: localforage.INDEXEDDB,
	name: "indexeddb",
	version: 2,
	storeName: "reterature"
});

const { persistAtom } = recoilPersist({
	key: "recoil-drafts",
	storage: typeof window === "undefined" ? undefined : localforage
});

const defaultObjectArray: draftObjectArray = [];

export const drafts = atom({
	key: "drafts",
	default: defaultObjectArray,
	effects_UNSTABLE: [persistAtom]
});
