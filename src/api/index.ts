import {
  SignInModel,
  SignInResponseModel,
  UserModel,
  bookingDataModel,
  customRes,
  userBooking
} from '@/model'
import axios, { AxiosResponse } from 'axios'
const instance = axios.create({
  baseURL: process.env.NODE_ENV == 'development' ? 'http://localhost:3000/' : 'https://vtc6005cem-security-backend.azurewebsites.net/',
  timeout: 10000
})

// 添加请求拦截器
instance.interceptors.request.use(
  async (config: any) => {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data
  },
  async error => {
    return Promise.reject(error)
  }
)

export function createUserBooking (data: any) {
  return instance.post('userBooking', { encryptedData: data })
}

export function getAllBookingDate (args: {
  startTime?: string
  venues?: string
}): Promise<customRes<bookingDataModel[]>> {
  return instance.get('bookingDate', { params: args })
}