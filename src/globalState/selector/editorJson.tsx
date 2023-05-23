import { selector } from "recoil";
import { draftJson, draftsJson } from "../atoms/draftJson";
import { editorState } from "./editorState";

export const editorJson = selector({
	key: "editorJson",
	get: ({ get }) => {
		const selectedDraftId: string = get(editorState).id;
		const selectedDraftObject: draftJson = get(draftsJson).filter((item: draftJson) => item.id === selectedDraftId)[0];

		return selectedDraftObject;
	}
});
