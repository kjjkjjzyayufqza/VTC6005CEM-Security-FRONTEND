import { Image, Typography } from 'antd'
import '../globals.css'
import { Inter } from 'next/font/google'

const { Title, Paragraph, Text, Link } = Typography
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'React Next.js App',
  description: 'Generated by create next app'
}

export default function InputFormLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className={inter.className}>
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        <div className='z-10 w-full max-w-5xl items-center justify-between lg:flex'>
          <h2 className={`mb-3 text-2xl font-semibold`}>
            COVID-19 Vaccination Programme - Booking System
          </h2>
          <div className='fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none'>
            <a
              className='pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0'
              href='https://github.com/kjjkjjzyayufqza'
            >
              By <Text strong>Moovoo</Text>
            </a>
          </div>
        </div>
        {children}
        <footer className='flex justify-center items-center'>
          Public / Employees
        </footer>
      </main>
    </div>
  )
}
