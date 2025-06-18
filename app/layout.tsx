import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Stay Hot Baseball | Elite Baseball Training",
  description: "Elite baseball training to help players stay hot and perform at their peak",
  keywords: "baseball training, stay hot baseball, baseball coaching, baseball skills, baseball development",
  openGraph: {
    title: "Stay Hot Baseball | Elite Baseball Training",
    description: "Elite baseball training to help players stay hot and perform at their peak",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Stay Hot Baseball",
      },
    ],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
 return (
  <html lang="en" suppressHydrationWarning>
    <body className={inter.className}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </body>
  </html>
)

}
