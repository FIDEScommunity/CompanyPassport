import type { PropsWithChildren } from "react";

import { Kicker } from "./Kicker";
import { Title } from "./Title";
import { Text } from "./Text";
import { twMerge } from "tailwind-merge";

export type StyleVariant = keyof typeof containerVariants;

type ContainerProps = {
	variant: StyleVariant;
};

const baseStyle = "my-2 sm:my-4 rounded-tl-2xl rounded-br-2xl p-6 sm:p-8";

const containerVariants = {
	primary: "bg-primary-3 text-primary-1",
	secondary: "bg-secondary-3 text-secondary-1",
	accent: "bg-accent-3 text-accent-1",
};

type ContainerType = React.FC<PropsWithChildren<ContainerProps>> & {
	Kicker: React.FC<PropsWithChildren>;
	Title: React.FC<PropsWithChildren>;
	Text: React.FC<PropsWithChildren>;
};

const Container: ContainerType = ({
	children,
	variant = "primary",
}: PropsWithChildren<ContainerProps>) => {
	const containerClasses = twMerge(baseStyle, containerVariants[variant]);

	return <div className={containerClasses}>{children}</div>;
};

Container.Kicker = Kicker;
Container.Title = Title;
Container.Text = Text;

export { Container };
