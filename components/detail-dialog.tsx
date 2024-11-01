import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import React from "react";

export function DetailDialog({
	children,
	title,
	description,
	content,
	footer,
	className,
	isOpen,
	onOpenChange,
}: {
	children?: React.ReactNode;
	title: string;
	description?: string;
	content?: React.ReactNode;
	footer?: string;
	className?: string;
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
}) {
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			{children && <DialogTrigger asChild>{children}</DialogTrigger>}
			<DialogContent className={cn("sm:max-w-[425px]", className)}>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					{description && (
						<DialogDescription>{description}</DialogDescription>
					)}
				</DialogHeader>
				{content && content}
				{footer && <DialogFooter>{footer}</DialogFooter>}
			</DialogContent>
		</Dialog>
	);
}
