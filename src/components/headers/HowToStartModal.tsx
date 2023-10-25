import {
	Box,
	Button,
	Heading,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	StackDivider,
	useColorModeValue,
	useDisclosure,
	Text
} from "@chakra-ui/react";
import { FC, memo, useEffect } from "react";
import { useRecoilState } from "recoil";
import { isFirstVisit } from "../../globalState/atoms/isFirstVisit";
import { useLocale } from "../../hooks/useLocale";
import Image from "next/image";
import Link from "next/link";

export const HowToStartModal: FC = memo(() => {
	const { t } = useLocale();
	const backgroundColor = useColorModeValue("gray.200", "gray.600");
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isFirst, setIsFirst] = useRecoilState(isFirstVisit);
	useEffect(() => {
		if (typeof window !== "undefined" && isFirst) {
			onOpen();
			setIsFirst(false);
		}
	}, []);

	return (
		<>
			<Button
				colorScheme={"twitter"}
				onClick={onOpen}
				size={{ base: "xs", lg: "sm" }}
				fontSize={{ base: "xs", lg: "sm" }}
				mr={1}
				my={"auto"}
				display={{ base: "none", lg: "block" }}
			>
				How to use
			</Button>
			<Button
				colorScheme={"twitter"}
				onClick={onOpen}
				size={"xs"}
				fontSize={"xs"}
				ml={1}
				my={"auto"}
				display={{ base: "block", lg: "none" }}
			>
				Guide
			</Button>

			<Modal isOpen={isOpen} onClose={onClose} size="2xl">
				<ModalOverlay />
				<ModalContent backgroundColor={backgroundColor} position={"relative"}>
					<ModalCloseButton />
					<ModalHeader>{t.InstallGuide.header}</ModalHeader>
					<ModalBody>
						<Stack divider={<StackDivider />} spacing="2">
							<Box>
								<Text size={"sm"} fontWeight="bold">
									{t.InstallGuide.note}
								</Text>
								<Text size="xs">{t.InstallGuide.noteText1}</Text>
								<Text size="xs">{t.InstallGuide.noteText2}</Text>
								<Text size="xs">{t.InstallGuide.noteText3}</Text>
								<Text size="xs">{t.InstallGuide.noteText4}</Text>
							</Box>
							<Heading size="sm">{t.InstallGuide.head1}</Heading>
							<Box>
								<Heading size="xs">{t.InstallGuide.step1_1}</Heading>
								<Box position="relative" w={{ base: "300px", md: "600px" }} h={{ base: "200px", md: "400px" }}>
									<Image src="/menuButton.png" alt={"How To Install"} fill style={{ objectFit: "contain" }} priority />
								</Box>
							</Box>
							<Box>
								<Heading size="xs">{t.InstallGuide.step1_2}</Heading>
								<Box position="relative" w={{ base: "300px", md: "600px" }} h={{ base: "200px", md: "400px" }}>
									<Image
										src="/installButton.png"
										alt={"How To Install"}
										fill
										style={{ objectFit: "contain" }}
										priority
									/>
								</Box>
							</Box>
							<Box>
								<Heading size="xs">{t.InstallGuide.step1_3}</Heading>
								<Box position="relative" w={{ base: "300px", md: "600px" }} h={{ base: "200px", md: "400px" }}>
									<Image
										src="/installStart.png"
										alt={"How To Install"}
										fill
										style={{ objectFit: "contain" }}
										priority
									/>
								</Box>
							</Box>
							<Heading size="sm">{t.InstallGuide.head2}</Heading>
							<Box>
								<Heading size="xs">{t.InstallGuide.step2_1}</Heading>
								<Box position="relative" w={{ base: "300px", md: "600px" }} h={{ base: "200px", md: "400px" }}>
									<Image src="/appconfig.png" alt={"How To Install"} fill style={{ objectFit: "contain" }} priority />
								</Box>
							</Box>
							<Box>
								<Heading size="xs">{t.InstallGuide.step2_2}</Heading>
								<Box position="relative" w={{ base: "300px", md: "600px" }} h={{ base: "200px", md: "400px" }}>
									<Image src="/saitedata.png" alt={"How To Install"} fill style={{ objectFit: "contain" }} priority />
								</Box>
							</Box>
							<Box>
								<Heading size="xs">{t.InstallGuide.step2_3}</Heading>
								<Box position="relative" w={{ base: "300px", md: "600px" }} h={{ base: "200px", md: "400px" }}>
									<Image src="/manageData.png" alt={"How To Install"} fill style={{ objectFit: "contain" }} priority />
								</Box>
							</Box>
							<Box>
								<Heading size="xs">{t.InstallGuide.step2_4}</Heading>
								<Text size="xs">{t.InstallGuide.step2_4Text}</Text>
								<Box position="relative" w={{ base: "300px", md: "600px" }} h={{ base: "200px", md: "400px" }}>
									<Image src="/arrowSave.png" alt={"How To Install"} fill style={{ objectFit: "contain" }} priority />
								</Box>
							</Box>
							<Heading size="sm">{t.InstallGuide.head3}</Heading>
							<Box>
								<Heading size="xs">{t.InstallGuide.step3_1}</Heading>
								<Box position="relative" w={{ base: "300px", md: "600px" }} h={{ base: "200px", md: "400px" }}>
									<Image src="/uninstall.png" alt={"How To Install"} fill style={{ objectFit: "contain" }} priority />
								</Box>
							</Box>
							<Link
								href={
									"https://perpetual-hemisphere-7a3.notion.site/How-to-use-Write-Novel-Now-a746fd05c74a42cda7bd15fb2886b580"
								}
								passHref
								target="_blank"
								rel="noopener noreferrer"
							>
								<Text _hover={{ color: "blue.500" }}>{t.InstallGuide.link}</Text>
							</Link>

							<Text>{t.InstallGuide.footer}</Text>
						</Stack>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme={"teal"} onClick={onClose}>
							{t.InstallGuide.close}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
});
HowToStartModal.displayName = "HowToStartModal";
