import { Inter, Manrope } from 'next/font/google'
import './globals.css'
import BarraNav from '@/components/BarraNav'

const inter = Inter({ subsets: ['latin'] })
const man = Manrope({subsets:['latin']})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={man.className} >
        <BarraNav></BarraNav>
        {children}
        </body>
    </html>
  )
}


