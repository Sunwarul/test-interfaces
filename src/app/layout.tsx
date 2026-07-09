import { DM_Sans, Geist_Mono } from "next/font/google";
import "./styles/globals.css";

const dmSans = DM_Sans({
    subsets: ["latin"],
    variable: "--font-dm-sans",
});

const geistMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-geist-mono",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${dmSans.variable} ${geistMono.variable}`}
        >
            <body className="min-h-screen bg-background font-sans text-foreground antialiased">
                {children}
            </body>
        </html>
    );
}
