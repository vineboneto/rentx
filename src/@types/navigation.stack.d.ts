import { Car } from '@/databases/model/car'
type RootStackParamsList = {
  Home: undefined
  CarDetails: {
    car: any
  }
  Scheduling: {
    car: any
  }
  SchedulingDetails: {
    car: any
    dates: string[]
  }
  MyCars: undefined
  SignUpFirstStep: undefined
  SignUpSecondStep: {
    user: {
      email: string
      name: string
      driverLicense: string
    }
  }
  SignIn: undefined
  Confirmation: {
    title: string
    message: string
    nextScreenRoute: string
  }
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamsList {}
  }
}
