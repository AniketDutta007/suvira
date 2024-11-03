"use client";
import { Fragment } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import URL_MAPPING from "@/url_header_mapping";
import { usePathname } from "next/navigation";

export default function Sidebar({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pathname = usePathname();
	const pathSegments = pathname.split("/").filter(Boolean); // Split and filter empty segments
	const breadcrumbData: {
		title: string;
		href: string;
	}[] = [];

	pathSegments.reduce((accumulatedPath, segment) => {
		const currentPath = `${accumulatedPath}/${segment}`;

		// Find the title for the currentPath from urlMapping
		const matchingKey = Object.keys(URL_MAPPING).find((key) =>
			new RegExp(key).test(currentPath)
		);
		// If no matching key is found, return the current path
		if (!matchingKey) return currentPath;
		const title = matchingKey ? URL_MAPPING[matchingKey] : segment;

		// Push title and href to breadcrumb data
		breadcrumbData.push({ title, href: currentPath });

		return currentPath; // Update accumulatedPath for next iteration
	}, "");

	return (
		<SidebarProvider className="flex">
			<AppSidebar />
			<SidebarInset className="max-h-screen overflow-hidden">
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator
							orientation="vertical"
							className="mr-2 h-4"
						/>
						<Breadcrumb>
							<BreadcrumbList>
								{breadcrumbData.map((item, index) => (
									<Fragment key={item.href}>
										<BreadcrumbItem
											className={
												index <
												breadcrumbData.length - 1
													? "hidden md:block"
													: ""
											}
										>
											<BreadcrumbLink href={item.href}>
												{item.title}
											</BreadcrumbLink>
										</BreadcrumbItem>
										{index < breadcrumbData.length - 1 && (
											<BreadcrumbSeparator className="hidden md:block">
												/
											</BreadcrumbSeparator>
										)}
									</Fragment>
								))}
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header>
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
