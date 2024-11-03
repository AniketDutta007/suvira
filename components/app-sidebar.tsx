"use client";

import * as React from "react";
import {
	BookAIcon,
	BriefcaseBusiness,
	ChevronRight,
	GalleryVerticalEnd,
	MailQuestionIcon,
	MessageSquareQuoteIcon,
	NotebookPenIcon,
	PlusIcon,
	StickyNoteIcon,
	UserRoundIcon,
} from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import { useSession } from "next-auth/react";
import Link from "next/link";

const teams: {
	name: string;
	logo: React.ComponentType;
	plan: string;
}[] = [
	{
		name: "Suvira Energy",
		logo: GalleryVerticalEnd,
		plan: "Enterprise",
	},
];

const menu = [
	{
		title: "Blogs",
		url: "/dashboard/blogs",
		icon: NotebookPenIcon,
	},
	{
		title: "Clients",
		url: "/dashboard/clients",
		icon: UserRoundIcon,
	},
	{
		title: "Feedback",
		url: "/dashboard/feedbacks",
		icon: MessageSquareQuoteIcon,
	},
	{
		title: "Job",
		icon: BriefcaseBusiness,
		items: [
			{
				title: "New Post Entry",
				url: "/dashboard/job/post/entry",
				icon: PlusIcon,
			},
			{
				title: "Posts",
				url: "/dashboard/job/posts",
				icon: StickyNoteIcon,
			},
			{
				title: "Responses",
				url: "/dashboard/job/responses",
				icon: BookAIcon,
			},
		],
	},
	{
		title: "Queries",
		url: "/dashboard/queries",
		icon: MailQuestionIcon,
	},
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { data: session } = useSession();

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={teams} />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Dashboard</SidebarGroupLabel>
					<SidebarMenu>
						{menu.map((item) =>
							item?.url ? (
								<SidebarMenuButton
									key={item.title}
									tooltip={item.title}
								>
									<Link
										href={item.url}
										className="flex items-center gap-2"
									>
										{item.icon && (
											<item.icon
												style={{
													width: "15px",
													height: "15px",
												}}
											/>
										)}
										<span>{item.title}</span>
									</Link>
								</SidebarMenuButton>
							) : (
								<Collapsible
									key={item.title}
									asChild
									defaultOpen
									className="group/collapsible"
								>
									<SidebarMenuItem>
										<CollapsibleTrigger asChild>
											<SidebarMenuButton
												tooltip={item.title}
											>
												{item.icon && <item.icon />}
												<span>{item.title}</span>
												<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
											</SidebarMenuButton>
										</CollapsibleTrigger>
										<CollapsibleContent>
											<SidebarMenuSub>
												{item.items?.map((subItem) => (
													<SidebarMenuSubItem
														key={subItem.title}
													>
														<SidebarMenuSubButton
															asChild
														>
															<Link
																href={
																	subItem.url
																}
															>
																{subItem.icon && (
																	<subItem.icon
																		style={{
																			width: "15px",
																			height: "15px",
																		}}
																	/>
																)}
																<span>
																	{
																		subItem.title
																	}
																</span>
															</Link>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
												))}
											</SidebarMenuSub>
										</CollapsibleContent>
									</SidebarMenuItem>
								</Collapsible>
							)
						)}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				{session?.user && (
					<NavUser
						user={{
							name: session.user.name ?? "",
							email: session.user.email ?? "",
							avatar: session.user.image ?? "",
						}}
					/>
				)}
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
