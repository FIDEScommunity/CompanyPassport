import type { DocsThemeConfig } from "nextra-theme-docs";
import { Logo } from "./components/Logo";
import { Footer } from "./components/Footer";
import { useRouter } from "next/router";

const config: DocsThemeConfig = {
	logo: () => <Logo />,
	footer: {
		component: <Footer />,
	},
	docsRepositoryBase:
		"https://github.com/DutchBlockchainCoalition/CompanyPassport",
	darkMode: false,
	feedback: {
		content: null,
	},
	sidebar: {
		defaultMenuCollapseLevel: 1,
	},
	toc: {
		float: false,
	},
	editLink: { component: null },
	head: null,
	primaryHue: 187,
	primarySaturation: 60,
	useNextSeoProps() {
		const { asPath } = useRouter();
		return {
			additionalLinkTags: [{ rel: "icon", href: "/favicon.ico" }],
			titleTemplate:
				asPath !== "/"
					? "%s – Company Passport"
					: "Company Passport | Technical components, requirements and architecture for the Company Passport project",
			additionalMetaTags: [
				{ content: "width=device-width, initial-scale=1.0", name: "viewport" },
				{
					content: "Company Passport",
					name: "apple-mobile-web-app-title",
				},
				{ content: "#fff", name: "msapplication-TileColor" },
			],
			description:
				"This site contains the functional and technical components, requirements and architecture for the Company Passport project. You will need to support these specification in order for your software solution to be compatible with it.",
			openGraph: {
				images: [{ url: "/og.jpeg" }],
				type: "website",
			},
			twitter: {
				cardType: "summary_large_image",
				site: "/",
			},
		};
	},
};

export default config;
