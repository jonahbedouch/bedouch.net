// import { Navbar } from '@components/Navbar/Navbar'
import Navbar from "@/components/Navbar";
import "./globals.css";
import { Lato } from "next/font/google";
import localFont from "next/font/local";
import Footer from "@/components/Footer";
import SkipLink from "@/components/SkipLink";
import {
  calculateSeasonal,
  themeList,
} from "@/helpers/calculate-themes.helper";
import { Metadata } from "next";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
});
const rubik = localFont({
  src: [
    {
      path: "./IBM Plex Sans Var-Roman.woff2",
      style: "normal",
    },
    {
      path: "./IBM Plex Sans Var-Italic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Jonah Bedouch",
    default: "Jonah Bedouch",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // let seasonalTheme = calculateSeasonal();

  return (
    <html lang="en">
      <body
        className={`${lato.variable} ${rubik.variable} font-sans flex min-h-screen flex-col bg-secondary-50 dark:bg-secondary-950 bg-tile dark:bg-tile-dark bg-125px dark:text-white`}
      >
        {/* Probably don't do this lmao - subvert next.js to force these to not be injected... prevents flashes of color*/}
        <script
          id="dark-toggle"
          dangerouslySetInnerHTML={{
            __html: `
            ${calculateSeasonal.toString()}

            try {
              if (localStorage.variant === 'dark' || (!('variant' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
              } else {
                  document.documentElement.classList.remove('dark');
              }

              if (localStorage.getItem("theme") === 'seasonal') {
                document.documentElement.setAttribute('data-theme', calculateSeasonal());
              }
            } catch (_) {}
          `,
          }}
        ></script>
        <style
          dangerouslySetInnerHTML={{
            __html: `/*
* Prefixed by https://autoprefixer.github.io
* PostCSS: v8.4.14,
* Autoprefixer: v10.4.7
* Browsers: last 4 version
*/

html:not(.dark)[data-theme="base"] code, html:not(.dark, [data-theme]) code,
html:not(.dark)[data-theme="base"] code span, html:not(.dark, [data-theme]) code span {
  color: var(--shiki-light);
  background-color: var(--shiki-light-bg);
  font-style: var(--shiki-light-font-style);
  font-weight: var(--shiki-light-font-weight);
  -webkit-text-decoration: var(--shiki-light-text-decoration);
  text-decoration: var(--shiki-light-text-decoration);
}
html.dark[data-theme="base"] code,html.dark:not([data-theme]) code,
html.dark[data-theme="base"] code span,html.dark:not([data-theme]) code span {
  color: var(--shiki-dark);
  background-color: var(--shiki-dark-bg);
  font-style: var(--shiki-dark-font-style);
  font-weight: var(--shiki-dark-font-weight);
  -webkit-text-decoration: var(--shiki-dark-text-decoration);
  text-decoration: var(--shiki-dark-text-decoration);
}`,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: themeList
              .map(
                (theme) => `html:not(.dark)[data-theme="${theme}"] code,
html:not(.dark)[data-theme="${theme}"] code span {
  color: var(--shiki-${theme});
  background-color: var(--shiki-${theme}-bg);
  font-style: var(--shiki-${theme}-font-style);
  font-weight: var(--shiki-${theme}-font-weight);
  -webkit-text-decoration: var(--shiki-${theme}-text-decoration);
  text-decoration: var(--shiki-${theme}-text-decoration);
}
html.dark[data-theme="${theme}"] code,
html.dark[data-theme="${theme}"] code span {
  color: var(--shiki-${theme}-dark);
  background-color: var(--shiki-${theme}-dark-bg);
  font-style: var(--shiki-${theme}-dark-font-style);
  font-weight: var(--shiki-${theme}-dark-font-weight);
  -webkit-text-decoration: var(--shiki-${theme}-dark-text-decoration);
  text-decoration: var(--shiki-${theme}-dark-text-decoration);
}`,
              )
              .join("\n\n"),
          }}
        ></style>
        <SkipLink
          skipTo="main:first-of-type"
          className="w-1/2 ml-[25%] py-2 z-20 bg-secondary-0 dark:bg-secondary-1000 text-text-light dark:text-text-dark rounded-md ring-1 ring-secondary-1000 dark:ring-secondary-900 ring-opacity-5 dark:ring-opacity-10 shadow-medium dark:shadow-d-medium"
        >
          <button>Skip to main content</button>
        </SkipLink>
        <div className="h-1.5 w-full bg-primary-600 transition-colors"></div>
        <div className="u-container mx-auto w-full">
          <Navbar />
          <div className="min-h-[calc(100vh-8.5rem)]">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
