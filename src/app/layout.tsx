import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inter, Convergence } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import LayoutClient from "./LayoutClient";

config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });
const convergence = Convergence({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SHOPNOW - Premium Branded Fashion Online",
    template: "%s | SHOPNOW",
  },
  description:
    "Discover an extensive selection of branded clothing, bags, shoes, accessories, and more. Shop the latest fashion trends with exceptional customer service at SHOPNOW.",
  keywords: [
    "branded clothing",
    "fashion",
    "online shopping",
    "shoes",
    "bags",
    "accessories",
    "t-shirts",
  ],
  authors: [{ name: "SHOPNOW" }],
  icons: {
    icon: "/images/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shopping-cart-frontend-next-js-13.vercel.app/",
    siteName: "SHOPNOW",
    title: "SHOPNOW - Premium Branded Fashion Online",
    description:
      "Discover an extensive selection of branded clothing, bags, shoes, accessories, and more.",
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
      className={`${inter.className} ${convergence.className}`}
      suppressHydrationWarning
    >
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
