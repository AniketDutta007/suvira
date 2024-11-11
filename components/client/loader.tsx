import { cn } from "@/lib/utils";
import Image from "next/image";
import Logo from "@/public/logo.svg";

export default function Loader({ status }: { status: boolean }) {
	return (
		<div
			className={cn(
				"bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 loader z-[1000] flex items-center justify-center",
				status && "loading"
			)}
		>
			<Image
				src={Logo}
				alt="Suvira"
				className="w-full max-w-[500px] aspect-square pulse-animation"
			/>
		</div>
	);
}
