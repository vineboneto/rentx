import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { RFValue } from 'react-native-responsive-fontsize'

import { Car } from '@/components'
import Logo from '@/assets/logo.svg'
import { Container, Header, HeaderContent, TotalCars, CarList } from './styles'
import { useNavigation } from '@react-navigation/native'

const data = [
  {
    id: '1',
    thumbnail: 'https://e7.pngegg.com/pngimages/586/647/png-clipart-lamborghini-lamborghini.png',
    name: 'Coupe',
    brand: 'audi',
    rent: {
      price: 150,
      period: '1 dia',
    },
  },
  {
    id: '2',
    thumbnail: 'https://e7.pngegg.com/pngimages/586/647/png-clipart-lamborghini-lamborghini.png',
    name: 'Coupe',
    brand: 'audi',
    rent: {
      price: 150,
      period: '1 dia',
    },
  },
]

export function Home() {
  const navigation = useNavigation()

  function handleCarDetails() {
    navigation.navigate('CarDetails')
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
      <CarList
        contentContainerStyle={{ padding: 24 }}
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => <Car data={item} onPress={() => handleCarDetails()} />}
      />
    </Container>
  )
}
