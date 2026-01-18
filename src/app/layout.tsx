import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inter, Convergence } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import LayoutClient from "./LayoutClient";

config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const convergence = Convergence({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  variable: "--font-convergence",
});

export const metadata: Metadata = {
  title: {
    default: "ShopNow | Premium Branded Shoes",
    template: "%s | ShopNow",
  },
  description:
    "Discover an extensive selection of branded shoes. Shop the latest fashion trends with exceptional customer service at ShopNow.",
  keywords: [
    "branded clothing",
    "fashion",
    "online shopping",
    "shoes",
    "bags",
    "accessories",
    "t-shirts",
  ],
  authors: [{ name: "ShopNow" }],
  icons: {
    icon: "/images/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shopnow-lilac.vercel.app/",
    siteName: "ShopNow",
    title: "ShopNow | Premium Branded Shoes",
    description:
      "Discover an extensive selection of branded shoes. Shop the latest fashion trends with exceptional customer service at ShopNow.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${convergence.variable}`}
      suppressHydrationWarning
    >
      <body className="font-convergence">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
