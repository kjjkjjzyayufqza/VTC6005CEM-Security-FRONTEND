'use client'
import React, { FC, useEffect, useState } from 'react'
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Button, ConfigProvider, MenuProps } from 'antd'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'
import BookingTables from './Components/BookingTables'
import { Logout, getCurrentUser } from '@/api/staff'
import { UserModel } from '@/model'
import { useRouter } from 'next/navigation'
import AccountCreate from './Components/AccountCreate'

const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('Home', '0', <PieChartOutlined />),
  getItem('Booking Management', '1', <DesktopOutlined />)
]

const admin_items: MenuItem[] = [
  getItem('Home', '0', <PieChartOutlined />),
  getItem('Account Create', '2', <DesktopOutlined />)
]

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const [selectKey, setSelectKey] = useState<string>('0')
  const [user, setUser] = useState<UserModel>()
  const router = useRouter()
  useEffect(() => {
    getCurrentUser()
      .then(res => {
        // console.log(res.data)
        setUser(res.data)
      })
      .catch(err => {})
  }, [])

  const switchBody = (key: string) => {
    switch (key) {
      case '0':
        return <DashboardHomePage type={user?.role!} />
      case '1':
        return <BookingTables />
      case '2':
        return <AccountCreate />
    }
  }

  let body = switchBody(selectKey)

  return (
    <ConfigProvider
      theme={{
        token: {}
      }}
    >
      <StyleProvider hashPriority='high'>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={value => setCollapsed(value)}
          >
            <div className='demo-logo-vertical' />
            <Menu
              theme='dark'
              defaultSelectedKeys={[selectKey]}
              mode='inline'
              items={user?.role == 'Staff' ? items : admin_items}
              onClick={e => {
                setSelectKey(e.key)
                // console.log(e)
              }}
            />
          </Sider>
          <Layout>
            <Header
              style={{ padding: 0, background: colorBgContainer }}
              className='flex justify-end items-center'
            >
              <div className='pr-5'>{user?.name}</div>
              <div className='pr-5'>
                <Button
                  type={'primary'}
                  onClick={() => {
                    Logout()
                      .then(res => {
                        localStorage.clear()
                      })
                      .catch(err => {
                        localStorage.clear()
                      })

                    router.push('loginPage')
                  }}
                >
                  Logout
                </Button>
              </div>
            </Header>
            <Content style={{ margin: '16px' }}>{body}</Content>
            <Footer style={{ textAlign: 'center' }}>
              Dashboard @2023 Created by MOOVOO
            </Footer>
          </Layout>
        </Layout>
      </StyleProvider>
    </ConfigProvider>
  )
}

export default App

const DashboardHomePage: FC<{ type: string }> = ({ type }) => {
  let text = 'Staff'
  if (type == 'Admin') {
    text = 'Admin'
  }
  return (
    <div
      style={{
        padding: 24,
        minHeight: 360,
        background: 'white'
      }}
      className='flex justify-center items-center'
    >
      <div className='text-6xl text-center'>
        Welcome
        <br />
        <span className='text-3xl text-center'>{text}</span>
      </div>
    </div>
  )
}
