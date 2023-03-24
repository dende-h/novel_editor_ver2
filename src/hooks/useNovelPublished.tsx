import { supabase } from "../../lib/supabaseClient";
import { format } from "date-fns";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isPublishedState } from "../globalState/atoms/isPublishedState";
import { lastPublishedTime } from "../globalState/atoms/lastPublishedTime";

import { userName } from "../globalState/atoms/userName";
import { useToastTemplate } from "./useToastTemplate";
import { publishSettingsCountSelector } from "../globalState/selector/publishSettingsCountSelector";
import { publishedCount } from "../globalState/atoms/publishedCount";

export const useNovelPublished = () => {
	const setTimeStamp = useSetRecoilState<string>(lastPublishedTime);
	const publishSettingsCount = useRecoilValue(publishSettingsCountSelector);
	const setIsPublished = useSetRecoilState(isPublishedState);
	const penName = useRecoilValue(userName);
	const toast = useToastTemplate();
	const setPublishedCount = useSetRecoilState(publishedCount);

	const uploadUserName = async (userName: string) => {
		const { error } = await supabase.from("user").insert({ user_name: userName });
		if (error) {
			error.code === "23505" && toast.praimaryErrorToast("そのペンネームは既に利用されています");
		}
	};

	const deleteUserName = async (userName: string) => {
		await supabase.from("user").delete().eq("user_name", userName);
	};

	const onPublishedNovel = () => {
		if (publishSettingsCount > 0) {
			const buttonPushedTime = new Date();
			setTimeStamp(format(buttonPushedTime, "yyyy/MM/dd-HH:mm"));
			setIsPublished(true);
			setPublishedCount(publishSettingsCount);
			uploadUserName(penName);
		} else {
			setTimeStamp("No novels in public");
			setIsPublished(false);
			setPublishedCount(0);
			deleteUserName(penName);
		}
	};

	return { onPublishedNovel, uploadUserName };
};
