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

export default function SortSelect<TSortCriteria extends string | string>({
	selectedCriteria,
	onChange,
	criterias,
}: {
	selectedCriteria: TSortCriteria;
	onChange: (criteria: TSortCriteria) => void;
	criterias: TSortCriteria[];
}) {
	return (
		<Select
			value={String(selectedCriteria)}
			onValueChange={(criteria) => onChange(criteria as TSortCriteria)}
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
					{criterias.map((criteria) => (
						<SelectItem key={criteria} value={criteria}>
							{criteria}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
