// Prob needs to be markdown, to allow links and stuff to be rendered nicely

export function Text({ children }: { children: React.ReactNode }) {
	return <p className="text-secondary-1">{children}</p>;
}
