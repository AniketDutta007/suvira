import Image from "next/image";

export default function Footer() {
	return (
		<footer className="bg-gray-100 px-5 py-4">
			<div className="w-full flex flex-col sm:flex-row justify-evenly items-center gap-3">
				<div className="flex flex-col items-center justify-start gap-2">
					<div className="w-[300px] sm:w-[200px] md:w-[300px] relative">
						<Image
							src="/logo.png"
							alt="Suvira"
							width={450} // Set the original width here (or any representative width)
							height={450} // Set the original height here (or any representative height)
							layout="responsive"
							className="w-[450px] h-auto"
						/>
					</div>
					<div className="flex flex-col items-start justify-start text-sm sm:text-[12px] md:text-md">
						<span className="">
							B-201, Suvira Energy, Satellite Gazebo,
						</span>
						<span className="">
							B. D. Sawant Marg, Andheri East,
						</span>
						<span className="">Mumbai, Maharashtra 400099</span>
					</div>
				</div>
				<div className="grow grid grid-cols-3 md:flex flex-row justify-end items-start gap-[5rem] pt-[50px] md:mpt-0 md:mx-[75px] lg:mx-[150px]">
					<div className="flex-1 md:flex-none flex flex-col items-center sm:items-start justify-start gap-1 md:gap-2">
						<span className="font-bold text-lg md:text-2xl mb-1 md:mb-3">
							Company
						</span>
						<span className="text-sm md:text-md">About Us</span>
						<span className="text-sm md:text-md">Offerings</span>
						<span className="text-sm md:text-md">Career</span>
						<span className="text-sm md:text-md">Blogs</span>
					</div>
					<div className="flex-1 md:flex-none flex flex-col items-center sm:items-start justify-start gap-1 md:gap-2">
						<span className="font-bold text-lg md:text-2xl mb-1 md:mb-3">
							Services
						</span>
						<span className="text-sm md:text-md">
							Web Development
						</span>
						<span className="text-sm md:text-md">
							Mobile Development
						</span>
						<span className="text-sm md:text-md">UI/UX Design</span>
					</div>
					<div className="flex-1 md:flex-none flex flex-col items-center sm:items-start justify-start gap-1 md:gap-2">
						<span className="font-bold text-lg md:text-2xl mb-1 md:mb-3">
							Resources
						</span>
						<span className="text-sm md:text-md">Blog</span>
					</div>
				</div>
			</div>
			<div className="container mx-auto pt-[45px] md:pt-[50px] pb-[25px]">
				<div className="flex justify-center items-center gap-3 font-bold">
					<div>
						<p>&copy; 2021 All rights reserved.</p>
					</div>
					<div>
						<p>Privacy Policy</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
