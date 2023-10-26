/* eslint-disable @next/next/no-sync-scripts */
import { useForm, useFieldArray } from "react-hook-form";
import { useRecoilValue } from "recoil";
import {
	Box,
	VStack,
	Heading,
	FormControl,
	FormLabel,
	Input,
	Button,
	Select,
	Spacer,
	Flex,
	FormErrorMessage,
	Center,
	Spinner
} from "@chakra-ui/react";
import { draftObjectArray, drafts } from "../globalState/atoms/drafts";
import { userName } from "../globalState/atoms/userName";
import { useTextToHTML } from "../hooks/useTextToHTML";
import { InfoForEpubGen } from "../components/epub/InfoForEpubGen";
// import { useEffect, useState } from "react";
import Seo from "../components/util/Seo";
import { useLocale } from "../hooks/useLocale";
import { useState } from "react";

// import { supabase } from "../../lib/supabaseClient";

type FormValues = {
	title: string;
	publisher: string;
	chapters: { title: string }[];
};

function EpubForm() {
	const { t } = useLocale();

	const { textToHtml } = useTextToHTML(); //テキストをHTML化するためのcustomフック
	const [isLoading, setIsLoading] = useState<boolean>(false);
	// const joJsurl = supabase.storage.from("epub").getPublicUrl(`/bibi/and/jo.js`);
	// const book = supabase.storage.from("epub").getPublicUrl("/bibi-bookshelf/yashiro.epub");
	// const bibiUrl = supabase.storage.from("epub").getPublicUrl(`/bibi/index.html`);
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		getValues
	} = useForm<FormValues>({
		defaultValues: {
			chapters: [{ title: "" }]
		},
		mode: "onChange"
	});
	const { fields, append, remove } = useFieldArray({
		control,
		name: "chapters"
	});

	const draftsData = useRecoilValue<draftObjectArray>(drafts);
	const author = useRecoilValue<string>(userName);

	const onSubmit = handleSubmit(async (data) => {
		setIsLoading(true);

		if (data.chapters.length === 0) {
			alert(t.epubgen.addAtleastOneChapter);
			setIsLoading(false);
			return;
		}

		let epub;

		//ライブラリimportをクライアントサイドで行う
		if (typeof window !== "undefined") {
			await import("epub-gen-memory/bundle").then((module) => {
				epub = module.default;
			});
		}
		const imgURL = draftsData.find((draft) => draft.id === data.chapters[0].title).imageUrl;
		//チャプターとして選択された小説のタイトルと本文をライブラリで使用する配列オブジェクト化
		const chapters = data.chapters.map((chapter) => {
			const foundDraft = draftsData.find((draft) => draft.id === chapter.title); //chaoter.titleには小説のIdが格納
			return {
				title: foundDraft.title,
				content: textToHtml(foundDraft.body, imgURL, foundDraft.title)
			};
		});

		//必要データをoptionsにまとめる
		const options = {
			title: data.title,
			author: author,
			cover: imgURL,
			publisher: data.publisher,
			tocTitle: t.epubgen.toc,
			version: 3,
			verbose: false,
			lang: t.epubgen.ja,
			css: `
    @font-face {
      font-family: 'Noto Serif JP';
      src: url('./fonts/NotoSerifJP-SemiBold.otf') format('opentype');
    }
    body {
      font-family: 'Noto Serif JP', serif;
    }
  `,
			fonts: [
				{
					filename: "NotoSerifJP-SemiBold.otf",
					url: "https://enjzxtbbcyrptkkutovq.supabase.co/storage/v1/object/public/Fonts/NotoSerifJP-SemiBold.otf"
				}
			]
		};

		try {
			//ライブラリ実行
			const epubBlob: Blob = await epub(options, chapters);
			//実行したものをURL化
			//疑似aタグを生成してクリック関数で実行
			//実行後削除
			const url = URL.createObjectURL(epubBlob);
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", `${data.title}.epub`);
			document.body.appendChild(link);
			link.click();
			link.remove();
		} catch (error) {
			console.error("Failed to generate ebook", error);
			//処理が失敗したときのお知らせ
			alert(`Failed to generate ebook: ${error.message}`);
		}
		setIsLoading(false);
	});

	// useEffect(() => {
	// 	// ページがクライアントサイドでレンダリングされた後に実行されるコード
	// 	const scriptElement = document.createElement("script");
	// 	scriptElement.src = joJsurl.data.publicUrl;
	// 	document.body.appendChild(scriptElement);

	// 	return () => {
	// 		// コンポーネントがアンマウントされる際にスクリプトを削除
	// 		document.body.removeChild(scriptElement);
	// 	};
	// }, []);

	return (
		<>
			<Seo
				pageTitle={t.epubgen.ebookFileGeneration}
				pageDescription={t.epubgen.manuscriptToEpub}
				pagePath="https://novel-editor-ver2.vercel.app/epubgen"
				pageImg={null}
				pageImgWidth="1200"
				pageImgHeight="630"
			/>
			<Box p="4" w="100%" h={"90vh"} overflowY="scroll">
				<VStack spacing="6">
					<Heading as="h1" size="xl">
						{t.epubgen.generateEpub}
					</Heading>
					<InfoForEpubGen />
					<form onSubmit={onSubmit}>
						<VStack align="stretch" spacing="4" w={{ base: "320px", md: "400px", lg: "550px" }}>
							{isLoading ? (
								<Center>
									<Spinner />
								</Center>
							) : (
								<>
									<FormControl isInvalid={!!errors.title}>
										<FormLabel htmlFor="title" fontSize={{ base: "md", md: "lg" }}>
											{t.epubgen.titleRequired}
										</FormLabel>
										<Input
											id="title"
											{...register("title", { required: t.epubgen.titleIsRequired })}
											size="lg"
											variant="filled"
											shadow="md"
											_hover={{ shadow: "lg" }}
											_focus={{ outline: "none", shadow: "lg" }}
										/>
										<FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
									</FormControl>
									<FormControl>
										<FormLabel htmlFor="publisher" fontSize={{ base: "md", md: "lg" }}>
											{t.epubgen.publisherOptional}
										</FormLabel>
										<Input
											id="publisher"
											{...register("publisher")}
											size="lg"
											variant="filled"
											shadow="md"
											_hover={{ shadow: "lg" }}
											_focus={{ outline: "none", shadow: "lg" }}
										/>
									</FormControl>
									{fields.map((field, index) => (
										<FormControl
											key={field.id}
											isInvalid={!!(errors.chapters && errors.chapters[index] && errors.chapters[index].title)}
										>
											<Flex align="center">
												<FormLabel htmlFor={`chapters[${index}].title`} fontSize={{ base: "md", md: "lg" }}>
													{t.epubgen.chapter}
													{index + 1}
												</FormLabel>
												<Spacer />
												<Button size={"xs"} colorScheme="red" onClick={() => remove(index)}>
													{t.epubgen.delete}
												</Button>
											</Flex>
											<Select
												{...register(`chapters.${index}.title`, { required: t.epubgen.chapterTitleIsRequired })}
												id={`chapters[${index}].title`}
												size="lg"
												variant="filled"
												shadow="md"
												_hover={{ shadow: "lg" }}
												_focus={{ outline: "none", shadow: "lg" }}
											>
												{draftsData.map((draft, draftIndex) => (
													<option key={draftIndex} value={draft.id}>
														{draft.title}
													</option>
												))}
											</Select>

											<FormErrorMessage>
												{errors.chapters &&
													errors.chapters[index] &&
													errors.chapters[index].title &&
													errors.chapters[index].title.message}
											</FormErrorMessage>
										</FormControl>
									))}
								</>
							)}
							<Button
								onClick={() => append({ title: "" })}
								w={{ base: "100%", lg: "auto" }}
								alignSelf={{ base: "center", lg: "flex-end" }}
								colorScheme="facebook"
								isDisabled={isLoading}
								isLoading={isLoading}
							>
								{t.epubgen.addChapter}
							</Button>
							<Button
								type="submit"
								size="lg"
								colorScheme={"teal"}
								w={{ base: "100%", lg: "auto" }}
								alignSelf={{ base: "center", lg: "flex-end" }}
								disabled={Object.keys(errors).length > 0 || getValues("chapters").every((chapter) => !chapter.title)}
								isDisabled={isLoading}
								isLoading={isLoading}
							>
								{t.epubgen.generate}
							</Button>
						</VStack>
					</form>
					<Button
						colorScheme={"teal"}
						onClick={() => window.open("/bibi/index.html", "_blank", "width=800,height=600")}
					>
						{t.epubgen.bibi}
					</Button>
				</VStack>
				{/* <Box>
					<Text
						as={"a"}
						href={`/bibi/index.html?book=${book.data.publicUrl}`}
						data-bibi="embed"
						data-bibi-style="width: 100%; height: 400px;"
					>
						本の名前
					</Text>
				</Box> */}
			</Box>
		</>
	);
}
export const getStaticProps = async () => {
	return {
		props: {
			data: "This is static data"
		}
	};
};
export default EpubForm;
