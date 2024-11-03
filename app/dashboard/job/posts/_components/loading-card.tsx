import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingCard() {
	return (
		<Skeleton className="aspect-square flex-[0_0_100%] max-w-[100%] min-[530px]:flex-[0_0_48%] min-[530px]:max-w-[48%] sm:flex-[0_0_32%] sm:max-w-[32%] md:flex-[0_0_48%] md:max-w-[48%] lg:flex-[0_0_32%] lg:max-w-[32%] xl:flex-[0_0_24%] xl:max-w-[24%] p-1" />
	);
}
