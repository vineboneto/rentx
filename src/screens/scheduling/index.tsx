import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import { StatusBar } from 'expo-status-bar'

import ArrowSvg from '@/assets/arrow.svg'
import { BackButton, Button, Calendar } from '@/components'
import { Container, Header, Title, RentalPeriod, DateInfo, DateTitle, DateValue, Footer, Content } from './styles'

export function Scheduling() {
  const theme = useTheme()
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  function handleSchedulingDetails() {
    navigation.navigate('SchedulingDetails')
  }

  return (
    <Container>
      <StatusBar style="light" />
      <Header>
        <BackButton onPress={handleGoBack} color={theme.colors.shape} />

        <Title>
          Escolha uma {'\n'}
          data de início{'\n'}e fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={false}></DateValue>
          </DateInfo>
          <ArrowSvg />
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={false}></DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <Calendar />
      </Content>
      <Footer>
        <Button title="Confirmar" onPress={handleSchedulingDetails} />
      </Footer>
    </Container>
  )
}
