import { selector } from "recoil";
import { drafts } from "../atoms/drafts";
import { draftsJson } from "../atoms/draftJson";
import { isPublishedState } from "../atoms/isPublishedState";
import { isSelected } from "../atoms/isSelected";
import { lastPublishedTime } from "../atoms/lastPublishedTime";
import { publishedCount } from "../atoms/publishedCount";
import { publishedDraftsData } from "../atoms/publishedDraftsData";
import { userImageUrl } from "../atoms/userImageUrl";
import { userIntroduction } from "../atoms/userIntroduction";
import { userName } from "../atoms/userName";
import { passWord } from "../atoms/passWord";

export type BackUpDataObject = {
	id?: string;
	drafts_data: string;
	drafts_json_data: string;
	is_published: boolean;
	is_selected: boolean;
	last_published: string;
	published_count: number;
	published_draft: string;
	user_image: string;
	user_introduction: string;
	password: string;
	user_name: string;
};

export const backUpData = selector({
	key: "backUpData",
	get: ({ get }) => {
		const draftsData: string = JSON.stringify(get(drafts));
		const draftsJsonData: string = JSON.stringify(get(draftsJson));
		const isPublishedStateData: boolean = get(isPublishedState);
		const isSelectedData: boolean = get(isSelected);
		const lastPublishedTimeData: string = get(lastPublishedTime);
		const publishedCountData: number = get(publishedCount);
		const publishedDraftsDataData: string = JSON.stringify(get(publishedDraftsData));
		const userImageUrlData: string = JSON.stringify(get(userImageUrl));
		const userIntroductionData: string = get(userIntroduction);
		const userNameData: string = get(userName);
		const passWordData: string = get(passWord);

		const backUpDataObject: BackUpDataObject = {
			drafts_data: draftsData,
			drafts_json_data: draftsJsonData,
			is_published: isPublishedStateData,
			is_selected: isSelectedData,
			last_published: lastPublishedTimeData,

			published_count: publishedCountData,

			published_draft: publishedDraftsDataData,
			user_image: userImageUrlData,

			user_introduction: userIntroductionData,
			password: passWordData,
			user_name: userNameData
		};

		return backUpDataObject;
	}
});
