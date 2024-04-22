import Image from "next/image";

export function Logo() {
	return (
		<Image height={48} width={48} src="/logo.png" alt="Company passport logo" />
	);
}
