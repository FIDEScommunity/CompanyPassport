import { twMerge } from "tailwind-merge";
import type { StyleVariant } from "./Container";

// Custom CSS styles are defined in .globals.css to overwrite markdown
const baseStyle =
	"callout my-2 p-6 sm:p-8 sm:my-8 rounded-tr-2xl rounded-bl-2xl border-b-4 border-accent-2";

const calloutVariants = {
	primary: "bg-primary-1 text-white",
	secondary: "bg-secondary-1 text-white",
	accent: "bg-accent-1 text-white",
};

type CalloutProps = {
	variant: StyleVariant;
	children: React.ReactNode;
};

export function Callout({ variant = "primary", children }: CalloutProps) {
	return (
		<div className={twMerge(baseStyle, calloutVariants[variant])}>
			{children}
		</div>
	);
}
