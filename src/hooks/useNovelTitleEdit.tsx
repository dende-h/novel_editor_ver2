import { useRecoilState, useRecoilValue } from "recoil";
import { selectedFlugArray } from "../globalState/atoms/selectedFlugArray";
import { drafts } from "../globalState/atoms/drafts";
import { draftObjectArray } from "../components/LeftColumns/LeftColumnArea";
import { useState } from "react";

//タイトル編集時のカスタムフック
export const useNovelTitleEdit = () => {
	const selectedFlug = useRecoilValue<boolean[]>(selectedFlugArray); //表示対象のフラグを配列で取得
	const [title, setTitle] = useRecoilState<draftObjectArray>(drafts); //下書きのオブジェクトを配列で取得
	const [conposing, setConposing] = useState<boolean>(false); //onEnterKeyDownの発火処理フラグ
	const [isFocus, setIsFocus] = useState<boolean>(false); //フォーカスのフラグ

	//タイトル編集時エンターが押された場合フォーカスを本文エリアに移動
	const onEnterKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
		//日本語入力時の変換のエンターの場合は処理しない
		if (conposing === false) {
			if (e.key === "Enter") {
				setIsFocus(true); //フォーカスのイベントを発火させるフラグ
			}
		}
	};

	const onBlurFocus = () => {
		const selectedIndex = selectedFlug.indexOf(true);
		//関数発火時にタイトル未入力の場合”無題”を挿入
		setTitle(
			title.map((item, index) => (index === selectedIndex && item.title === "" ? { ...item, title: "無題" } : item))
		);
	};
	//タイトルエリアの入力を受け取ってオブジェクトのタイトルプロパティを更新
	const onChangeTitleArea: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const selectedIndex = selectedFlug.indexOf(true); //現在選択中のオブジェクトのインデックスを取得する
		const newTitle = e.target.value;

		setTitle(title.map((item, index) => (index === selectedIndex ? { ...item, title: newTitle } : item)));
	};
	return { onChangeTitleArea, setConposing, onEnterKeyDown, isFocus, setIsFocus, onBlurFocus };
};
