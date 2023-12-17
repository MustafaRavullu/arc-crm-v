import { Manrope } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata = {
  title: "ARC CRM",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`text-sm ${manrope.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
