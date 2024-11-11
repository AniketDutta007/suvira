"use client";

import Loader from "@/components/client/loader";
import {
	ChevronsRightIcon,
	HandshakeIcon,
	StarIcon,
	UsersIcon,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Video from "next-video";
import BannerVideo from "/videos/banner_video.mp4";

const clients = [
	{
		name: "Client 1",
		logo: "/facebook.png",
	},
	{
		name: "Client 2",
		logo: "/intel.png",
	},
	{
		name: "Client 3",
		logo: "/amd.png",
	},
	{
		name: "Client 4",
		logo: "/samsung.png",
	},
	{
		name: "Client 5",
		logo: "/uber.png",
	},
	{
		name: "Client 6",
		logo: "/3m.png",
	},
	{
		name: "Client 7",
		logo: "/samsung.png",
	},
	{
		name: "Client 8",
		logo: "/uber.png",
	},
	{
		name: "Client 9",
		logo: "/3m.png",
	},
];

const testimonials = [
	{
		name: "Client 1",
		designation: "Designation",
		testimonial:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas.",
		image: "/facebook.png",
		rating: 3,
	},
	{
		name: "Client 2",
		designation: "Designation",
		testimonial:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas.",
		image: "/3m.png",
		rating: 4,
	},
	{
		name: "Client 3",
		designation: "Designation",
		testimonial:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas.",
		image: "/amd.png",
		rating: 5,
	},
	{
		name: "Client 4",
		designation: "Designation",
		testimonial:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas.",
		image: "/intel.png",
		rating: 3,
	},
	{
		name: "Client 5",
		designation: "Designation",
		testimonial:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas.",
		image: "/test.jpg",
		rating: 4,
	},
	{
		name: "Client 6",
		designation: "Designation",
		testimonial:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas.",
		image: "/test.jpg",
		rating: 5,
	},
	{
		name: "Client 7",
		designation: "Designation",
		testimonial:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas.",
		image: "/test.jpg",
		rating: 3,
	},
	{
		name: "Client 8",
		designation: "Designation",
		testimonial:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas.",
		image: "/test.jpg",
		rating: 4,
	},
];

export default function Home() {
	const [loading, setLoading] = useState<boolean>(true);
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const ref = useRef<HTMLDivElement | null>(null);
	const ref1 = useRef<HTMLDivElement | null>(null);

	const handleScroll = () => {
		const scrollPosition = window.scrollY;
		const scaleFactor = 1 + scrollPosition * 0.001;
		if (videoRef.current) {
			videoRef.current.style.transform = `scale(${Math.min(
				scaleFactor,
				2
			)})`; // Limit zoom to 2x
		}
		if (ref.current) {
			const sectionTop = ref.current.getBoundingClientRect().top;
			const sectionHeight = ref.current.offsetHeight;
			const sectionMid = sectionTop + sectionHeight / 2; // Calculate the midpoint of the section
			const viewportMid = window.innerHeight / 2; // Calculate the midpoint of the viewport

			// Activate the section if its midpoint is near the viewport midpoint
			if (
				sectionMid >= viewportMid - sectionHeight / 4 &&
				sectionMid <= viewportMid + sectionHeight / 4
			) {
				ref.current.classList.add("active");
			} else {
				ref.current.classList.remove("active");
			}
		}
		if (ref1.current) {
			const sectionTop = ref1.current.getBoundingClientRect().top;
			const sectionHeight = ref1.current.offsetHeight;
			const sectionMid = sectionTop + sectionHeight / 2; // Calculate the midpoint of the section
			const viewportMid = window.innerHeight / 2; // Calculate the midpoint of the viewport

			// Activate the section if its midpoint is near the viewport midpoint
			if (
				sectionMid >= viewportMid - sectionHeight / 4 &&
				sectionMid <= viewportMid + sectionHeight / 4
			) {
				ref1.current.classList.add("active");
			} else {
				ref1.current.classList.remove("active");
			}
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		const serviceCards = document.querySelectorAll(".service__card");
		setTimeout(() => {
			setLoading(false);
		}, 2000);
		serviceCards.forEach((card) => {
			card.addEventListener("mouseenter", () => {
				serviceCards.forEach((card) => {
					card.classList.remove("active");
				});
				card.classList.add("active");
			});
		});

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<>
			<Loader status={loading} />
			<main className="w-full">
				<section className="relative w-full h-screen">
					{/* <video
						autoPlay
						muted
						loop
						className="banner-video w-full h-full object-cover"
						ref={videoRef}
					>
						<source src="/banner.mp4" type="video/mp4" />
					</video> */}
					<Video
						src={BannerVideo}
						autoPlay
						muted
						loop
						className="banner-video w-full h-full object-cover"
						ref={videoRef}
					/>
					<div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
				</section>
				{/* <section className="sec-2 relative w-full min-h-screen bg-white grid grid-cols-1 md:grid-cols-2 justify-center md:items-center md:px-[100px] md:py-[80px] transition-all duration-500 gap-5">
				<div className="max-h-[400px] md:max-h-[700px] md:max-w-[400px] h-full w-full relative flex justify-center items-center md:rounded-xl overflow-hidden mx-auto">
					<Image
						src="/sample.jpg"
						alt="Suvira"
						width={450}
						height={450}
						layout="intrinsic"
						className="animate-image w-full object-cover md:rounded-xl"
					/>
				</div>
				<div className="max-h-[500px] h-full w-full md:max-w-[450px] flex flex-col justify-evenly gap-4 p-10 md:p-0 pt-0">
					<h1 className="text-[2.5rem] md:text-[3.2rem] font-bold text-left sm:text-right md:text-left">
						Who are <span className="text-lime-600">WE?</span>
					</h1>
					<p className="text-lg text-gray-500 text-right md:text-left">
						Suvira Energy, headquartered in the dynamic metropolis
						of Mumbai, stands as a pioneering force in the realm of
						technology-driven solutions for the Energy sector in
						India. Renowned for our prowess in cutting-edge Project
						Management, Sales & Marketing, and Services, we
						consistently cater to the diverse needs of our esteemed
						clientele.
					</p>
					<div className="w-full flex justify-around items-center gap-10">
						<div className="flex justify-center items-center gap-2">
							<span className="flex justify-center items-center p-3 rounded-full aspect-square bg-lime-400">
								<Image
									src="/collaboration (1).png"
									alt="partners"
									width={20}
									height={20}
								/>
							</span>
							<div className="flex flex-col items-start justify-start">
								<span className="text-lg font-bold">100+</span>
								<span className="text-sm text-gray-500">
									Partners
								</span>
							</div>
						</div>
						<div className="flex justify-center items-center gap-2">
							<span className="flex justify-center items-center p-3 rounded-full aspect-square bg-orange-400">
								<Image
									src="/service.png"
									alt="clients"
									width={25}
									height={25}
								/>
							</span>
							<div className="flex flex-col items-start justify-start">
								<span className="text-lg font-bold">20+</span>
								<span className="text-sm text-gray-500">
									Partners
								</span>
							</div>
						</div>
					</div>
				</div>
			</section> */}
				<section
					className="sec-2 relative w-full min-h-screen bg-white grid grid-cols-1 md:grid-cols-2 justify-center md:items-center transition-all duration-500 overflow-hidden"
					ref={ref}
				>
					<div className="h-full max-h-[400px] md:max-h-screen w-full relative flex justify-center items-center overflow-hidden mx-auto">
						<Image
							src="/sample.jpg"
							alt="Suvira"
							width={450}
							height={450}
							layout="intrinsic"
							className="animate-image w-full object-cover"
						/>
					</div>
					<div className="h-full w-full p-10 md:p-0 pt-0 flex justify-center items-center">
						<div className="max-h-[500px] h-full max-w-[500px] mx-auto  flex flex-col justify-evenly gap-4">
							<h1 className="animate-text text-[2.25rem] sm:text-[2.5rem] md:text-[3.2rem] font-bold text-left sm:text-right md:text-left">
								Who are{" "}
								<span className="text-lime-600">WE?</span>
							</h1>
							<p className="text-md md:text-lg text-gray-500 text-right md:text-left">
								Suvira Energy, headquartered in the dynamic
								metropolis of Mumbai, stands as a pioneering
								force in the realm of technology-driven
								solutions for the Energy sector in India.
								Renowned for our prowess in cutting-edge Project
								Management, Sales & Marketing, and Services, we
								consistently cater to the diverse needs of our
								esteemed clientele.
							</p>
							<div className="w-full flex justify-around items-center gap-10">
								<div className="flex justify-center items-center gap-2">
									<span className="flex justify-center items-center p-3 rounded-full aspect-square bg-lime-400">
										<HandshakeIcon size={20} />
									</span>
									<div className="flex flex-col items-start justify-start">
										<span className="text-md md:text-lg font-bold">
											100+
										</span>
										<span className="text-xs md:text-sm text-gray-500 font-semibold">
											Partners
										</span>
									</div>
								</div>
								<div className="flex justify-center items-center gap-2">
									<span className="flex justify-center items-center p-3 rounded-full aspect-square bg-orange-400">
										<UsersIcon size={20} />
									</span>
									<div className="flex flex-col items-start justify-start">
										<span className="text-md md:text-lg font-bold">
											20+
										</span>
										<span className="text-xs md:text-sm text-gray-500 font-semibold">
											Clients
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="relative w-full lg:min-h-screen bg-white flex flex-col lg:flex-row justify-around md:items-center transition-all duration-500 p-2 md:p-8">
					<div className="lg:w-[50px] p-4 md:p-0 pt-0 relative">
						<h1 className="lg:absolute lg:-translate-y-1/2 lg:-translate-x-1/4 lg:-rotate-90 text-[2.25rem] sm:text-[2.5rem] md:text-[3.2rem] font-bold max-w-[800px] text-center flex gap-5">
							Our <span className="text-lime-600">Services</span>
						</h1>
					</div>
					<div className="lg:grow h-full w-full p-5 flex flex-col md:flex-row justify-stretch items-center gap-3 max-w-[1000px] aspect-video">
						<div className="service__card h-full w-full relative rounded-xl overflow-hidden duration-500">
							<div
								className="w-full h-full p-4 flex justify-center items-center bg-cover bg-center z-10 aspect-[3/4] relative"
								style={{
									background: "url('/oil-refinery.jpg')",
								}}
							>
								<div className="label absolute bottom-0 left-0 ml-4 mb-4 md:ml-8 md:mb-6 px-3 text-lime-400 font-extrabold tracking-wide bg-slate-900/50">
									Service 1
								</div>
							</div>
							<div className="absolute top-0 left-0 w-1/2 h-full bg-blue-400 -z-10 aspect-[3/4] flex flex-col gap-5 items-start justify-start p-8">
								<h1 className="border-l-4 border-lime-400 px-4 md:text-lg lg:text-xl font-bold text-white tracking-wider">
									Service 1
								</h1>
								<p className="tracking-wide md:text-sm">
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Modi, quibusdam, amet
									corrupti eos voluptates enim quo
									dignissimos, debitis ad iusto quisquam eius
									neque dolores quod a animi deleniti
									voluptatum quaerat!
								</p>
								<p className="tracking-wide md:text-sm">
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Modi, quibusdam, amet
									corrupti eos voluptates enim quo
									dignissimos, debitis ad iusto quisquam eius
									neque dolores quod a animi deleniti
									voluptatum quaerat!
								</p>
							</div>
						</div>
						<div className="service__card h-full w-full relative rounded-xl overflow-hidden duration-500">
							<div
								className="w-full h-full p-4 flex justify-center items-center bg-cover bg-center z-10 aspect-[3/4] relative"
								style={{
									background: "url('/chemicals.jpg')",
								}}
							>
								<div className="label absolute bottom-0 left-0 ml-4 mb-4 md:ml-8 md:mb-6 px-3 text-lime-400 font-extrabold tracking-wide bg-slate-900/50">
									Service 2
								</div>
							</div>
							<div className="absolute top-0 left-0 w-1/2 h-full bg-sky-400 -z-10 aspect-[3/4] flex flex-col gap-5 items-start justify-start p-8">
								<h1 className="border-l-4 border-lime-400 px-4 md:text-lg lg:text-xl font-bold text-white tracking-wider">
									Service 2
								</h1>
								<p className="tracking-wide md:text-sm">
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Modi, quibusdam, amet
									corrupti eos voluptates enim quo
									dignissimos, debitis ad iusto quisquam eius
									neque dolores quod a animi deleniti
									voluptatum quaerat!
								</p>
								<p className="tracking-wide md:text-sm">
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Modi, quibusdam, amet
									corrupti eos voluptates enim quo
									dignissimos, debitis ad iusto quisquam eius
									neque dolores quod a animi deleniti
									voluptatum quaerat!
								</p>
							</div>
						</div>
						<div className="service__card h-full w-full relative rounded-xl overflow-hidden duration-500">
							<div className="relative w-full h-full p-4 flex justify-center items-center z-10 aspect-[3/4]">
								<Image
									src="/solar.jpg"
									layout="fill"
									objectFit="cover"
									alt="Background"
									className="z-0"
								/>
								<div className="relative z-10">
									<div className="label absolute bottom-0 left-0 ml-4 mb-4 md:ml-8 md:mb-6 px-3 text-lime-400 font-extrabold tracking-wide bg-slate-900/50">
										Service 3
									</div>
								</div>
							</div>
							<div className="absolute top-0 left-0 w-1/2 h-full bg-lime-400 -z-10 aspect-[3/4] flex flex-col gap-5 items-start justify-start p-8">
								<h1 className="border-l-4 border-black-400 px-4 md:text-lg lg:text-xl font-bold text-black tracking-wider">
									Service 3
								</h1>
								<p className="tracking-wide md:text-sm">
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Modi, quibusdam, amet
									corrupti eos voluptates enim quo
									dignissimos, debitis ad iusto quisquam eius
									neque dolores quod a animi deleniti
									voluptatum quaerat!
								</p>
								<p className="tracking-wide md:text-sm">
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Modi, quibusdam, amet
									corrupti eos voluptates enim quo
									dignissimos, debitis ad iusto quisquam eius
									neque dolores quod a animi deleniti
									voluptatum quaerat!
								</p>
							</div>
						</div>
					</div>
				</section>
				<section
					className="sec-4 relative w-full min-h-screen bg-white grid grid-cols-1 md:grid-cols-2 justify-center md:items-center transition-all duration-500 overflow-hidden"
					ref={ref1}
				>
					<div className="h-full w-full p-10 md:p-0 pt-0 flex justify-center items-center">
						<div className="max-h-[500px] h-full max-w-[500px] mx-auto  flex flex-col justify-evenly gap-4">
							<h1 className="animate-text text-[2.25rem] sm:text-[2.5rem] md:text-[3.2rem] font-bold text-left sm:text-right md:text-left mb-5">
								Our{" "}
								<span className="text-lime-600">
									Products Range
								</span>
							</h1>
							<h2 className="text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] font-bold text-left sm:text-right md:text-left text-lime-500">
								Nano-Graphene Based Lubricant
							</h2>
							<p className="text-md md:text-lg text-gray-500 text-right md:text-left">
								Introducing Suvira Energy&apos;s Nano-Graphene
								Based Lubricant: the next-generation solution
								for the oil and gas industry. Engineered with
								cutting-edge nano-graphene technology, our
								lubricant offers unparalleled performance,
								exceptional heat resistance, and superior
								friction reduction. Designed to meet the
								toughest demands, it ensures longer equipment
								life, enhanced operational efficiency, and
								reduced maintenance costs. Safe for the
								environment and compatible with various drilling
								systems, Suvira Energy&apos;s Nano-Graphene
								Based Lubricant is the perfect choice for modern
								energy solutions. Experience the future of
								lubrication with Suvira Energy.
							</p>
							<div className="w-full flex justify-end items-center">
								<div className="relative group">
									<div className="flex justify-center items-center gap-3 text-lime-400 font-bold px-4 py-2 rounded-full border-2 border-lime-400">
										<span className="">Read More</span>
										<ChevronsRightIcon size={20} />
									</div>
									<div className="absolute top-0 left-0 w-0 group-hover:w-full bg-lime-400 hidden group-hover:flex justify-center items-center gap-3 text-white font-bold px-4 py-2 rounded-full border-2 border-lime-400  transition-all duration-700 z-20">
										<span className="">Read More</span>
										<ChevronsRightIcon size={20} />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="h-full max-h-[400px] md:max-h-screen w-full relative flex justify-center items-center overflow-hidden mx-auto">
						<Image
							src="/spares.jpg"
							alt="Suvira"
							width={450}
							height={450}
							layout="intrinsic"
							className="animate-image w-full object-cover"
						/>
					</div>
				</section>
				<section className="relative w-full md:min-h-[300px] bg-white flex flex-col justify-center items-center gap-[7rem] px-4 py-6 pt-[50px]">
					<h1 className="text-[2.25rem] sm:text-[2.5rem] md:text-[3.2rem] font-bold max-w-[800px] text-center">
						<span className="text-lime-600">Clients : </span>
						Illuminating Success Stories in Partnership
					</h1>
					<div className="h-full marque">
						<div className="marquee__inner-wrap">
							<div className="marquee__inner gap-[5rem]">
								{Array.from({ length: 3 }, () => clients)
									.flat()
									.map((client, index) => (
										<>
											{/* <Image
											key={index}
											src={client.logo}
											alt={client.name}
											width={75}
											height={75}
										/> */}
											{/* <div className="w-[120px] h-full relative flex justify-center items-center">
											<Image
												key={index}
												src={client.logo}
												alt={client.name}
												width={450}
												height={450}
												layout="responsive"
												className="animate-image h-full w-full object-contain"
											/>
										</div> */}
											<Image
												key={index}
												src={client.logo}
												alt={client.name}
												width={75} // Specify a default width
												height={75} // Specify a default height
												className="w-full max-w-[75px] md:max-w-[120px] h-auto"
											/>
										</>
									))}
							</div>
						</div>
					</div>
				</section>
				<section className="testimonials relative w-full md:min-h-[700px] bg-white flex flex-col items-center justify-center gap-[5rem] px-4 py-6 pt-[50px]">
					<h1 className="text-[2.25rem] sm:text-[2.5rem] md:text-[3.2rem] font-bold max-w-[1100px] text-center md:text-left text-wrap">
						<span className="text-lime-600">
							Voices of Delight :{" "}
						</span>
						Stories from Our Satisfied Clients.
					</h1>
					<div className="h-full marque">
						<div className="marquee__inner-wrap">
							<div className="marquee__inner gap-[15px] md:gap-[5rem]">
								{Array.from({ length: 5 }, () => testimonials)
									.flat()
									.map((testimonial, index) => (
										<div
											key={index}
											className="testimonial-card flex justify-stretch items-center gap-4 w-[450px] bg-white rounded-xl px-3 py-4 marque-item"
										>
											{/* <div className=" w-[100px] h-[100px] rounded-full">
											<Image
												src={testimonial.image}
												alt="testimonial"
												width={100}
												height={100}
												className="max-w-none"
											/>
										</div> */}
											<Image
												key={index}
												src={testimonial.image}
												alt={testimonial.name}
												width={75} // Specify a default width
												height={75} // Specify a default height
												className="w-full max-w-[75px] md:max-w-[120px] h-auto"
											/>
											<div className="shrink flex flex-col gap-4 justify-between items-start overflow-hidden">
												<div className="tetsimony w-full text-wrap line-clamp-2 text-sm sm:text-md md:text-md">
													{testimonial.testimonial}
												</div>
												<div className="w-full flex justify-start items-center gap-2">
													<div className="grow client-info flex flex-col items-start">
														<h3 className=" text-sm sm:text-md md:text-lg font-bold text-lime-600">
															{testimonial.name}
														</h3>
														<p className="text-xs sm:text-sm md:text-sm text-gray-500">
															{
																testimonial.designation
															}
														</p>
													</div>
													<div className="rating flex items-center gap-1">
														{Array.from({
															length: 5,
														}).map((_, index) => (
															<StarIcon
																key={index}
																className={`w-5 h-5 text-yellow-500 ${
																	index <
																	testimonial.rating
																		? "fill-yellow-500"
																		: "text-gray-300"
																}`}
															/>
														))}
													</div>
												</div>
											</div>
										</div>
									))}
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
