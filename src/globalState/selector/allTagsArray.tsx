import { selector } from "recoil";
import { drafts } from "../atoms/drafts";
import { draftObject } from "./editorState";

export const allTagsArray = selector({
	key: "allTagsArray",
	get: ({ get }) => {
		const draftTagsArray: string[][] = get(drafts).map((item: draftObject) => item.tag);
		const allDraftTagsArray = draftTagsArray.reduce((a, b) => {
			return a.concat(b);
		}, []);
		const filterDuplicatesAllDraftTags = allDraftTagsArray.filter((item, index) => {
			return allDraftTagsArray.indexOf(item) === index;
		});
		return filterDuplicatesAllDraftTags;
	}
});
