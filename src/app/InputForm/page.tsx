'use client'
import {
  ProForm,
  ProFormRadio,
  ProFormText,
  ProFormSelect,
  ProFormDatePicker,
  ProFormTextArea
} from '@ant-design/pro-components'
import { Breadcrumb, Col, message, Row, Space } from 'antd'
import { useState } from 'react'

export default () => {
  return (
    <div className='w-full'>
      {/* <Breadcrumb
        items={[
          {
            title: 'Home'
          },
          {
            title: 'Application Center'
          },
          {
            title: 'Application List'
          },
          {
            title: 'An Application'
          }
        ]}
      /> */}
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
            rules={[{ required: true, message: 'Please select your gender!' }]}
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
                message: 'Please enter a valid Identity document number!'
              },
              {
                max: 8,
                message: 'Please enter a valid Identity document number!'
              }
            ]}
          />

          <ProFormTextArea
            name='residenceAddress'
            label='Residence Address'
            placeholder='Please input a Residence Address'
            rules={[
              { required: true, message: 'Please input a Residence Address!' }
            ]}
          />
          <ProFormTextArea
            width='md'
            name='birthAddress'
            label='Birth Address'
            placeholder='Please input a Birth Address'
            rules={[
              { required: true, message: 'Please input a Birth Address!' }
            ]}
          />
        </ProForm>
      </div>
    </div>
  )
}
