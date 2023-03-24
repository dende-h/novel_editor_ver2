import { selector } from "recoil";
import { draftObjectArray, drafts } from "../atoms/drafts";

export const publishSettingsCountSelector = selector({
	key: "publishSettingsCountSelector",
	get: ({ get }) => {
		const draftsAll: draftObjectArray = get(drafts);

		const publishedDrafts = draftsAll.filter((item) => {
			return item.isPublished;
		});
		const publishSettingsCount = publishedDrafts.length;
		return publishSettingsCount;
	}
});
