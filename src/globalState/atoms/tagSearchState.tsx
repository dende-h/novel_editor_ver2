import { atom } from "recoil";

const defaultValue: string[] = [];

export const tagSearchState = atom({
	key: "tagSearchState",
	default: defaultValue
});
