import { Box } from "@chakra-ui/react";
import Seo from "../components/util/Seo";
import TwoColumnTemplate from "../components/templates/TwoColumnTemplate";
import { useLocale } from "../hooks/useLocale";

export default function Profile() {
	const { t } = useLocale();
	return (
		<>
			<Seo
				pageTitle={t.profile.userPage}
				pageDescription={t.profile.pageDescription}
				pagePath="https://novel-editor-ver2.vercel.app/profile"
				pageImg={null}
				pageImgWidth="1200"
				pageImgHeight="630"
			/>
			<Box>
				<TwoColumnTemplate />
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
