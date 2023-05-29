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
  venues: string
}
