import './globals.css'
import { Geist, Geist_Mono } from 'next/font/google'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata = {
  title: 'Ziyad | Full-Stack Developer',
  description: 'Portfolio of Muhammad Ziyad Bin Hilaluddin',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} bg-white text-black antialiased`}>
        {children}
      </body>
    </html>
  )
}
