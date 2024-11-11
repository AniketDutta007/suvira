import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "@/components/ui/tooltip";
import { StatusFilterCriteria as FilterCriteria } from "@/constants";
import { cn } from "@/lib/utils";

export default function StatusFilterSwitch({
	filter,
	setFilter,
}: {
	filter: FilterCriteria;
	setFilter: (filter: FilterCriteria) => void;
}) {
	function toggleFilter() {
		// if ALL change it to ACTIVE, if ACTIVE change it to INACTIVE, if INACTIVE change it to ALL
		setFilter(
			filter === FilterCriteria.All
				? FilterCriteria.Active
				: filter === FilterCriteria.Active
				? FilterCriteria.Inactive
				: FilterCriteria.All
		);
	}
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<div
					className={cn(
						FilterCriteria.Active == filter
							? "bg-green-500"
							: FilterCriteria.Inactive == filter
							? "bg-red-500"
							: "bg-muted",
						"rounded-md h-5 w-5 flex items-center justify-center cursor-pointer"
					)}
				>
					<div
						className={cn(
							"h-3 w-3 rounded-full",
							FilterCriteria.All == filter
								? "bg-muted"
								: "bg-white"
						)}
						onClick={toggleFilter}
					/>
				</div>
			</TooltipTrigger>
			<TooltipContent>
				<p className="">
					{FilterCriteria.Active == filter
						? "Showing Active"
						: FilterCriteria.Inactive == filter
						? "Showing Inactive"
						: "Showing All"}
				</p>
			</TooltipContent>
		</Tooltip>
	);
}
