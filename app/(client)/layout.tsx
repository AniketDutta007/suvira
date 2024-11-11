import Navbar from "@/components/client/navbar";
import "./style.css";
import Footer from "@/components/client/footer";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Navbar />
			{children}
			<Footer />
		</>
	);
}
