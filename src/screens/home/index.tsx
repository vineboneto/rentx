import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { RFValue } from 'react-native-responsive-fontsize'
import { Car, Loading } from '@/components'
import { CarDto } from '@/dtos'
import Logo from '@/assets/logo.svg'
import api from '@/service/api'
import { Container, Header, HeaderContent, TotalCars, CarList } from './styles'

export function Home() {
  const navigation = useNavigation()
  const [cars, setCars] = useState<CarDto[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get<CarDto[]>('/cars')
        setCars(response.data)
      } catch (err) {
        console.log(err)
      }
      setLoading(false)
    }

    fetchCars()
  }, [])

  function handleCarDetails(car: CarDto) {
    navigation.navigate('CarDetails', {
      car,
    })
  }

  return (
    <Container>
      <StatusBar style="light" />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>
      {loading ? (
        <Loading />
      ) : (
        <CarList
          contentContainerStyle={{ padding: 24 }}
          showsVerticalScrollIndicator={false}
          data={cars}
          keyExtractor={(item: any) => item.id}
          renderItem={({ item }: any) => <Car data={item} onPress={() => handleCarDetails(item)} />}
        />
      )}
    </Container>
  )
}
