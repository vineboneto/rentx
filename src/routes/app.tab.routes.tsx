import React from 'react'
import { useTheme } from 'styled-components'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as Screens from '@/screens'
import { AppStackRoutes } from './app.stack.routes'
import HomeSvg from '@/assets/home.svg'
import CarSvg from '@/assets/car.svg'
import PeopleSvg from '@/assets/people.svg'
import { Platform } from 'react-native'

const { Navigator, Screen } = createBottomTabNavigator()

export function AppTabRoutes() {
  const theme = useTheme()

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.text_detail,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 78,
          backgroundColor: theme.colors.background_primary,
        },
      }}
      initialRouteName="HomeStack"
    >
      <Screen
        name="HomeStack"
        component={AppStackRoutes}
        options={{ tabBarIcon: ({ color }) => <HomeSvg fill={color} width={24} height={24} /> }}
      />
      <Screen
        name="MyCars"
        component={Screens.MyCars}
        options={{ tabBarIcon: ({ color }) => <CarSvg fill={color} width={24} height={24} /> }}
      />
      <Screen
        name="Profile"
        component={Screens.Profile}
        options={{ tabBarIcon: ({ color }) => <PeopleSvg fill={color} width={24} height={24} /> }}
      />
    </Navigator>
  )
}
