import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { CarDto } from '@/dtos'
import * as Screens from '@/screens'

const { Navigator, Screen } = createStackNavigator()

export type RootStackParamsList = {
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
  SchedulingComplete: undefined
  MyCars: undefined
}

export function StackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="SignIn">
      <Screen name="Splash" component={Screens.Splash} />
      <Screen name="SignIn" component={Screens.SignIn} />
      <Screen name="Home" component={Screens.Home} options={{ gestureEnabled: false }} />
      <Screen name="CarDetails" component={Screens.CarDetails} />
      <Screen name="Scheduling" component={Screens.Scheduling} />
      <Screen name="SchedulingComplete" component={Screens.SchedulingComplete} />
      <Screen name="SchedulingDetails" component={Screens.SchedulingDetails} />
      <Screen name="MyCars" component={Screens.MyCars} />
    </Navigator>
  )
}
