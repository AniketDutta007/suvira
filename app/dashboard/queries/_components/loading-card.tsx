import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingCard() {
	return (
		<Skeleton className="flex-[0_0_100%] max-w-[100%] md:flex-[0_0_48%] md:max-w-[48%] lg:flex-[0_0_32%] lg:max-w-[32%] p-2 h-[250px] flex flex-col" />
	);
}
