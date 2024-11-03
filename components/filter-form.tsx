"use client";
import { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { FilterIcon, XIcon } from "lucide-react";

export function FilterForm<TFilterCriteria>({
	criteria,
	applyFilterCriteria,
	resetFilterCriteria,
	children,
}: {
	criteria: TFilterCriteria;
	applyFilterCriteria: (criteria: TFilterCriteria) => void;
	resetFilterCriteria: () => void;
	children: ReactNode;
}) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon">
					<FilterIcon size={18} />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Filter</DialogTitle>
					<DialogDescription>
						Fill in the form below to filter the results
					</DialogDescription>
				</DialogHeader>
				{children}
				<DialogFooter>
					<Button
						variant="destructive"
						type="reset"
						onClick={resetFilterCriteria}
					>
						<XIcon size={18} />
						Clear Filters
					</Button>
					<Button
						type="submit"
						onClick={() => applyFilterCriteria(criteria)}
					>
						Apply Filters
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
