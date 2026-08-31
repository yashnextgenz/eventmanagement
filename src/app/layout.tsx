import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sree Souram Event Management | Premium Event Planners in Hyderabad",
  description:
    "Sree Souram Event Management crafts unforgettable weddings, corporate events, and celebrations. From dream weddings to professional conferences, we deliver excellence with creativity and precision.",
  keywords: [
    "event management",
    "wedding planner",
    "corporate events",
    "Hyderabad events",
    "Sree Souram",
    "wedding decorations",
    "event planning",
    "birthday parties",
    "stage decoration",
    "catering services",
  ],
  authors: [{ name: "Sree Souram Event Management" }],
  icons: {
    icon: "/logo.svg",
    },
    openGraph: {
    title: "Sree Souram Event Management",
    description:
      "Creating unforgettable experiences. From dream weddings to corporate events.",
    type: "website",
    locale: "en_IN",
    siteName: "Sree Souram Event Management",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sree Souram Event Management",
    description:
      "Premium event planning services for weddings, corporate events, and celebrations.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
