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
  Space,
  Typography
} from 'antd'
import { useEffect, useState } from 'react'
import { Inter } from 'next/font/google'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import moment from 'moment'
import dayjs from 'dayjs'
import { createUserBooking, getAllBookingDate } from '@/api'
import { GenderType, userBooking, vaccineBrand } from '@/model'
import * as CryptoJS from 'crypto-js'
const { Title, Paragraph, Text } = Typography
const inter = Inter({ subsets: ['latin'] })

export default () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const type: vaccineBrand = searchParams.get('type') as any
  const [form] = Form.useForm()
  const [allDate, setAllDate] = useState<string[]>([])
  const [messageApi, contextHolder] = message.useMessage()
  useEffect(() => {
    if (!Object.values(vaccineBrand).includes(type)) {
      router.push('/')
    }

    getAllBookingDate({ startTime: dayjs().toString() })
      .then(res => {
        const result = res.data.data.map(e => {
          return e.startTime
        })
        setAllDate(result)
      })
      .catch(err => {
        console.log(err)
        messageApi.warning('Server Error')
      })
  }, [])

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
              <Link href='/'>
                <Button className=''>Back</Button>
              </Link>
              <Button
                onClick={() => {
                  form.setFieldsValue({
                    bookingDate: dayjs().add(1, 'day'),
                    name_en: 'abc',
                    name_zh: '好',
                    gender: 'Male',
                    dateOfBirth: dayjs(),
                    identityDN: 'A1234567',
                    mobile: '12345678',
                    residenceAddress: 'string',
                    birthAddress: 'string'
                  })
                }}
              >
                Test
              </Button>
              <div className={'flex justify-center items-center'}>
                <ProForm<{
                  bookingDate: string
                  name_en: string
                  name_zh: string
                  gender: string
                  dateOfBirth: string
                  identityDN: string
                  mobile: string
                  residenceAddress: string
                  birthAddress: string
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
                    const key_id: any = process.env.NEXT_PUBLIC_ID_SECRETKEY
                    const identityDN_dataToEncrypt = values.identityDN
                    const iv = CryptoJS.lib.WordArray.random(16) // 随机生成 16 个字节的 IV
                    const identityDN_encrypted = CryptoJS.AES.encrypt(
                      identityDN_dataToEncrypt,
                      key_id,
                      {
                        iv: iv
                      }
                    )
                    const identityDN_dataToEncrypt_encryptedString = `${iv.toString()}${identityDN_encrypted.toString()}`

                    // console.log(identityDN_dataToEncrypt_encryptedString)

                    // const iv_d = CryptoJS.enc.Hex.parse(
                    //   identityDN_dataToEncrypt_encryptedString.substr(0, 32)
                    // ) // 从字符串中提取前 32 个字符作为 IV
                    // const ciphertext = identityDN_dataToEncrypt_encryptedString.substr(32)
                    // const decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
                    //   iv: iv_d
                    // })
                    // const decryptedString = decrypted.toString(
                    //   CryptoJS.enc.Utf8
                    // )
                    // console.log(decryptedString)

                    const submitData: userBooking = {
                      nameEn: values.name_en,
                      nameCn: values.name_zh,
                      gender: values.gender as GenderType,
                      identityDN: identityDN_dataToEncrypt_encryptedString,
                      mobile: values.mobile,
                      birthDate: moment(values.bookingDate).toString(),
                      address: values.residenceAddress,
                      birthplace: values.birthAddress,
                      vaccineBrand: vaccineBrand[type],
                      bookDate: {
                        id: allDate
                          .filter(
                            word =>
                              moment(word).format('YYYY-MM-DD') ==
                              moment(values.bookingDate).format('YYYY-MM-DD')
                          )
                          .toString()
                      }
                    }

                    const key: any = process.env.NEXT_PUBLIC_SECRETKEY
                    const iv_data = CryptoJS.lib.WordArray.random(16) // 随机生成 16 个字节的 IV
                    const encrypted_data = CryptoJS.AES.encrypt(
                      JSON.stringify(submitData),
                      key,
                      {
                        iv: iv_data
                      }
                    )
                    const encryptedString_data = `${iv_data.toString()}${encrypted_data.toString()}`

                    createUserBooking(encryptedString_data)
                      .then(res => {
                        // console.log(res.data)
                        messageApi.success('Success')
                      })
                      .catch(err => {
                        console.log(err)
                        messageApi.warning(err)
                      })
                  }}
                  params={{}}
                >
                  <Form.Item
                    name='bookingDate'
                    label='Booking Date'
                    rules={[
                      {
                        required: true,
                        message: 'Please Select the Date'
                      }
                    ]}
                  >
                    <DatePicker
                      className='w-full'
                      disabledDate={current => {
                        // 将 current 转换为 Date 类型，便于比较
                        const date = new Date(current.valueOf())
                        // 禁用在 disabledDates 数组中的所有日期
                        return !allDate.some(disabledDate => {
                          return (
                            date.toDateString() ===
                            new Date(disabledDate).toDateString()
                          )
                        })
                      }}
                    />
                  </Form.Item>

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

                  <ProFormText
                    width='md'
                    name='mobile'
                    label='Mobile'
                    placeholder='12345678'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your Identity document number!'
                      },
                      {
                        pattern: /[0-9]{8}/,
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
