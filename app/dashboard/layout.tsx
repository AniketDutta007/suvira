import Sidebar from "@/components/dashboard/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import "./prosemirror.css";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
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
			<Toaster />
		</>
	);
}
