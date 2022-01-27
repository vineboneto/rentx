import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import * as Screens from '@/screens'

const { Navigator, Screen } = createStackNavigator()

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Screen name="Splash" component={Screens.Splash} />
      <Screen name="SignIn" component={Screens.SignIn} />
      <Screen name="SignUpFirstStep" component={Screens.SignUpFirstStep} />
      <Screen name="SignUpSecondStep" component={Screens.SignUpSecondStep} />
      <Screen name="Confirmation" component={Screens.Confirmation} />
    </Navigator>
  )
}
