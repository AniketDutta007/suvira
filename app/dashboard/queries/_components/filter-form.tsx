import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { QueryFilterCriteria } from "@/types";
import { QueryStatusFilterCriteria as StatusCriteria } from "@/constants";

export default function QueryFilterForm({
	criteria,
	setCriteria,
}: {
	criteria: QueryFilterCriteria;
	setCriteria: (criteria: QueryFilterCriteria) => void;
}) {
	return (
		<div className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="status">Status</Label>
				<Select
					value={criteria.status}
					onValueChange={(status: StatusCriteria) =>
						setCriteria({ ...criteria, status })
					}
				>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Select a Status" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Status</SelectLabel>
							{Object.values(StatusCriteria).map((status) => (
								<SelectItem key={status} value={status}>
									{status}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
