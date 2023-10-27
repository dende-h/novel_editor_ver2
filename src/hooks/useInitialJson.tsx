import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { editorJson } from "../globalState/selector/editorJson";

//表示するJsonデータを初期値としてRecoilからセットする
export const useInitialJson = () => {
	const json = useRecoilValue(editorJson);
	const [initialJson, setInitialJson] = useState(json !== null ? json?.json : null);

	useEffect(() => {
		setInitialJson(json !== null ? json?.json : null);
	}, [json]);

	return initialJson;
};
