export enum GenderType {
  Male = 'Male',
  Female = 'Female'
}

export enum vaccineBrand {
  BioNtech = 'BioNtech',
  Sinovac = 'Sinovac'
}

export interface customRes<T> {
  data: T
  message: boolean
  statusCode: number
}

export interface userBooking {
  _id: string
  nameEn: string
  nameCn: string
  gender: GenderType
  identityDN: string
  mobile: string
  birthDate: string
  address: string
  birthplace: string
  vaccineBrand: vaccineBrand
  bookDate: {
    id: string
  }
}

export interface CreateUserBooking {
  nameEn: string
  nameCn: string
  gender: GenderType
  identityDN: string
  mobile: string
  birthDate: string
  address: string
  birthplace: string
  vaccineBrand: vaccineBrand
  bookDate: {
    id: string
  }
}

export interface bookingDataModel {
  _id: string
  startTime: string
  endTime: string
  venues: string
}

export interface SignInModel {
  email: string
  password: string
}

export interface SignInResponseModel {
  accessToken: string
  refreshToken: string
}

export interface SignUpModel {
  name: string
  email: string
  password: string
  role: 'Staff'
}

export interface UserModel {
  _id: string
  name: string
  email: string
  role: string
}

export interface CreateUserModel {
  name: string
  email: string
  password: string
  role: string
}
