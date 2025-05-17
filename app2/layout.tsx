import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { Toaster } from "@/components/ui/toaster"
import { HealthProvider } from "@/components/health-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Health Tracker Pro",
  description: "Track your wellness journey with Health Tracker Pro",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <HealthProvider>
            <div className="flex h-screen bg-gray-50">
              <Sidebar />
              <div className="flex flex-col flex-1 overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
              </div>
            </div>
            <Toaster />
          </HealthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
