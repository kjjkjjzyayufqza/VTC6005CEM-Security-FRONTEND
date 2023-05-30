import { getAllUserBooking } from '@/api/staff'
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable, TableDropdown } from '@ant-design/pro-components'
import { Button, Dropdown, Space, Tag } from 'antd'
import { useRef, useState } from 'react'

type GithubIssueItem = {
  id: string
  nameEn: string
  nameCn: string
  gender: string
  mobile: string
}

const columns: ProColumns<GithubIssueItem>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48
  },
  {
    title: 'English Name',
    dataIndex: 'nameEn',
    copyable: true,
    ellipsis: true
  },
  {
    title: 'Chinese Name',
    dataIndex: 'nameCn',
    copyable: true,
    ellipsis: true
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    copyable: true,
    ellipsis: true
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile',
    copyable: true,
    ellipsis: true
  },
  {
    title: 'Action',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [<Button key={'abc'}>Print</Button>]
  }
]

export default () => {
  const actionRef = useRef<ActionType>()
  const [dataSource, setDataSource] = useState<GithubIssueItem[]>([])

  const getData = async ({ mobile }: any) => {
    let _data: GithubIssueItem[] = []
    await getAllUserBooking({ mobile: mobile })
      .then(res => {
        // console.log(res.data)
        res.data.map((e, i) => {
          _data.push({
            id: e._id,
            nameCn: e.nameCn,
            nameEn: e.nameEn,
            gender: e.gender,
            mobile: e.mobile
          })
        })
        setDataSource(_data)
      })
      .catch(err => {})
  }

  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      params={{}}
      dataSource={dataSource}
      request={async (params, sort, filter) => {
        // console.log(sort, filter, params)
        let _data: GithubIssueItem[] = []
        await getData({})
        // console.log(_data)
        return {
          data: dataSource,
          // success 请返回 true，
          // 不然 table 会停止解析数据，即使有数据
          success: true,
          // 不传会使用 data 的长度，如果是分页一定要传
          total: _data.length
        }
      }}
      //   editable={{
      //     type: 'multiple'
      //   }}
      //   columnsState={{
      //     persistenceKey: 'pro-table-singe-demos',
      //     persistenceType: 'localStorage',
      //     onChange (value) {
      //       console.log('value: ', value)
      //     }
      //   }}
      rowKey='id'
      search={false}
      toolbar={{
        search: {
          onSearch: (value: string) => {
            getData({ mobile: value })
          }
        },
        filter: null
      }}
      options={{
        setting: {
          listsHeight: 400
        }
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime]
            }
          }
          return values
        }
      }}
      pagination={{
        pageSize: 10,
        onChange: page => {
          // console.log(page)
        }
      }}
      dateFormatter='string'
      headerTitle='Booking List'
      toolBarRender={() => []}
    />
  )
}
