'use client'
import { StyleProvider } from '@ant-design/cssinjs'
import { Button, ConfigProvider, Image } from 'antd'
import React from 'react'
import { Divider, Typography } from 'antd'
import { useRouter } from 'next/navigation'

const { Title, Paragraph, Text, Link } = Typography
function HomePage () {
  const router = useRouter()

  return (
    <ConfigProvider
      theme={{
        token: {}
      }}
    >
      <StyleProvider hashPriority='high'>
        <div>
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
            <div className='md:shrink-0 rounded-lg overflow-hidden md:px-24'>
              <Image
                className='h-48 w-full object-cover md:h-full md:w-48 rounded-lg'
                src='https://booking.covidvaccine.gov.hk/forms/assets/img/banner_en.jpg'
                alt='Modern building architecture'
              />
            </div>
            <div className="relative flex place-items-center before:absolute before:h-[200px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[200px]">
              <Title className='relative text-9xs'>
                Please select the service you need.
              </Title>
            </div>

            <div className='mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left'>
              <button className='text-left group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'>
                <h2 className={`mb-3 text-2xl font-semibold`}>
                  Booking for the 1<sup>st</sup> and 2<sup>nd</sup> doses
                  Sinovac{' '}
                  <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
                    -&gt;
                  </span>
                </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                  Aged 6 month-old or Above
                </p>
              </button>

              <button className='text-left group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30'>
                <h2 className={`mb-3 text-2xl font-semibold`}>
                  Booking for the 1<sup>st</sup> and 2<sup>nd</sup> doses
                  BioNtech/Fosun [Comirnaty]{' '}
                  <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
                    -&gt;
                  </span>
                </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                  Aged 6 month-old or Above
                </p>
              </button>

              <button className='text-left group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'>
                <h2 className={`mb-3 text-2xl font-semibold`}>
                  Booking for Additional Dose 3<sup>rd</sup>/4<sup>th</sup>/5
                  <sup>th</sup>/6<sup>th</sup>{' '}
                  <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
                    -&gt;
                  </span>
                </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                  Must have received first and second vaccinations
                </p>
              </button>

              <button
                onClick={() => {
                  router.push('InputForm')
                }}
                className='text-left group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
              >
                <h2 className={`mb-3 text-2xl font-semibold`}>
                  Enquire/Change/Cancel booking{' '}
                  <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
                    -&gt;
                  </span>
                </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                  Perform various operations
                </p>
              </button>
            </div>
          </main>
          <footer className='flex justify-center items-center'>
            Public / Employees
          </footer>
        </div>
      </StyleProvider>
    </ConfigProvider>
  )
}

export default HomePage
