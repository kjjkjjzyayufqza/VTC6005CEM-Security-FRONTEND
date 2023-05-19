'use client'
import {
  ProForm,
  ProFormRadio,
  ProFormText,
  ProFormSelect,
  ProFormDatePicker,
  ProFormTextArea
} from '@ant-design/pro-components'
import { StyleProvider } from '@ant-design/cssinjs'
import {
  Breadcrumb,
  Col,
  ConfigProvider,
  message,
  Row,
  Space,
  Typography
} from 'antd'
import { useState } from 'react'
import { Inter } from 'next/font/google'
const { Title, Paragraph, Text, Link } = Typography
const inter = Inter({ subsets: ['latin'] })

export default () => {
  return (
    <ConfigProvider
      theme={{
        token: {}
      }}
    >
      <StyleProvider hashPriority='high'>
        <div className={inter.className}>
          <div className='flex min-h-screen flex-col items-center justify-between p-24'>
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
            <div className='w-full'>
              <div className={'flex justify-center items-center'}>
                <ProForm<{
                  name_en: string
                  name_zh: string
                  gender: string
                  dateOfBirth: Date
                  identityDN: string
                  residenceAddress: string
                  birthAddress: string
                }>
                  submitter={{
                    searchConfig: {
                      resetText: 'Reset',
                      submitText: 'Next'
                    },
                    render: (props, doms) => {
                      return (
                        <div className='flex items-center justify-center'>
                          <Space>{doms}</Space>
                        </div>
                      )
                    }
                  }}
                  onFinish={async values => {
                    console.log(values)
                    message.success('提交成功')
                  }}
                  params={{}}
                >
                  <ProFormText
                    width='md'
                    name='name_en'
                    label='English Full Name'
                    placeholder='Please enter your full name in English'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your full name in English!'
                      }
                    ]}
                  />
                  <ProFormText
                    width='md'
                    name='name_zh'
                    label='Chinese Full Name'
                    placeholder='Please enter your full name in Chinese'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your full name in Chinese!'
                      }
                    ]}
                  />
                  <ProFormSelect
                    name='gender'
                    label='Gender'
                    valueEnum={{
                      Male: 'Male',
                      Female: 'Female',
                      Other: 'Other'
                    }}
                    width='md'
                    placeholder='Please select a gender'
                    rules={[
                      { required: true, message: 'Please select your gender!' }
                    ]}
                  />

                  <ProFormDatePicker
                    width='md'
                    name='dateOfBirth'
                    label='Date of Birth'
                    placeholder='Please select a Birth'
                    rules={[
                      {
                        required: true,
                        message: 'Please select a Birth!'
                      }
                    ]}
                  />

                  <ProFormText
                    width='md'
                    name='identityDN'
                    label='Identity document number'
                    placeholder='e.g: A1234567'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your Identity document number!'
                      },
                      {
                        pattern: /[a-zA-Z]{1}[0-9]{7}/,
                        message:
                          'Please enter a valid Identity document number!'
                      },
                      {
                        max: 8,
                        message:
                          'Please enter a valid Identity document number!'
                      }
                    ]}
                  />

                  <ProFormTextArea
                    name='residenceAddress'
                    label='Residence Address'
                    placeholder='Please input a Residence Address'
                    rules={[
                      {
                        required: true,
                        message: 'Please input a Residence Address!'
                      }
                    ]}
                  />
                  <ProFormTextArea
                    width='md'
                    name='birthAddress'
                    label='Birth Address'
                    placeholder='Please input a Birth Address'
                    rules={[
                      {
                        required: true,
                        message: 'Please input a Birth Address!'
                      }
                    ]}
                  />
                </ProForm>
              </div>
            </div>
          </div>
        </div>
      </StyleProvider>
    </ConfigProvider>
  )
}
