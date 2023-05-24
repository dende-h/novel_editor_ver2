import { selector } from "recoil";
import { DraftJson, draftsJson } from "../atoms/draftJson";
import { editorState } from "./editorState";

export const editorJson = selector({
	key: "editorJson",
	get: ({ get }) => {
		const selectedDraftId: string = get(editorState).id;
		const selectedDraftObject: DraftJson = get(draftsJson).filter((item: DraftJson) => item.id === selectedDraftId)[0];

		return selectedDraftObject;
	}
});
