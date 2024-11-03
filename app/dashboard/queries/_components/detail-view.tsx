import { Query } from "@/types";
import { $Enums } from "@prisma/client";
import { ClockIcon, CheckIcon, Mail, Phone } from "lucide-react";
import moment from "moment";

export default function QueryDetailView({ query }: { query: Query }) {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex-1 flex flex-col justify-start items-start">
				<span className="text-xs font-semibold text-muted-foreground">
					Name
				</span>
				<span className="text-md">{query.name}</span>
			</div>
			<div className="flex flex-col justify-start items-start">
				<span className="text-xs font-semibold text-muted-foreground">
					Company
				</span>
				<span className="text-md">{query.company}</span>
			</div>
			<div className="w-full flex flex-col justify-start items-start">
				<div className="w-full flex justify-between items-center gap-3">
					<span className="text-xs font-semibold text-muted-foreground">
						How can we help you?
					</span>
					{query?.status == $Enums.QueryStatus.OPEN ? (
						<ClockIcon size={18} className="text-green-500" />
					) : (
						<CheckIcon size={18} className="text-red-500" />
					)}
				</div>
				<span className="text-md">{query?.query}</span>
			</div>
			<div className="flex flex-col justify-start items-start">
				<span className="text-xs font-semibold text-muted-foreground">
					Date
				</span>
				<span className="text-sm">
					{query?.createdAt &&
						moment(query.createdAt).format("ddd D MMM, YYYY")}
				</span>
			</div>
			<div className="flex justify-start items-center gap-3 text-sm">
				<Mail
					size={18}
					className="cursor-pointer text-blue-500"
					onClick={() => {}}
				/>
				{query?.email}
			</div>
			<div className="flex justify-start items-center gap-3 text-sm">
				<Phone
					size={18}
					className="cursor-pointer text-blue-500"
					onClick={() => {}}
				/>
				{query?.phone}
			</div>
		</div>
	);
}
