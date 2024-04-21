import type { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
	docsRepositoryBase:
		"https://github.com/DutchBlockchainCoalition/CompanyPassport",
	darkMode: false,
	footer: {},
	feedback: {
		useLink: () =>
			"https://github.com/DutchBlockchainCoalition/CompanyPassport/issues/new",
	},
	sidebar: {
		defaultMenuCollapseLevel: 1,
	},
	editLink: {},
	head: null,
};

export default config;
