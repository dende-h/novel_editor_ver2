import { EnPolicy } from "../components/policy/EnPolicy";
import { JaPolicy } from "../components/policy/JaPolicy";
import { useLocale } from "../hooks/useLocale";

export default function PrivacyPolicy() {
	const { locale } = useLocale();

	return (
		<>
			{locale === "ja" && <JaPolicy />}
			{locale === "en" && <EnPolicy />}
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
