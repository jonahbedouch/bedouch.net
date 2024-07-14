// import { Navbar } from '@components/Navbar/Navbar'
import Navbar from '@/components/Navbar'
import './globals.css'
import { Lato, IBM_Plex_Sans } from 'next/font/google'
import Footer from '@/components/Footer'
import SkipLink from '@/components/SkipLink'
import { calculateSeasonal } from '@/helpers/calculate-themes.helper'

const lato = Lato({ weight: ['100', '300', '400', '700', '900'], subsets: ['latin'], display: "swap", variable: "--font-lato" })
const rubik = IBM_Plex_Sans({ weight: ["100", "200", "300", "400", "500", "600", "700"], subsets: ['latin'], display: "swap", variable: "--font-rubik" })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let seasonalTheme = calculateSeasonal();

  return (
    <html lang="en">
      <body className={`${lato.variable} ${rubik.variable} font-sans flex min-h-screen flex-col bg-secondary-50 dark:bg-secondary-950 bg-tile dark:bg-tile-dark bg-125px dark:text-white`}>
        {/* Probably don't do this lmao - subvert next.js to force these to not be injected... prevents flashes of color*/}
        <script id="dark-toggle" dangerouslySetInnerHTML={{
          __html: `
            try {
              if (localStorage.variant === 'dark' || (!('variant' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
              } else {
                  document.documentElement.classList.remove('dark')
              }

              if (localStorage.getItem("theme") === 'seasonal') {
                document.documentElement.setAttribute('data-theme', '${seasonalTheme}')
              }
            } catch (_) {}
          `,
        }}>
        </script>
        <script id="dark-toggle" dangerouslySetInnerHTML={{
          __html: `
            try {
              if (localStorage.getItem("theme") === 'seasonal') {
                document.documentElement.setAttribute('data-theme', '${seasonalTheme}')
              }
            } catch (_) {}
          `,
        }}>
        </script>
        <SkipLink skipTo="main:first-of-type" className='w-1/2 ml-[25%] py-2 z-20 bg-secondary-0 dark:bg-secondary-1000 text-text-light dark:text-text-dark rounded-md ring-1 ring-secondary-1000 dark:ring-secondary-900 ring-opacity-5 dark:ring-opacity-10 shadow-medium dark:shadow-d-medium'>
          <button>Skip to main content</button>
        </SkipLink>
        <div className="h-1.5 w-full bg-primary-600 transition-colors"></div>
        <div className="u-container mx-auto w-full">
          <Navbar />
          <main className='min-h-[calc(100vh-8.5rem)]'>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
