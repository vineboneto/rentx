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
}

export function StackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Screen name="Home" component={Screens.Home} />
      <Screen name="CarDetails" component={Screens.CarDetails} />
      <Screen name="Scheduling" component={Screens.Scheduling} />
      <Screen name="SchedulingComplete" component={Screens.SchedulingComplete} />
      <Screen name="SchedulingDetails" component={Screens.SchedulingDetails} />
    </Navigator>
  )
}
