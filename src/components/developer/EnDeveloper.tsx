/* eslint-disable react/no-unescaped-entities */
import {
	Container,
	VStack,
	HStack,
	Heading,
	UnorderedList,
	ListItem,
	List,
	ListIcon,
	Text,
	Box
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { MdSettings } from "react-icons/md";
import Seo from "../util/Seo";

export const EnDeveloper = () => {
	return (
		<>
			<Seo
				pageTitle="Developer Information"
				pageDescription="Information about the developer who operates this application"
				pageImg={null}
				pagePath="https://novel-editor-ver2.vercel.app/developer"
				pageImgHeight="600"
				pageImgWidth="1200"
			/>
			<Container maxW="xl" centerContent mt={8}>
				<VStack spacing={8} align="center">
					<HStack>
						<Image src={"/android-chrome-36x36.png"} alt={"logoImage"} width={36} height={36} priority />
						<Heading as="h1" size="lg" fontWeight="bold">
							Developer Profile
						</Heading>
					</HStack>

					<Text fontSize="md" textAlign="center" color="gray.500">
						This is the profile page of the manager who develops and operates this application.
					</Text>
				</VStack>
				<Box mt={8} maxW="2xl" w="full" px={4}>
					<Heading as="h2" size="md" textAlign="left" mb={2} borderBottom={"1px"} borderColor={"gray.400"}>
						◆ Profile of dende-h
					</Heading>
					<UnorderedList>
						<ListItem mb={1}>
							<Text fontWeight={"bold"}>Developer Name</Text>
							<Text>dende-h</Text>
						</ListItem>
						<ListItem mb={1}>
							<Text fontWeight={"bold"}>Writer's pen name</Text>
							<Text>DenDe</Text>
						</ListItem>
						<ListItem mb={1}>
							<Text fontWeight={"bold"}>self-introduction</Text>
							<Text>
								I write novels as a hobby. I usually work as an SE in a company. I developed this app to be an
								easy-to-use novel editor so that writers can concentrate on their writing.
							</Text>
							<Text>
								<Text
									as="a"
									href="https://next-novel-site.vercel.app/"
									color="blue.500"
									borderBottom={"1px"}
									borderColor={"blue.500"}
								>
									Submission Novel Sites
								</Text>
								We are also developing a new website. You can submit your novels to that site from this application.
							</Text>
							<Text>It is not an application for submitting, but for writing a novel.</Text>
							<Text>
								Try writing crisply for now, erasing, adjusting the number of letters to practice keeping it to that
								number, and so on.
							</Text>
							<Text>We will do our best to support everyone's creative activities.</Text>
							<Link href={"https://twitter.com/dendeiriamaka1"} passHref>
								<Text color="blue.500">I'm on Twitter.</Text>
							</Link>
						</ListItem>
						<ListItem mb={1}>
							<Text fontWeight={"bold"}>inquiry</Text>
							<Link href="/contact" passHref>
								<Text color="blue.500">contact form</Text>
							</Link>
						</ListItem>
					</UnorderedList>
					<Heading as="h2" size="md" textAlign="left" mt={8} mb={2} borderBottom={"1px"} borderColor={"gray.400"}>
						◆ Site Updates
					</Heading>
					<Box pb={6}>
						<List>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/08/09</Text>
								</HStack>
								<Text>Resolved bugs in the translation memo function and added supported languages</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/08/04</Text>
								</HStack>
								<Text>Corrected button spacing and replaced menu items, moved Pomodoro timer button</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/07/27</Text>
								</HStack>
								<Text>Dual language support for the site</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/07/13</Text>
								</HStack>
								<Text>Policy revisions and addition of developer introduction page</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/07/07</Text>
								</HStack>
								<Text>Added automatic calibration tool functionality</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/07/05</Text>
								</HStack>
								<Text>Added e-book format output function</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/06/27</Text>
								</HStack>
								<Text>Added word translation function and prewritten and postwritten forms</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/06/10</Text>
								</HStack>
								<Text>Added preview button for each manuscript</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/06/10</Text>
								</HStack>
								<Text>Added preview button for each manuscript</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/06/10</Text>
								</HStack>
								<Text>Added preview button for each manuscript</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/06/07</Text>
								</HStack>
								<Text>Operation description added</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/06/05</Text>
								</HStack>
								<Text>Added the ability to leave sticky note-type notes for each manuscript</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/05/29</Text>
								</HStack>
								<Text>Fixed a bug that caused the system to be in a constant loading state.</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/05/26</Text>
								</HStack>
								<Text>Fixed a bug that the body text was not displayed when first displayed, and fixed a policy.</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/05/25</Text>
								</HStack>
								<Text>Improved Editor operability, Ver. 2 release, added backup function</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/05/09</Text>
								</HStack>
								<Text>Layout adjustments and other minor bug fixes</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/04/23</Text>
								</HStack>
								<Text>How to use page added, footer header link corrected</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/04/20</Text>
								</HStack>
								<Text>Fixed a bug that caused data to be lost when reloading.</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/04/17</Text>
								</HStack>
								<Text>Privacy Policy added</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/04/14</Text>
								</HStack>
								<Text>Pomodoro timer function implemented, Google Analytics introduced, favicon changed</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/03/29</Text>
								</HStack>
								<Text>Added upload function to database</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/03/24</Text>
								</HStack>
								<Text>Support for special notation for adding furigana</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/03/15</Text>
								</HStack>
								<Text>
									Added bookshelf layout, implemented tag search function, added copy button, and made other minor
									changes
								</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/03/09</Text>
								</HStack>
								<Text>Menu button modified, user page implemented, dark mode implemented, responsive support</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/02/28</Text>
								</HStack>
								<Text>Contact form implementation</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/02/27</Text>
								</HStack>
								<Text>App Release</Text>
							</ListItem>
						</List>
					</Box>
				</Box>
			</Container>
		</>
	);
};
