import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "@/components/ui/tooltip";
import { QueryStatusFilterCriteria as FilterCriteria } from "@/constants";
import { cn } from "@/lib/utils";

export default function QueryStatusFilter({
	filter,
	setFilter,
}: {
	filter: FilterCriteria;
	setFilter: (filter: FilterCriteria) => void;
}) {
	function toggleFilter() {
		// if ALL change it to OPEN, if OPEN change it to CLOSED, if CLOSED change it to ALL
		setFilter(
			filter === FilterCriteria.All
				? FilterCriteria.Open
				: filter === FilterCriteria.Open
				? FilterCriteria.Closed
				: FilterCriteria.All
		);
	}
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<div
					className={cn(
						FilterCriteria.Open == filter
							? "bg-green-500"
							: FilterCriteria.Closed == filter
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
					{FilterCriteria.Open == filter
						? "Showing Open"
						: FilterCriteria.Closed == filter
						? "Showing Closed"
						: "Showing All"}
				</p>
			</TooltipContent>
		</Tooltip>
	);
}
