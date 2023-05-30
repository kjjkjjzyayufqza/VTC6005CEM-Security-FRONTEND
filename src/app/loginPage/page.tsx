'use client'
import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined
} from '@ant-design/icons'
import {
  LoginForm,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText
} from '@ant-design/pro-components'
import {
  Button,
  ConfigProvider,
  message,
  Segmented,
  Space,
  Typography
} from 'antd'
import type { CSSProperties } from 'react'
import { useState } from 'react'
import { StyleProvider } from '@ant-design/cssinjs'
import { Footer } from 'antd/es/layout/layout'
import * as CryptoJS from 'crypto-js'
import { getCurrentUser } from '@/api/staff'
import { SignIn } from '@/api/auth'
import jwt_decode from 'jwt-decode'
import { useRouter } from 'next/navigation'
const { Title, Paragraph, Text } = Typography
export default () => {
  const router = useRouter()
  const [messageApi, contextHolder] = message.useMessage()
  return (
    <ConfigProvider
      theme={{
        token: {}
      }}
    >
      <StyleProvider hashPriority='high'>
        {contextHolder}
        <div className='min-h-screen items-center p-24 bg-white justify-center grid grid-cols-1'>
          <div style={{ backgroundColor: 'white' }}>
            <LoginForm
              submitter={{ searchConfig: { submitText: 'Sign In' } }}
              title='Dashboard'
              // initialValues={{ username: 'staff@a.com', password: '12345678' }}
              subTitle='COVID-19 Vaccination Programme'
              onFinish={async values => {
                let password = CryptoJS.SHA256(values.password).toString()
                await SignIn({ email: values.username, password: password })
                  .then(res => {
                    // console.log(res.data)
                    messageApi.success('Login Success')
                    localStorage.setItem('access_token', res.data.accessToken)
                    localStorage.setItem('refresh_token', res.data.refreshToken)
                    const expire_date: any = jwt_decode(res.data.accessToken)
                    localStorage.setItem(
                      'expire_date',
                      String(expire_date.exp * 1000)
                    )
                    router.push('Dashboard')
                  })
                  .catch(err => {
                    // console.log(err)
                    messageApi.warning(
                      `Login Fail ${
                        err?.response.data && err?.response.data.message
                      }`
                    )
                  })
              }}
            >
              <>
                <ProFormText
                  name='username'
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={'prefixIcon'} />
                  }}
                  placeholder={'User Email'}
                  rules={[
                    {
                      required: true,
                      message: 'Please Input !'
                    }
                  ]}
                />
                <ProFormText.Password
                  name='password'
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={'prefixIcon'} />
                  }}
                  placeholder={'Password'}
                  rules={[
                    {
                      required: true,
                      message: 'Please Input !'
                    }
                  ]}
                />
              </>
            </LoginForm>
            {/* <Button
              onClick={() => {
                getCurrentUser()
                  .then(res => {
                    console.log(res.data)
                  })
                  .catch(err => {
                    console.log(err)
                  })
              }}
            >
              hello
            </Button> */}
          </div>
        </div>
      </StyleProvider>
    </ConfigProvider>
  )
}
