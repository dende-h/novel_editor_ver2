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
	FormErrorMessage
} from "@chakra-ui/react";
import { draftObjectArray, drafts } from "../globalState/atoms/drafts";
import { userName } from "../globalState/atoms/userName";

type FormValues = {
	title: string;
	publisher: string;
	chapters: { title: string }[];
};

export default function EpubForm() {
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
				content: foundDraft.body
			};
		});

		const options = {
			title: data.title,
			author: auther,
			publisher: data.publisher,
			tocTitle: "目次",
			version: 3,
			verbose: false
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
		<Box p="6" w="100%" h={"90vh"}>
			<VStack spacing="6">
				<Heading as="h1" size="xl">
					EPUB生成
				</Heading>
				<form onSubmit={onSubmit}>
					<VStack align="stretch" spacing="4" w={{ base: "320px", md: "400px", lg: "550px" }}>
						<FormControl isInvalid={!!errors.title}>
							<FormLabel htmlFor="title" fontSize={{ base: "md", md: "lg" }}>
								タイトル(本の表題になります)
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
