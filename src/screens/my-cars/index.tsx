import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { FlatList } from 'react-native'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { useTheme } from 'styled-components'
import { format, parseISO } from 'date-fns'
import { BackButton, Car, LoadAnimation } from '@/components'
import { Car as ModelCar } from '@/databases/model/car'
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

type DataProps = {
  id: string
  car: ModelCar
  start_date: string
  end_date: string
}

export function MyCars() {
  const theme = useTheme()
  const [cars, setCars] = useState<DataProps[]>([])
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()
  const screenIsFocus = useIsFocused()

  function handleGoBack() {
    navigation.goBack()
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        setLoading(true)
        const response = await api.get('/rentals', {
          params: {
            user_id: 1,
          },
        })
        const dataFormatted = response.data.map((data: DataProps) => ({
          ...data,
          start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
          end_date: format(parseISO(data.end_date), 'dd/MM/yyyy'),
        }))

        setCars(dataFormatted)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchCars()
  }, [screenIsFocus])

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
          <LoadAnimation />
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
                    <CarFooterDate>{item.start_date}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.end_date}</CarFooterDate>
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
