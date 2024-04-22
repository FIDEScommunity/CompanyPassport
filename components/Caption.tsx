import type { PropsWithChildren } from "react";

export function Caption({ children }: PropsWithChildren) {
	return (
		<span className="block text-center italic text-sm mt-4">{children}</span>
	);
}
