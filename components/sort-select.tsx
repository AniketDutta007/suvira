import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ArrowDownWideNarrowIcon } from "lucide-react";

type SortSelectProps<E> = {
	selectedCriteria: E[keyof E];
	onChange: (criteria: E[keyof E]) => void;
	criterias: E;
};

export default function SortSelect<E extends Record<string, string | number>>({
	selectedCriteria,
	onChange,
	criterias,
}: SortSelectProps<E>) {
	return (
		<Select
			value={String(selectedCriteria)}
			onValueChange={(criteria) => onChange(criteria as E[keyof E])}
		>
			<SelectTrigger className="w-fit sm:w-[180px] px-5 py-4 ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0 border-none">
				<div className="flex items-center gap-2">
					<ArrowDownWideNarrowIcon size={18} />
					<div className="hidden sm:block">
						<SelectValue
							placeholder="Sort By"
							className="px-3 py-5"
						/>
					</div>
				</div>
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Sort By</SelectLabel>
					{Object.values(criterias).map((value) => (
						<SelectItem key={String(value)} value={String(value)}>
							{String(value)}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
