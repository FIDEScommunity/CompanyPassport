import { twMerge } from "tailwind-merge";
import type { StyleVariant } from "./Container";

const baseStyle = "mt-4 font-bold";

const sizes = {
	normal: "text-xl sm:text-2xl",
	large: "text-3xl sm:text-4xl",
};

const titleVariants = {
	primary: "text-primary-2",
	secondary: "text-secondary-2",
	accent: "text-accent-2",
};

type TitleProps = {
	children: React.ReactNode;
	variant?: StyleVariant;
	light?: boolean;
	size?: keyof typeof sizes;
};

export function Title({
	variant,
	light,
	size = "normal",
	children,
}: TitleProps) {
	return (
		<h1
			className={twMerge(
				baseStyle,
				titleVariants[variant],
				sizes[size],
				light && "text-opacity-50",
			)}
		>
			{children}
		</h1>
	);
}
