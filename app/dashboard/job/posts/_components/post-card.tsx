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
	CoinsIcon,
	EyeIcon,
	MapPinIcon,
	MapPinOffIcon,
	PenLineIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Post } from "@/types";

export default function PostCard({
	post,
	removePost,
	openPostDialog,
}: {
	post: Post;
	removePost: (postId: string) => void;
	openPostDialog: (postId: string) => void;
}) {
	return (
		<div
			className="flex-[0_0_100%] max-w-[100%] min-[530px]:flex-[0_0_48%] min-[530px]:max-w-[48%] sm:flex-[0_0_32%] sm:max-w-[32%] md:flex-[0_0_48%] md:max-w-[48%] lg:flex-[0_0_32%] lg:max-w-[32%] xl:flex-[0_0_24%] xl:max-w-[24%] p-1"
			key={post.id}
		>
			<Card className="w-full aspect-square flex flex-col">
				<CardHeader className="pb-3">
					<CardTitle>
						<div className="flex items-center gap-2 overflow-hidden truncate">
							<div className="flex-1 flex items-center gap-2 text-sm">
								<div
									className={cn(
										"h-2 w-2 rounded-full",
										post.status == $Enums.Status.ACTIVE
											? "bg-green-600"
											: "bg-red-600"
									)}
								></div>
								{post.type == $Enums.EmploymentType.FULL_TIME &&
									"Full Time"}
								{post.type == $Enums.EmploymentType.PART_TIME &&
									"Part Time"}
								{post.type == $Enums.EmploymentType.CONTRACT &&
									"Contract"}
								{post.type ==
									$Enums.EmploymentType.INTERNSHIP &&
									"Internship"}
							</div>
							<div className="flex gap-4">
								<EyeIcon
									size={18}
									className="cursor-pointer text-blue-500"
									onClick={() => openPostDialog(post.id)}
								/>

								<PenLineIcon
									size={18}
									className="text-white-600 cursor-pointer"
									onClick={() => removePost(post.id)}
								/>
							</div>
						</div>
					</CardTitle>
					<CardDescription className="flex-1 overflow-hidden truncate flex justify-start items-start gap-2">
						{post.mode == $Enums.WorkMode.REMOTE ? (
							<MapPinOffIcon
								size={18}
								className="text-rose-500"
							/>
						) : (
							<MapPinIcon size={18} className="text-sky-500" />
						)}
						{post.mode == $Enums.WorkMode.REMOTE && "Remote"}
						{post.mode == $Enums.WorkMode.ONSITE && post.location}
						{post.mode == $Enums.WorkMode.HYBRID &&
							`${post.location} (Hybrid)`}
					</CardDescription>
					<div className="h-2 w-full" />
				</CardHeader>

				<CardContent className="flex-1 overflow-hidden line-clamp-3">
					<p className="overflow-hidden line-clamp-2 capitalize text-xl font-bold">
						{post.role}
					</p>
				</CardContent>
				<CardFooter>
					<div className="w-full flex items-center  justify-end gap-2">
						<div className="flex-1 flex items-center gap-2">
							<CoinsIcon
								size={18}
								className="text-muted-foreground"
							/>
							<span className="overflow-hidden truncate text-sm text-muted-foreground">
								{post.salary
									? `$${post.salary} / ${post.salaryUnit}`
									: "Negotiable"}
							</span>
						</div>
						<span className="min-w-6 max-w-9 flex items-center justify-center rounded-full bg-amber-500 text-xs text-white-500 py-[1px] px-1 truncate">
							{post.applicationCount}
							{/* 123 */}
						</span>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
