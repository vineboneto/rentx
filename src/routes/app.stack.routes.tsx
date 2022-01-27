import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import * as Screens from '@/screens'

const { Navigator, Screen } = createStackNavigator()

export function AppStackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Screen name="Splash" component={Screens.Splash} />
      <Screen name="Home" component={Screens.Home} />
      <Screen name="CarDetails" component={Screens.CarDetails} />
      <Screen name="Scheduling" component={Screens.Scheduling} />
      <Screen name="SchedulingDetails" component={Screens.SchedulingDetails} />
      <Screen name="MyCars" component={Screens.MyCars} />
      <Screen name="Confirmation" component={Screens.Confirmation} />
    </Navigator>
  )
}
