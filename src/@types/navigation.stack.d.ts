import { CarDto } from '@/dtos'
type RootStackParamsList = {
  Home: undefined
  CarDetails: {
    car: CarDto
  }
  Scheduling: {
    car: CarDto
  }
  SchedulingDetails: {
    car: CarDto
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
