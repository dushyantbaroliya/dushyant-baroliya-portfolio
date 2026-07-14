import type { Metadata } from "next";
import { Heebo, Zen_Dots } from "next/font/google";
import Providers from "@/components/providers/Providers";
import Header from "@/components/layout/Header";
import ScrollProgress from "@/components/layout/ScrollProgress";
import { SITE, SOCIALS } from "@/constants/content";
import "@/styles/globals.css";

const zenDots = Zen_Dots({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-zen-dots",
  display: "swap",
});

const heebo = Heebo({
  subsets: ["latin"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} · Portfolio`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "Dushyant Baroliya",
    "full stack developer",
    "mechanical engineering",
    "AI products",
    "quantitative finance",
    "portfolio",
    "India",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: `${SITE.name} · Portfolio`,
    title: `${SITE.name} · Full Stack & AI/Quant Developer`,
    description: SITE.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} · Full Stack & AI/Quant Developer`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  email: `mailto:${SITE.email}`,
  jobTitle: "Full Stack Developer",
  description: SITE.description,
  address: { "@type": "PostalAddress", addressCountry: "IN" },
  sameAs: SOCIALS.map((social) => social.href),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${zenDots.variable} ${heebo.variable}`}>
      <body className="bg-black font-body text-slate-50">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-md focus:bg-tech-medium focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        <Providers>
          <ScrollProgress />
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
