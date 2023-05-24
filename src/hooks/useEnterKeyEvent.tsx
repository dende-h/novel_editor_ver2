import { useRef, useState } from "react";

//Inputなどでエンターキーを押した際のカスタムフック
export const useEnterKeyEvent = () => {
	const [conposing, setConposing] = useState<boolean>(false); //onEnterKeyUpの発火処理フラグ
	const focus = useRef<HTMLDivElement>(null); //タイトル入力から本文エリアへのフォーカス移動用

	const focusEvent = () => {
		focus?.current?.focus();
	};

	const onEnterKeySubmitEvent = (e: React.KeyboardEvent<HTMLInputElement>, fireEvent: () => void) => {
		//日本語入力時の変換のエンターの場合は処理しない
		if (conposing === false) {
			if (e.key === "Enter") {
				fireEvent();
				e.stopPropagation();
			}
		}
	};

	//タイトル編集時エンターが押された場合フォーカスを本文エリアに移動
	const onEnterKeyFocusEvent: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
		//日本語入力時の変換のエンターの場合は処理しない
		if (conposing === false) {
			if (e.key === "Enter") {
				focusEvent();
			}
		}
	};

	return { setConposing, onEnterKeyFocusEvent, focus, focusEvent, onEnterKeySubmitEvent };
};
