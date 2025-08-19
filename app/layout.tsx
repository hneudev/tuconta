import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { ConfigProvider } from "antd";
import CacheCleanup from "@/components/CacheCleanup";

const notoSans = Noto_Sans({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-noto-sans",
});

export const metadata: Metadata = {
	title: "tuConta - Tu Contador en línea",
	description: "Encárgate de tu negocio, nosotros de tu contabilidad.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='es'>
			<body className={notoSans.className}>
				<Providers>
					<ConfigProvider
						theme={{
							token: {
								colorPrimary: "#176BFF",
							},
						}}>
						<CacheCleanup />
						{children}
					</ConfigProvider>
				</Providers>
			</body>
		</html>
	);
}
