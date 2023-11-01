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
import { DraftJson, draftsJson } from "../globalState/atoms/draftJson";
import { Items, memoState } from "../globalState/atoms/memoState";

//タイトルエリアの編集時のカスタムフック
export const useDraft = () => {
	const [draft, setDraft] = useRecoilState<draftObjectArray>(drafts); //下書きのオブジェクトを配列で取得
	const [isSelect, setIsSelect] = useRecoilState(isSelected);
	const [defaultUserName, setUserName] = useRecoilState(userName);
	const { onCopy, setValue, hasCopied } = useClipboard("");
	const [fetchDraftsData, setFetchDraftsData] = useRecoilState(publishedDraftsData);
	const setDraftJson = useSetRecoilState<DraftJson[]>(draftsJson);
	const [memos, setMemos] = useRecoilState<Items[]>(memoState);

	//新規小説の本文用初期データをJson形式で作成。Lexicalのデータ構造に合わせて空のデータを作る関数
	const generateDraftJson = (id: string) => {
		return {
			id: id,
			json: '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'
		};
	};

	//新規小説データを作成する関数
	const createNewDraft = (id: string, createTime: Date): draftObject => {
		return {
			id: id,
			title: "untitled",
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
	};

	//全ての小説の選択状態を示すフラグをfalseに設定する関数
	const deselectAllDrafts = (drafts: draftObject[]): draftObject[] => {
		return drafts.map((item) => ({ ...item, isSelected: false }));
	};
	//小説原稿ごとに付随するメモの初期化データを作成する関数
	const createNewMemo = (id: string) => {
		return {
			id: id,
			memoList: {
				item1: { t: "Click to edit", x: 100, y: 100, c: 0 },
				item2: { t: "Move by drag & drop", x: 200, y: 200, c: 0 }
			}
		};
	};

	//小説の選択状態をすべて解除する関数
	const selectStateReset = async () => {
		setDraft(deselectAllDrafts(draft));
		setIsSelect(false);
	};

	//ノベル追加ボタンで新規の小説を追加する
	//オブジェクト内のisSelectedプロパティにより処理を行う
	//isSelectedプロパティは配列内でtrueは常に一つであり重複しない。重複する場合想定する動作をしないため修正必要
	const onAddNovel = async () => {
		if (isSelect) {
			await selectStateReset();
		}

		//引数ようにidとcreateTimeを作成
		const id = uuidv4();
		const createTime = new Date();

		//本文初期化ようのJsonをセット
		const newDraftJson = generateDraftJson(id);
		setDraftJson((prevItem) => (prevItem ? [...prevItem, newDraftJson] : [newDraftJson]));

		//新しい原稿を配列にセット
		const newDraft = createNewDraft(id, createTime);
		const oldDraft = deselectAllDrafts(draft);
		setDraft([newDraft, ...oldDraft]);

		//取得した投稿済みの小説に付いたいいね数を保存しておくデータに新規小説分を追加
		const setId = {
			id: id,
			good_mark: 0
		};
		setFetchDraftsData([setId, ...fetchDraftsData]);
		setIsSelect(true);

		//各原稿のメモ用初期データを追加
		const newMemos = createNewMemo(id);
		setMemos([...memos, newMemos]);
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
							item1: { t: "Click to edit", x: 100, y: 100, c: 0 },
							item2: { t: "Move by drag & drop", x: 200, y: 200, c: 0 }
						}
					}
				]);
			}
			setIsSelect(true);
		} else {
			if (draft[selectIndex].isSelected) {
				await selectStateReset();
			} else {
				await selectStateReset();
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
								item1: { t: "Click to edit", x: 100, y: 100, c: 0 },
								item2: { t: "Move by drag & drop", x: 200, y: 200, c: 0 }
							}
						}
					]);
				}
				setIsSelect(true);
			}
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

	const setPrefaceAndPostScript = (preface: string, postscript: string) => {
		const newPreface = preface;
		const newPostScript = postscript;

		setDraft(
			draft.map((item) => (item.isSelected ? { ...item, preface: newPreface, postscript: newPostScript } : item))
		);
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
		setPrefaceAndPostScript
	};
};
