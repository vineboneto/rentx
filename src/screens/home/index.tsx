import React, { useEffect, useState } from 'react'
import { StyleSheet, BackHandler, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNetInfo } from '@react-native-community/netinfo'
import { synchronize } from '@nozbe/watermelondb/sync'
import { database } from '@/databases'
import { Car as ModelCar } from '@/databases/model/car'
import { useNavigation } from '@react-navigation/native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated'
import { StatusBar } from 'expo-status-bar'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler'

import { Car, LoadAnimation } from '@/components'
import Logo from '@/assets/logo.svg'
import api from '@/service/api'
import { Container, Header, HeaderContent, TotalCars, CarList } from './styles'

const ButtonAnimated = Animated.createAnimatedComponent(RectButton)

export function Home() {
  const theme = useTheme()
  const netInfo = useNetInfo()
  const navigation = useNavigation()
  const [cars, setCars] = useState<ModelCar[]>([])
  const [loading, setLoading] = useState(true)

  const positionY = useSharedValue(0)
  const positionX = useSharedValue(0)

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: positionX.value,
        },
        {
          translateY: positionY.value,
        },
      ],
    }
  })
  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value
      ctx.positionY = positionY.value
    },
    onActive(event, ctx: any) {
      positionX.value = event.translationX + ctx.positionX
      positionY.value = event.translationY + ctx.positionY
    },
    onEnd() {
      positionX.value = withSpring(0)
      positionY.value = withSpring(0)
    },
  })

  useEffect(() => {
    let isMounted = true

    async function fetchCars() {
      try {
        const carCollection = database.get<ModelCar>('cars')
        const cars = await carCollection.query().fetch()
        if (isMounted) {
          setCars(cars)
        }
      } catch (err) {
        console.log(err)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }
    fetchCars()
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true)
  }, [])

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`)

        const { changes, latestVersion } = response.data
        return { changes, timestamp: latestVersion }
      },
      pushChanges: async ({ changes }) => {
        try {
          const user = changes.users
          await api.post('/users/sync', user)
        } catch (err: any) {
          console.log(err.message)
        }
      },
    })
  }

  useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSynchronize()
    }
  }, [netInfo.isConnected])

  function handleCarDetails(car: ModelCar) {
    navigation.navigate('CarDetails', {
      car: car._raw,
    })
  }

  function handleOpenCarDetails() {
    navigation.navigate('MyCars')
  }

  return (
    <Container>
      <StatusBar style="light" />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>
      {loading ? (
        <LoadAnimation />
      ) : (
        <CarList
          contentContainerStyle={{ padding: 24 }}
          showsVerticalScrollIndicator={false}
          data={cars}
          keyExtractor={(item: any) => item.id}
          renderItem={({ item }: any) => <Car data={item} onPress={() => handleCarDetails(item)} />}
        />
      )}
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[myCarsButtonStyle, { position: 'absolute', bottom: 13, right: 22 }]}>
          <ButtonAnimated
            onPress={handleOpenCarDetails}
            style={[styles.button, { backgroundColor: theme.colors.main }]}
          >
            <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape} />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
