/* eslint-disable react/no-unescaped-entities */
import { VStack, Heading, Text } from "@chakra-ui/react";
import Seo from "../util/Seo";

export const EnPolicy = () => {
	return (
		<>
			<Seo
				pageTitle="Privacy Policy"
				pageDescription="This is the privacy policy for this site."
				pageImg={null}
				pagePath="https://next-novel-site.vercel.app/policy"
				pageImgHeight="600"
				pageImgWidth="1200"
			/>
			<VStack maxW="800px" mx="auto" px={4} py={8} spacing={8}>
				<Heading as="h1" size="lg">
					Re:terature's Privacy Policy
				</Heading>
				<VStack align="start" spacing={4}>
					<Text>
						This document describes how we collect, use and protect personal information on our website Re:terature.
					</Text>
					<Text fontWeight="bold">1. advertisements on the Site</Text>
					<Text>
						This website uses a third-party advertising service (Google Adsense).
						<br />
						Such ad-serving companies may use information about access to this site and other sites to display
						advertisements for products and services that match the interests of users. These ad-serving companies may
						use "cookies" (not including your name, address, email address, or phone number) to display advertisements
						for products and services that may be of interest to you.
						<br />
						Also with respect to Google Adsense, for more information on this process and how to prevent such
						information from being used by ad-serving entities,
						<a href="https://policies.google.com/technologies/ads?gl=jp">here</a>for more information.
					</Text>
					<Text fontWeight="bold">2. the access analysis tools used by this site</Text>
					<Text>
						This website uses Google Analytics, an access analysis tool provided by Google.
						<br />
						This Google Analytics uses cookies to collect traffic data.
						<br />
						This traffic data is collected anonymously and does not personally identify you.
						<br />
						This feature can be disabled by disabling cookies, so please check your browser settings.
						<br />
						For more information about this agreement, please contact
						<a href="https://marketingplatform.google.com/about/analytics/terms/jp/">here</a>
						for more information.
					</Text>
					<Text fontWeight="bold">3. information on this site</Text>
					<Text>
						While every effort is made to ensure that the information on this site is as accurate as possible, there may
						be instances in which erroneous information is introduced, or the information may not be up-to-date.
						<br />
						Please note that we may change or delete information without notice when we consider the accuracy of the
						information.
					</Text>
					<Text fontWeight="bold">4. use of collected information</Text>
					<Text>
						Information obtained by this site is used to submit and view novels and thumbnail images.
						<br />
						Pseudonyms will appear in the novels submitted by users. Pen names are used to distinguish your novels from
						those submitted by other users.
						<br />
						This site will not provide users' personal information to any third party.
					</Text>
					<Text fontWeight="bold">5. protection of information</Text>
					<Text>
						This site strictly manages the acquired information and takes necessary measures to prevent unauthorized
						access, leakage, loss, or destruction.
					</Text>
					<Text fontWeight="bold">6. disclaimer</Text>
					<Text>
						We do not guarantee the accuracy, certainty, suitability, or usefulness of the information provided on this
						site. In no event will we be liable for any damages whatsoever resulting from the use of this site.
						<br />
						Please use the information on this site at your own discretion and responsibility.
						<br />
						When you move from this site to other sites by links, banners, etc., we are not responsible for the
						information, services, etc., provided at the new site.
					</Text>
					<Text fontWeight="bold">7. copyright of submitted content</Text>
					<Text>
						The copyright of any content posted on Lit:Bite from this site to the destination of the posting belongs to
						its provider.
						<br />
						Reproduction, duplication, or editing of the contents of this site by third parties other than the provider
						without permission is prohibited.
					</Text>
					<Text fontWeight="bold">8. illegal content</Text>
					<Text>
						If we deem that any of the content on this site is violent, defamatory, sexually explicit, promotes
						misconduct or discrimination, or is otherwise inappropriate, we will take action such as removing the
						content without prior notice.
					</Text>
					<Text fontWeight="bold">9. about the inquiry form</Text>
					<Text>
						When you contact us through the inquiry form on this website, we ask you to register your name, e-mail
						address, and other personal information.
						<br />
						Such personal information will only be used to contact you by e-mail or other means in response to your
						questions, and will not be used for any purpose other than that for which you provided the personal
						information.
					</Text>
					<Text fontWeight="bold">10. about links</Text>
					<Text>
						In principle, this site is link-free. No permission or contact is required to link to this site.
						<br />
						When quoting, please clearly state the source of the quotation and link to the relevant page.
						<br />
						However, please refrain from linking directly to image files, or linking in the form of displaying within an
						HTML page using inline frames.
					</Text>
					<Text fontWeight="bold">11. changes to privacy policy</Text>
					<Text>
						This site may change its privacy policy at any time without prior notice to users.
						<br />
						The revised Privacy Policy will be effective upon posting on this site.
					</Text>
					<Text fontWeight="bold">12. date of last update</Text>
					<Text>This Privacy Policy was last updated on July 13, 2023.</Text>
				</VStack>
			</VStack>
		</>
	);
};
