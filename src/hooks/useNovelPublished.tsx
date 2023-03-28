import { supabase } from "../../lib/supabaseClient";
import { format } from "date-fns";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isPublishedState } from "../globalState/atoms/isPublishedState";
import { lastPublishedTime } from "../globalState/atoms/lastPublishedTime";
import { userName } from "../globalState/atoms/userName";
import { useToastTemplate } from "./useToastTemplate";
import { publishSettingsDraftsSelector } from "../globalState/selector/publishSettingsDraftsSelector";
import { publishedCount } from "../globalState/atoms/publishedCount";
import { useState } from "react";
import { userIntroduction } from "../globalState/atoms/userIntroduction";
import { draftData, publishedDraftsData } from "../globalState/atoms/publishedDraftsData";
import { SupabaseClient } from "@supabase/supabase-js";

export const useNovelPublished = () => {
	const setTimeStamp = useSetRecoilState<string>(lastPublishedTime);
	const publishedDrafts = useRecoilValue(publishSettingsDraftsSelector);
	const setIsPublished = useSetRecoilState<boolean>(isPublishedState);
	const penName = useRecoilValue<string>(userName);
	const introduction = useRecoilValue<string>(userIntroduction);
	const toast = useToastTemplate();
	const setPublished = useSetRecoilState<number>(publishedCount);
	const [isLoading, setIsLoading] = useState(false);
	const [fetchDraftsData, setFetchDraftsData] = useRecoilState(publishedDraftsData);

	const fetchPublishedDraftData = async (userName: string) => {
		const { data, error } = await supabase.from("drafts").select("id,good_mark").eq("user_name", userName);

		if (error) {
			toast.praimaryErrorToast("データの取得に失敗しました");
			return Promise.reject(error);
		}

		setFetchDraftsData(data); // 更新が完了するまで待つ

		// ここでfetchDraftsDataの値を確認することができます
		console.log(fetchDraftsData);
	};

	const deleteDrafts = async (userName: string) => {
		const { error } = await supabase.from("drafts").delete().eq("user_name", userName);
		if (error) {
			toast.praimaryErrorToast("更新処理に失敗しました");
			return Promise.reject(error);
		}
	};
	const uploadNovel = async () => {
		const insertItems = publishedDrafts.map((item) => {
			const goodMark = fetchDraftsData.filter((data) => {
				return data.id === item.id;
			})[0].good_mark;
			console.log(goodMark);
			return {
				id: item.id,
				title: item.title,
				body: item.body,
				tag1: item.tag[0],
				tag2: item.tag[1],
				tag3: item.tag[2],
				tag4: item.tag[3],
				user_name: item.userName,
				good_mark: goodMark ? goodMark : 0
			};
		});
		const { error } = await supabase.from("drafts").insert(insertItems);
		if (error) {
			toast.praimaryErrorToast("アップロードに失敗しました");
			console.log(error);
			return Promise.reject(error);
		}
	};

	const uploadUserName = async (userName: string) => {
		const { error } = await supabase.from("user").insert({ user_name: userName, Introduction: introduction });
		if (error) {
			error.code === "23505" && toast.praimaryErrorToast("そのペンネームは既に利用されています");
			return Promise.reject(error);
		}
	};

	const deleteUserName = async (userName: string) => {
		const { error } = await supabase.from("user").delete().eq("user_name", userName);
		if (error) {
			toast.praimaryErrorToast("ユーザー名の更新に失敗しました");
			return Promise.reject(error);
		}
	};

	const onPublishedNovel = async () => {
		setIsLoading(true);
		try {
			await uploadUserName(penName);
			try {
				await uploadNovel();
				const buttonPushedTime = new Date();
				setTimeStamp(format(buttonPushedTime, "yyyy/MM/dd-HH:mm"));
				setIsPublished(true);
				setPublished(publishedDrafts.length);
				setIsLoading(false);
			} catch {
				await deleteUserName(penName);
				setIsLoading(false);
			}
		} catch (error) {
			// エラー処理
			setIsLoading(false);
		}
	};

	const stopPublishedNovel = async () => {
		setIsLoading(true);
		try {
			await fetchPublishedDraftData(penName);
			try {
				await deleteUserName(penName);
				try {
					await deleteDrafts(penName);
					setTimeStamp("No novels in public");
					setIsPublished(false);
					setPublished(0);
					setIsLoading(false);
				} catch {
					await uploadUserName(penName);
					toast.praimaryErrorToast("非公開処理にエラーが発生しました");
					setIsLoading(false);
				}
			} catch {
				toast.praimaryErrorToast("ユーザー名削除にエラー発生しました");
				setIsLoading(false);
			}
		} catch {
			toast.praimaryErrorToast("通信エラーが発生しました");
			setIsLoading(false);
		}
	};

	const updatePublishedNovel = async () => {
		setIsLoading(true);
		if (publishedDrafts.length === 0) {
			try {
				await stopPublishedNovel();
			} catch {
				toast.praimaryErrorToast("停止処理にエラー発生しました");
				setIsLoading(false);
			}
		} else {
			try {
				await deleteDrafts(penName);
				try {
					await uploadNovel();
					const buttonPushedTime = new Date();
					setTimeStamp(format(buttonPushedTime, "yyyy/MM/dd-HH:mm"));
					setPublished(publishedDrafts.length);
					setIsLoading(false);
				} catch {
					toast.praimaryErrorToast("エラーが発生しました。公開を停止します");
					await stopPublishedNovel();
				}
			} catch {
				console.log(0);
				toast.praimaryErrorToast("通信エラーが発生しました");
				setIsLoading(false);
			}
		}
	};

	return { onPublishedNovel, stopPublishedNovel, isLoading, updatePublishedNovel };
};
