import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { useTheme } from 'styled-components'

import { BackButton, Car, Loading } from '@/components'
import { CarDto } from '@/dtos'
import api from '@/service/api'
import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles'

type CarProps = {
  car: CarDto
  id: string
  user_id: string
  startDate: string
  endDate: string
}

export function MyCars() {
  const theme = useTheme()
  const [cars, setCars] = useState<CarProps[]>([])
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        setLoading(true)
        const response = await api.get('schedules_byuser', {
          params: {
            user_id: 1,
          },
        })
        setCars(response.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchCars()
  }, [])

  return (
    <Container>
      <StatusBar style="light" />
      <Header>
        <BackButton onPress={handleGoBack} color={theme.colors.shape} />

        <Title>Seus agendamento, {'\n'}estão aqui.</Title>

        <SubTitle>Conforto, segurança e praticidade</SubTitle>
      </Header>

      <Content>
        <Appointments>
          <AppointmentsTitle>Agendamento feitos</AppointmentsTitle>
          <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
        </Appointments>

        {loading ? (
          <Loading />
        ) : (
          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        )}
      </Content>
    </Container>
  )
}
