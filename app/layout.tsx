import type React from "react"
import type { Metadata } from "next"
import { VT323 } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { HealthProvider } from "@/components/health-provider"

// Use VT323 font for pixel art style
const pixelFont = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
})

export const metadata: Metadata = {
  title: "Health Quest",
  description: "Track your wellness journey with Health Tracker Pro",
  generator: 'v0.dev',
  icons: {
    icon: "/main_logo.png", // for favicon or tab icon
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={pixelFont.variable}>
      <body className="bg-gray-100">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <HealthProvider>
            {children}
            <Toaster />
          </HealthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
