"use client";
import { $Enums } from "@prisma/client";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	BookmarkCheckIcon,
	BookmarkXIcon,
	ClockIcon,
	EyeIcon,
	TrashIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import moment from "moment";
import { Query } from "@/types";

export default function QueryCard({
	query,
	toggleStatus,
	removeQuery,
	openQueryDialog,
}: {
	query: Query;
	toggleStatus: (queryId: string) => void;
	removeQuery: (queryId: string) => void;
	openQueryDialog: (queryId: string) => void;
}) {
	return (
		<div
			className="flex-[0_0_100%] max-w-[100%] sm:flex-[0_0_48%] sm:max-w-[48%] lg:flex-[0_0_32%] lg:max-w-[32%] p-2"
			key={query.id}
		>
			<Card className="w-full h-[275px] flex flex-col">
				<CardHeader className="pb-3">
					<CardTitle>
						<div className="flex items-center gap-2">
							<div
								className={cn(
									"h-2 w-2 rounded-full",
									query.status == $Enums.QueryStatus.OPEN
										? "bg-green-600"
										: "bg-red-600"
								)}
							></div>
							<div className="flex-1 overflow-hidden truncate">
								{query.name}
							</div>
							<div className="flex gap-4">
								<EyeIcon
									size={18}
									className="cursor-pointer text-blue-500"
									onClick={() => openQueryDialog(query.id)}
								/>
								<TooltipProvider>
									{query.status == $Enums.QueryStatus.OPEN ? (
										<Tooltip>
											<TooltipTrigger asChild>
												<BookmarkCheckIcon
													size={18}
													className="cursor-pointer text-green-500"
													onClick={() =>
														toggleStatus(query.id)
													}
												/>
											</TooltipTrigger>
											<TooltipContent className="bg-green-500">
												<p>Mark as resolved</p>
											</TooltipContent>
										</Tooltip>
									) : (
										<Tooltip>
											<TooltipTrigger asChild>
												<BookmarkXIcon
													size={18}
													className="cursor-pointer text-red-500"
													onClick={() =>
														toggleStatus(query.id)
													}
												/>
											</TooltipTrigger>
											<TooltipContent className="bg-red-500">
												<p className="text-white">
													Mark as unresolved
												</p>
											</TooltipContent>
										</Tooltip>
									)}
								</TooltipProvider>
								<TrashIcon
									size={18}
									className="text-red-600 cursor-pointer"
									onClick={() => removeQuery(query.id)}
								/>
							</div>
						</div>
					</CardTitle>
					<CardDescription className="flex-1 overflow-hidden truncate flex justify-start items-start gap-2">
						{query.company}
					</CardDescription>
					<div className="h-2 w-full" />
					<Separator className="px-3" />
				</CardHeader>

				<CardContent className="flex-1 overflow-hidden line-clamp-3">
					<p className="overflow-hidden line-clamp-3">
						{query.query}
					</p>
				</CardContent>
				<CardFooter>
					<div className="w-full flex items-center  justify-end gap-2">
						{/* <span className="flex-auto overflow-hidden truncate text-sm text-muted-foreground">
						{query.email}
					</span>
					<span>&middot;</span>
					<span className="flex-auto overflow-hidden truncate text-sm text-muted-foreground">
						{query.phone}
					</span>
					<span>&middot;</span> */}
						<ClockIcon
							size={18}
							className="text-muted-foreground"
						/>
						<span className="overflow-hidden truncate text-sm text-muted-foreground">
							{moment(query.updatedAt).fromNow()}
						</span>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
