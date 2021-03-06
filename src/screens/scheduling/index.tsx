import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { DateData } from 'react-native-calendars'
import { useTheme } from 'styled-components'
import { StatusBar } from 'expo-status-bar'
import { format } from 'date-fns'

import ArrowSvg from '@/assets/arrow.svg'
import { BackButton, Button, Calendar, generateInterval, MarkedDateProps } from '@/components'
import { getPlatformDate } from '@/utils'
import { Container, Header, Title, RentalPeriod, DateInfo, DateTitle, DateValue, Footer, Content } from './styles'
import { CarDto } from '@/dtos'

type RentalPeriod = {
  startFormatted: string
  endFormatted: string
}

type Params = {
  car: CarDto
}

export function Scheduling() {
  const theme = useTheme()
  const route = useRoute()
  const { car } = route.params as Params
  const [lastSelectedDate, setLastSelectedDate] = useState<DateData>({} as DateData)
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps)
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  function handleSchedulingDetails() {
    navigation.navigate('SchedulingDetails', {
      car,
      dates: Object.keys(markedDates),
    })
  }

  function handleChangeDate(date: DateData) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate
    let end = date

    if (start.timestamp > end.timestamp) {
      start = end
      end = start
    }

    setLastSelectedDate(end)

    const interval = generateInterval(start, end)
    setMarkedDates(interval)

    const firstDate = Object.keys(interval)[0]
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1]
    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    })
  }

  return (
    <Container>
      <StatusBar style="light" />
      <Header>
        <BackButton onPress={handleGoBack} color={theme.colors.shape} />

        <Title>
          Escolha uma {'\n'}
          data de in??cio{'\n'}e fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>
          <ArrowSvg />
          <DateInfo>
            <DateTitle>AT??</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <Calendar markedDates={markedDates} ondDayPress={handleChangeDate} />
      </Content>
      <Footer>
        <Button title="Confirmar" onPress={handleSchedulingDetails} enabled={!!rentalPeriod.startFormatted} />
      </Footer>
    </Container>
  )
}
