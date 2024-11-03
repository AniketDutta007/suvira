"use client";
import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

export default function EntryScreen({
	title,
	children,
	onSubmit,
}: {
	title: string;
	children: ReactNode[];
	onSubmit: () => Promise<void>;
}) {
	const [loading, setLoading] = useState<boolean>(false);
	async function handleSubmit() {
		setLoading(true);
		await onSubmit();
		setLoading(false);
	}
	return (
		<>
			<div className="w-full flex-1 overflow-y-auto flex flex-col gap-3 p-4 box-border">
				<div className="w-full flex-1 overflow-y-auto rounded-xl bg-muted/50 p-2 md:p-5 box-border flex flex-col gap-2">
					<h1 className="text-2xl font-bold">{title}</h1>
					<div className="w-full flex-1 box-border grid grid-cols-4 gap-4">
						{children}
					</div>
					<div className="w-full flex-none box-border flex justify-end">
						<Button
							variant="default"
							className=""
							onClick={handleSubmit}
						>
							Submit
						</Button>
					</div>
				</div>
			</div>
			{loading && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary/50">
					<LoaderCircle className="w-10 h-10 text-primary animate-spin absolute" />
				</div>
			)}
		</>
	);
}
