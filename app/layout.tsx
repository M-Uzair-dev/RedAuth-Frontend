import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = "https://redauth.uzairmanan.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "RedAuth — Production-Ready Auth Backend for Node.js",
    template: "%s | RedAuth",
  },

  description:
    "RedAuth is a production-ready Express + TypeScript authentication backend. Dual-token JWT with theft detection, Redis rate limiting & caching, BullMQ message queues, device-aware sessions, and Zod v4 validation — all pre-wired. Clone, configure, and ship.",

  keywords: [
    "authentication backend",
    "Node.js authentication",
    "Express TypeScript auth",
    "JWT refresh token rotation",
    "Redis rate limiting",
    "BullMQ email queue",
    "Zod v4 validation",
    "Prisma PostgreSQL ORM",
    "production auth boilerplate",
    "device-aware sessions",
    "token theft detection",
    "secure API backend",
    "RedAuth",
    "Uzair Manan",
  ],

  authors: [{ name: "Uzair Manan", url: "https://uzairmanan.com" }],
  creator: "Uzair Manan",
  publisher: "Uzair Manan",

  alternates: {
    canonical: BASE_URL,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "RedAuth",
    title: "RedAuth — Production-Ready Auth Backend for Node.js",
    description:
      "Clone, configure, and ship a secure Express + TypeScript auth backend in minutes. Dual-token JWT, Redis caching, BullMQ queues, Zod v4, and Prisma — all pre-wired.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "RedAuth — Production-Ready Auth Backend for Node.js",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "RedAuth — Production-Ready Auth Backend for Node.js",
    description:
      "Clone, configure, and ship a secure Express + TypeScript auth backend in minutes. JWT, Redis, BullMQ, Zod v4 — all pre-wired.",
    images: ["/opengraph-image"],
    creator: "@uzairmanan",
  },

  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "RedAuth",
  url: BASE_URL,
  description:
    "A production-ready Express + TypeScript authentication backend. Device-aware sessions, dual-token JWT with theft detection, Redis rate limiting & caching, BullMQ message queues, and Zod v4 validation — all pre-wired.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Node.js",
  author: {
    "@type": "Person",
    name: "Uzair Manan",
    url: "https://uzairmanan.com",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  keywords:
    "authentication, JWT, Redis, Express, TypeScript, Node.js, BullMQ, Prisma, Zod",
  featureList: [
    "Dual JWT access + refresh tokens with theft detection",
    "Redis sliding-window rate limiting",
    "Redis user cache with Zod-validated reads/writes",
    "BullMQ async email delivery with retry backoff",
    "Device-aware sessions with per-session revocation",
    "Zod v4 schema validation on every endpoint",
    "Prisma 7 PostgreSQL ORM with pg pool adapter",
    "Cron job token cleanup every 10 minutes",
    "Timing-attack-safe auth endpoints",
    "HTML email templates via Nodemailer",
  ],
  codeRepository: "https://github.com/M-Uzair-dev/Authetication-Template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
