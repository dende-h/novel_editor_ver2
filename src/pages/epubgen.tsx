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
	Textarea
} from "@chakra-ui/react";
import { draftObjectArray, drafts } from "../globalState/atoms/drafts";
import { userName } from "../globalState/atoms/userName";
import { useTextToHTML } from "../hooks/useTextToHTML";
import { InfoForEpubGen } from "../components/epub/InfoForEpubGen";

type FormValues = {
	title: string;
	publisher: string;
	description: string;
	chapters: { title: string }[];
};

export default function EpubForm() {
	const { textToHtml } = useTextToHTML();

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
	const auther = useRecoilValue<string>(userName);

	const onSubmit = handleSubmit(async (data) => {
		if (data.chapters.length === 0) {
			alert("最低一つ以上の章を追加してください");
			return;
		}

		let epub;

		if (typeof window !== "undefined") {
			await import("epub-gen-memory/bundle").then((module) => {
				epub = module.default;
			});
		}

		const chapters = data.chapters.map((chapter) => {
			const foundDraft = draftsData.find((draft) => draft.id === chapter.title);
			return {
				title: foundDraft.title,
				content: textToHtml(foundDraft.body)
			};
		});

		const imgURL = draftsData.find((draft) => draft.id === data.chapters[0].title).imageUrl;

		const options = {
			title: data.title,
			author: auther,
			cover: imgURL,
			publisher: data.publisher,
			description: data.description,
			tocTitle: "目次",
			version: 3,
			verbose: false,
			lang: "ja",
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
			const epubBlob: Blob = await epub(options, chapters);

			const url = URL.createObjectURL(epubBlob);
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", `${data.title}.epub`);
			document.body.appendChild(link);
			link.click();
			link.remove();
		} catch (error) {
			console.error("Failed to generate ebook", error);
			alert(`Failed to generate ebook: ${error.message}`);
		}
	});
	return (
		<Box p="4" w="100%" h={"90vh"} overflowY="scroll">
			<VStack spacing="6">
				<Heading as="h1" size="xl">
					EPUB生成
				</Heading>
				<InfoForEpubGen />
				<form onSubmit={onSubmit}>
					<VStack align="stretch" spacing="4" w={{ base: "320px", md: "400px", lg: "550px" }}>
						<FormControl isInvalid={!!errors.title}>
							<FormLabel htmlFor="title" fontSize={{ base: "md", md: "lg" }}>
								タイトル(必須)
							</FormLabel>
							<Input
								id="title"
								{...register("title", { required: "タイトルは必須項目です" })}
								size="lg"
								variant="filled"
								shadow="md"
								_hover={{ shadow: "lg" }}
								_focus={{ outline: "none", shadow: "lg" }}
							/>
							<FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
						</FormControl>
						<FormControl isInvalid={!!errors.title}>
							<FormLabel htmlFor="description" fontSize={{ base: "md", md: "lg" }}>
								本の説明やあらすじ(任意)
							</FormLabel>
							<Textarea
								id="description"
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
								出版社（任意）
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
										チャプター{index + 1}
									</FormLabel>
									<Spacer />
									<Button size={"xs"} colorScheme="red" onClick={() => remove(index)}>
										削除
									</Button>
								</Flex>
								<Select
									{...register(`chapters.${index}.title`, { required: "章のタイトルは必須項目です" })}
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
						<Button
							onClick={() => append({ title: "" })}
							w={{ base: "100%", lg: "auto" }}
							alignSelf={{ base: "center", lg: "flex-end" }}
							colorScheme="facebook"
						>
							章を追加
						</Button>
						<Button
							type="submit"
							size="lg"
							colorScheme={"teal"}
							w={{ base: "100%", lg: "auto" }}
							alignSelf={{ base: "center", lg: "flex-end" }}
							disabled={Object.keys(errors).length > 0 || getValues("chapters").every((chapter) => !chapter.title)}
						>
							生成
						</Button>
					</VStack>
				</form>
			</VStack>
		</Box>
	);
}
