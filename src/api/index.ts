import { bookingDataModel, customRes, userBooking } from '@/model'
import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 10000
})

export function createUserBooking (data: any) {
  return instance.post('userBooking', { encryptedData: data })
}

export function getAllBookingDate (args: {
  startTime?: string
  venues?: string
}): Promise<AxiosResponse<customRes<bookingDataModel[]>>> {
  return instance.get('bookingDate', { params: args })
}
