"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Logo from "@/public/logo.svg";

const navmenu = [
	{
		name: "Home",
		url: "/",
	},
	{
		name: "About Us",
		url: "/about",
	},
	{
		name: "Offerings",
		url: "/offerings",
	},
	{
		name: "Career",
		url: "/career",
	},
	{
		name: "Blogs",
		url: "/blogs",
	},
	{
		name: "News",
		url: "/news",
	},
	{
		name: "Contact",
		url: "/contact",
	},
];

export default function Navbar() {
	const ref = useRef<HTMLElement | null>(null);
	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (ref.current) {
				if (window.scrollY > window.innerHeight - 30) {
					ref.current.classList.add("sticky-nav");
				} else {
					ref.current.classList.remove("sticky-nav");
				}
			}
		});
	}, [ref]);
	return (
		<header
			className="fixed top-0 left-0 w-full flex justify-between items-start duration-500 bg-transparent px-[50px] py-[40px] z-[1000]"
			ref={ref}
		>
			<Link
				href="/"
				className="relative font-700 text-black text-2xl uppercase max-w-[300px] duration-500"
			>
				<Image src={Logo} alt="Suvira" />
			</Link>
			<ul className="relative hidden md:flex justify-center items-center gap-2">
				{navmenu.map((item, index) => (
					<li
						key={index}
						className="relative"
						style={{
							listStyle: "none",
						}}
					>
						<Link
							href={item.url}
							className="relative mx-2 my-1 text-white font-semibold duration-500 "
						>
							{item.name}
						</Link>
					</li>
				))}
			</ul>
		</header>
	);
}
