import "./globals.css";
import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import BrowserInit from "@/components/responsive/BrowserInit";
import AccessibilityProvider from "@/components/accessibility/AccessibilityProvider";

import { Analytics } from "@vercel/analytics/next";

// Using system fonts instead of Google Fonts to avoid network connectivity issues
const fontFamily = {
  variable: "--font-system",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

// Enhanced metadata for SEO
export const metadata: Metadata = {
  metadataBase: new URL("https://vanrajnarula.com"),
  title: {
    default: "Vanraj Narula - GenAI Leader & Technology Executive",
    template: "%s | Vanraj Narula",
  },
  description:
    "Deputy Manager with 14+ years experience leading GenAI implementations, AI automation systems, and high-performing technology teams. Expert in LangChain, LLMs, and scalable architecture.",
  keywords: [
    "GenAI Expert",
    "AI Technology Leader",
    "LangChain Developer",
    "Computer Vision Engineer",
    "Team Leadership",
    "AI Automation",
    "LLM Fine-tuning",
    "Technology Executive",
    "Machine Learning",
    "AI Strategy",
  ],
  authors: [{ name: "Vanraj Narula", url: "https://vanrajnarula.com" }],
  creator: "Vanraj Narula",
  publisher: "Vanraj Narula",
  category: "Technology",
  classification: "Professional Portfolio",

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vanrajnarula.com",
    siteName: "Vanraj Narula - GenAI Leader",
    title: "Vanraj Narula - GenAI Leader & Technology Executive",
    description:
      "Deputy Manager specializing in GenAI, LLMs, and team leadership. 14+ years experience in AI automation and scalable technology solutions.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vanraj Narula - GenAI Leader & Technology Executive",
        type: "image/jpeg",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    site: "@vanrajnarula",
    creator: "@vanrajnarula",
    title: "Vanraj Narula - GenAI Leader & Technology Executive",
    description:
      "Deputy Manager specializing in GenAI, LLMs, and team leadership. 14+ years experience in AI automation.",
    images: ["/images/twitter-card.jpg"],
  },

  // Additional metadata
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

  verification: {
    google: "your-google-verification-code",
    other: {
      "linkedin-domain-verification": "your-linkedin-verification",
    },
  },

  alternates: {
    canonical: "https://vanrajnarula.com",
    languages: {
      "en-US": "https://vanrajnarula.com",
    },
  },

  other: {
    "contact:email": "vanraj.narula@gmail.com",
    "contact:phone_number": "+91-9646575004",
    "contact:country_name": "India",
    "contact:region": "Punjab",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontFamily.variable} suppressHydrationWarning>
      <head>
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/images/vanraj-profile.jpg"
          as="image"
          type="image/jpeg"
        />

        {/* Favicon - Next.js App Router automatically handles favicon.ico from app directory */}
        {/* Skip SVG favicons to avoid hydration issues */}
        <link rel="manifest" href="/manifest.json" />

        {/* Additional SEO tags */}
        <meta name="format-detection" content="telephone=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Vanraj Narula" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Browser support initialization */}
          <BrowserInit />
          <AccessibilityProvider />
          <main id="main-content">{children}</main>
        </ThemeProvider>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YOUR_MEASUREMENT_ID');
          `}
        </Script>

        {/* Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Vanraj Narula",
              jobTitle: "Deputy Manager & GenAI Expert",
              description:
                "Technology leader with 14+ years experience in GenAI, LLMs, and team leadership",
              url: "https://vanrajnarula.com",
              email: "vanraj.narula@gmail.com",
              telephone: "+91-9646575004",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Patiala",
                addressRegion: "Punjab",
                addressCountry: "India",
              },
              alumniOf: [
                {
                  "@type": "EducationalOrganization",
                  name: "Punjabi University",
                  location: "Patiala, Punjab",
                },
              ],
              worksFor: {
                "@type": "Organization",
                name: "WNS Global Services",
              },
              knowsAbout: [
                "GenAI",
                "LangChain",
                "LLMs",
                "Computer Vision",
                "Team Leadership",
                "AI Automation",
              ],
              sameAs: [
                "https://linkedin.com/in/vanraj-narula",
                "https://github.com/Vanu-Narula",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
