import Sidebar from "@/components/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="light"
			enableSystem
			disableTransitionOnChange
		>
			<SessionProvider>
				<Sidebar>{children}</Sidebar>
			</SessionProvider>
		</ThemeProvider>
	);
}
