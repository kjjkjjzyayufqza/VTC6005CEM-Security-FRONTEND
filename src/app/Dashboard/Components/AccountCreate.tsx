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
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Form,
  message,
  Row,
  Select,
  Space,
  Tag,
  Typography
} from 'antd'
import { useEffect, useState } from 'react'
import { Inter } from 'next/font/google'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import moment from 'moment'
import dayjs from 'dayjs'
import { createUserBooking } from '@/api'
import {
  CreateUserModel,
  GenderType,
  UserModel,
  bookingDataModel,
  userBooking,
  vaccineBrand
} from '@/model'
import * as CryptoJS from 'crypto-js'
import { CreateAccount } from '@/api/staff'
const { Title, Paragraph, Text } = Typography
const inter = Inter({ subsets: ['latin'] })

export default () => {
  const [messageApi, contextHolder] = message.useMessage()
  const [form] = Form.useForm()
  useEffect(() => {}, [])

  return (
    <ConfigProvider
      theme={{
        token: {}
      }}
    >
      <StyleProvider hashPriority='high'>
        <div className='flex justify-center items-center bg-white p-24'>
          <div className={inter.className}>
            <ProForm<{
              name: string
              email: string
              password: string
              role: 'Staff'
            }>
              form={form}
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
                let password = CryptoJS.SHA256(values.password).toString()
                const submitData: CreateUserModel = {
                  name: values.name,
                  email: values.email,
                  password: password,
                  role: 'Staff'
                }

                CreateAccount(submitData)
                  .then(res => {
                    messageApi.success('Create Done')
                  })
                  .catch(err => {
                    messageApi.warning(
                      `Create Fail ${
                        err?.response.data && err?.response.data.message
                      }`
                    )
                  })
              }}
              params={{}}
            >
              <ProFormText
                width='md'
                name='name'
                label='Name'
                placeholder='Please enter staff Name'
                rules={[
                  {
                    required: true,
                    message: 'Please enter staff Name !'
                  }
                ]}
              />
              <ProFormText
                width='md'
                name='email'
                label='Email'
                placeholder='Please enter staff Email'
                rules={[
                  {
                    required: true,
                    message: 'Please enter staff Email !'
                  }
                ]}
              />
              <ProFormText
                width='md'
                name='password'
                label='Password'
                placeholder='Please enter Password'
                rules={[
                  {
                    required: true,
                    message: 'Please enter Password !'
                  }
                ]}
              />
              <ProFormSelect
                name='role'
                label='Role'
                valueEnum={{
                  Staff: 'Staff'
                }}
                width='md'
                placeholder='Please select a role'
                rules={[{ required: true, message: 'Please select a role !' }]}
              />
            </ProForm>
          </div>
        </div>
        {contextHolder}
      </StyleProvider>
    </ConfigProvider>
  )
}
