import { twMerge } from "tailwind-merge";
import type { StyleVariant } from "./Container";

const baseStyle = "block italic uppercase mt-4";

const kickerVariants = {
	primary: "text-primary-2",
	secondary: "text-secondary-2",
	accent: "text-accent-2",
};

type KickerProps = {
	variant?: StyleVariant;
	children: React.ReactNode;
};

export function Kicker({ variant, children }: KickerProps) {
	return (
		<span className={twMerge(baseStyle, kickerVariants[variant])}>
			{children}
		</span>
	);
}
