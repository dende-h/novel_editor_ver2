import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { drafts } from "../globalState/atoms/drafts";
import { draftObjectArray } from "../globalState/atoms/drafts";
import { MutableRefObject, useCallback } from "react";
import { isSelected } from "../globalState/atoms/isSelected";
import { draftObject } from "../globalState/selector/editorState";
import { isEdited } from "../globalState/atoms/isEdited";
import { lastEditedTimeSort } from "../globalState/selector/lastEditedTimeSort";
import { userName } from "../globalState/atoms/userName";
import { useClipboard } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

//タイトルエリアの編集時のカスタムフック
export const useDraft = () => {
	const setDraft = useSetRecoilState<draftObjectArray>(drafts); //下書きのオブジェクトを配列で取得
	const draft = useRecoilValue(lastEditedTimeSort);
	const [isSelect, setIsSelect] = useRecoilState(isSelected);
	const [isEdit, setIsEdit] = useRecoilState(isEdited);
	const [defaultUserName, setUserName] = useRecoilState(userName);
	const { onCopy, setValue, hasCopied } = useClipboard("");

	//オブジェクト内のisSelectedプロパティにより処理を行う
	//isSelectedプロパティは配列内でtrueは常に一つであり重複しない。重複する場合想定する動作をしないため修正必要

	//ノベル追加ボタンで新規の小説を追加する
	const onAddNovel = () => {
		const id = uuidv4();
		const createTime = new Date();
		setDraft(
			draft.map((item) => {
				return { ...item, isSelected: false };
			})
		);
		setIsSelect(false);
		const newDraft: draftObject = {
			id: id,
			title: "",
			body: "",
			userName: defaultUserName,
			isSelected: true,
			maxLength: 3800,
			isPublished: false,
			tag: [],
			lastEditedTime: createTime
		};
		const oldDraft = [...draft].map((item) => {
			return { ...item, isSelected: false };
		});
		setDraft([newDraft, ...oldDraft]);
		setIsSelect(true);
	};

	const selectStateReset = () => {
		if (isEdit) {
			const editTime = new Date();
			setDraft(
				draft.map((item) => {
					return item.isSelected
						? { ...item, isSelected: false, lastEditedTime: editTime }
						: { ...item, isSelected: false };
				})
			);
			setIsSelect(false);
		} else {
			setDraft(
				draft.map((item) => {
					return { ...item, isSelected: false };
				})
			);
			setIsSelect(false);
			setIsEdit(false);
		}
	};

	//下書き一覧をクリックもしくはフォーカスしてエンターキーでセレクトのオンオフ
	const onClickOpenDraft = async (selectIndex: number) => {
		if (isSelect === false) {
			setDraft(
				draft.map((item, index) =>
					selectIndex === index ? { ...item, isSelected: true } : { ...item, isSelected: false }
				)
			);
			setIsEdit(false);
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
		setDraft(draft.map((item) => (item.isSelected ? { ...item, title: newTitle } : item)));
		setIsEdit(true);
	};

	//本文の入力を受け取ってオブジェクトのボディプロパティを更新
	const onChangeTextArea: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		const newBody = e.target.value;
		setValue(newBody); //textコピー用
		setDraft(draft.map((item) => (item.isSelected ? { ...item, body: newBody } : item)));
		setIsEdit(true);
	};

	//draftObjectの削除処理
	const deleteAction = useCallback(() => {
		const newDraft = draft.filter((item) => item.isSelected === false);
		setDraft(newDraft);
		setIsSelect(false);
		setIsEdit(false);
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
		onPublishedChange
	};
};
