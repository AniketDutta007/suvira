"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

export default function EditPostScreen() {
	const title = "Edit Post";
	const tabs = 2;
	const [loading, setLoading] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(0);
	function handleBack() {
		if (currentPage - 1 < 0) return;
		setCurrentPage((prev) => prev - 1);
	}
	function handleNext() {
		console.log(`currentPage: ${currentPage} tabs: ${tabs}`);

		if (currentPage + 1 >= tabs) return;
		setCurrentPage((prev) => prev + 1);
	}
	async function handleSubmit() {
		setLoading(true);
		setLoading(false);
	}
	function formGeneratorFn(currentPage: number) {
		switch (currentPage) {
			case 0:
				return (
					<>
						<input type="text" placeholder="Title" />
						<input type="text" placeholder="Description" />
						<input type="text" placeholder="Tags" />
						<input type="text" placeholder="Category" />
					</>
				);
			case 1:
				return (
					<>
						<input type="text" placeholder="Content" />
					</>
				);
			default:
				return null;
		}
	}
	return (
		<>
			<div className="w-full flex-1 overflow-y-auto flex flex-col gap-3 p-4 box-border">
				<div className="w-full flex-1 overflow-y-auto rounded-xl bg-muted/50 p-2 md:p-5 box-border flex flex-col gap-2">
					<h1 className="text-2xl font-bold">{title}</h1>
					<div className="w-full flex-1 box-border grid grid-cols-4 gap-4">
						{formGeneratorFn(currentPage)}
					</div>
					<div className="w-full flex-none box-border flex justify-end gap-4">
						{currentPage > 0 && (
							<Button
								variant="default"
								className=""
								onClick={handleBack}
							>
								Back
							</Button>
						)}
						{currentPage < tabs - 1 ? (
							<Button
								variant="default"
								className=""
								onClick={handleNext}
							>
								Next
							</Button>
						) : (
							<Button
								variant="default"
								className=""
								onClick={handleSubmit}
							>
								Submit
							</Button>
						)}
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
