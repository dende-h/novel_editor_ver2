import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
	key: "recoil-seenNoticeId",
	storage: typeof window === "undefined" ? undefined : localStorage
});

//表示済みのお知らせID。currentNoticeIdと一致しない場合のみお知らせダイアログを表示する
//新しいお知らせを出すときはconstant.tsのcurrentNoticeIdを更新する
export const seenNoticeId = atom({
	key: "seenNoticeId",
	default: "",
	effects_UNSTABLE: [persistAtom]
});
