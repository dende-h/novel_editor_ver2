import { useRecoilState, useSetRecoilState } from "recoil";
import { drafts } from "../globalState/atoms/drafts";
import { draftObjectArray } from "../globalState/atoms/drafts";
import { useCallback } from "react";
import { isSelected } from "../globalState/atoms/isSelected";
import { draftObject } from "../globalState/selector/editorState";
import { userName } from "../globalState/atoms/userName";
import { useClipboard } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { draftData, publishedDraftsData } from "../globalState/atoms/publishedDraftsData";
import { draftsJson } from "../globalState/atoms/draftJson";
import { Items, memoState } from "../globalState/atoms/memoState";

//タイトルエリアの編集時のカスタムフック
export const useDraft = () => {
	const [draft, setDraft] = useRecoilState<draftObjectArray>(drafts); //下書きのオブジェクトを配列で取得
	const [isSelect, setIsSelect] = useRecoilState(isSelected);
	const [defaultUserName, setUserName] = useRecoilState(userName);
	const { onCopy, setValue, hasCopied } = useClipboard("");
	const [fetchDraftsData, setFetchDraftsData] = useRecoilState(publishedDraftsData);
	const setDraftJson = useSetRecoilState(draftsJson);
	const [memos, setMemos] = useRecoilState<Items[]>(memoState);
	//オブジェクト内のisSelectedプロパティにより処理を行う
	//isSelectedプロパティは配列内でtrueは常に一つであり重複しない。重複する場合想定する動作をしないため修正必要

	//ノベル追加ボタンで新規の小説を追加する
	const onAddNovel = () => {
		const id = uuidv4();
		const createTime = new Date();
		setDraftJson((prevItem) => {
			return prevItem === null
				? [
						{
							id: id,
							json: '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'
						}
				  ]
				: [
						...prevItem,
						{
							id: id,
							json: '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'
						}
				  ];
		});
		const setId = {
			id: id,
			good_mark: 0
		};
		const newDraft: draftObject = {
			id: id,
			title: "無題",
			body: "",
			userName: defaultUserName,
			isSelected: true,
			lengthOver: false,
			isImageUpload: false,
			maxLength: 3800,
			isPublished: false,
			tag: [],
			lastEditedTime: createTime,
			imageUrl: "",
			imageName: ""
		};
		const oldDraft = [...draft].map((item) => {
			return { ...item, isSelected: false };
		});
		setDraft([newDraft, ...oldDraft]);
		setFetchDraftsData([setId, ...fetchDraftsData]);
		setIsSelect(true);
		setMemos([
			...memos,
			{
				id: id,
				memoList: {
					item1: { t: "クリックで編集", x: 100, y: 100, c: 0 },
					item2: { t: "ドラッグ＆ドロップで移動", x: 200, y: 200, c: 0 }
				}
			}
		]);
	};

	const selectStateReset = () => {
		setDraft(
			draft.map((item) => {
				return { ...item, isSelected: false };
			})
		);
		setIsSelect(false);
	};

	//下書き一覧をクリックもしくはフォーカスしてエンターキーでセレクトのオンオフ
	const onClickOpenDraft = async (selectIndex: number) => {
		if (isSelect === false) {
			setDraft(
				draft.map((item, index) =>
					selectIndex === index ? { ...item, isSelected: true } : { ...item, isSelected: false }
				)
			);
			const draftId = draft.filter((_, index) => {
				return selectIndex === index;
			})[0].id;
			if (
				memos.findIndex((item) => {
					return item.id === draftId;
				}) === -1
			) {
				setMemos([
					...memos,
					{
						id: draftId,
						memoList: {
							item1: { t: "クリックで編集", x: 100, y: 100, c: 0 },
							item2: { t: "ドラッグ＆ドロップで移動", x: 200, y: 200, c: 0 }
						}
					}
				]);
			}
			setIsSelect(true);
		} else {
			selectStateReset();
		}
	};

	const onEnterKey = (key: string, selectIndex: number) => {
		if (key === "Enter") {
			onClickOpenDraft(selectIndex);
		}
	};

	//タイトル入力エリアからフォーカスが離れた時の処理
	const onBlurFocusTitleInput = () => {
		//関数発火時にタイトル未入力の場合”無題”を挿入
		setDraft(draft.map((item) => (item.isSelected && item.title === "" ? { ...item, title: "無題" } : item)));
	};

	//タイトルの入力を受け取ってオブジェクトのタイトルプロパティを更新
	const onChangeTitleArea: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const newTitle = e.target.value;
		const editTime = new Date();
		setDraft(draft.map((item) => (item.isSelected ? { ...item, title: newTitle, lastEditedTime: editTime } : item)));
	};

	//本文の入力を受け取ってオブジェクトのボディプロパティを更新
	const onChangeTextArea = (text: string) => {
		const newBody = text;
		const editTime = new Date();
		setValue(newBody); //textコピー用
		setDraft(draft.map((item) => (item.isSelected ? { ...item, body: newBody, lastEditedTime: editTime } : item)));
	};

	//draftObjectの削除処理
	const deleteAction = useCallback(() => {
		const newDraft = draft.filter((item) => item.isSelected === false);
		const newFetchDraftsData: draftData = fetchDraftsData.filter((item) => {
			const findId = newDraft.findIndex((draft) => draft.id === item.id);
			return findId !== -1;
		});
		const newMemos: Items[] = memos.filter((item) => {
			const findRemove = newDraft.findIndex((draft) => draft.id === item.id);
			return findRemove !== -1;
		});
		setDraft(newDraft);
		setFetchDraftsData(newFetchDraftsData);
		setIsSelect(false);
		setMemos(newMemos);
	}, []);

	const onSetUserName = useCallback((newUserName: string) => {
		setDraft(draft.map((item) => ({ ...item, userName: newUserName })));
		setUserName(newUserName);
	}, []);

	const onPublishedChange = () => {
		setDraft(
			draft.map((item) =>
				item.isSelected ? (item.isPublished ? { ...item, isPublished: false } : { ...item, isPublished: true }) : item
			)
		);
	};

	const onLengthOver = (lengthOver: boolean) => {
		setDraft(
			draft.map((item) => {
				return item.isSelected
					? lengthOver
						? { ...item, isPublished: false, lengthOver: true }
						: { ...item, lengthOver: false }
					: item;
			})
		);
	};

	const onAddImage = (url: string, name: string) => {
		const editTime = new Date();
		setDraft(
			draft.map((item) =>
				item.isSelected
					? { ...item, isImageUpload: true, imageUrl: url, imageName: name, lastEditedTime: editTime }
					: item
			)
		);
	};

	const onRemoveImage = () => {
		const editTime = new Date();
		setDraft(
			draft.map((item) =>
				item.isSelected
					? { ...item, isImageUpload: false, imageUrl: "", imageName: "", lastEditedTime: editTime }
					: item
			)
		);
	};

	const setPreface = (text: string) => {
		const newPreface = text;

		setDraft(draft.map((item) => (item.isSelected ? { ...item, preface: newPreface } : item)));
	};

	const setPostScript = (text: string) => {
		const newPostScript = text;
		setDraft(draft.map((item) => (item.isSelected ? { ...item, postscript: newPostScript } : item)));
	};

	return {
		deleteAction,
		onChangeTitleArea,
		onBlurFocusTitleInput,
		onChangeTextArea,
		onAddNovel,
		onClickOpenDraft,
		onEnterKey,
		selectStateReset,
		onSetUserName,
		onCopy,
		hasCopied,
		onPublishedChange,
		onLengthOver,
		onRemoveImage,
		onAddImage,
		setPreface,
		setPostScript
	};
};
