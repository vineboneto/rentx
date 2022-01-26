import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'
import { BackButton, ImageSlider, Accessory, Button } from '@/components'
import SpeedSvg from '@/assets/speed.svg'
import AccelerationSvg from '@/assets/acceleration.svg'
import ForceSvg from '@/assets/force.svg'
import GasolineSvg from '@/assets/gasoline.svg'
import ExchangeSvg from '@/assets/exchange.svg'
import PeopleSvg from '@/assets/people.svg'
import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles'

export function SchedulingDetails() {
  const theme = useTheme()

  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  function handleSchedulingComplete() {
    navigation.navigate('SchedulingComplete')
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleGoBack} />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrl={[
            'data:image/jpeg;base64,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',
          ]}
        />
      </CarImages>

      <Content contentContainerStyle={{ padding: 24, alignItems: 'center' }} showsVerticalScrollIndicator={false}>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>AO DIA</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>
        <Accessories>
          <Accessory icon={SpeedSvg} name="380km/h" />
          <Accessory icon={AccelerationSvg} name="3.2s" />
          <Accessory icon={ForceSvg} name="800 HP" />
          <Accessory icon={GasolineSvg} name="Gasolina" />
          <Accessory icon={ExchangeSvg} name="Auto" />
          <Accessory icon={PeopleSvg} name="2 pessoas" />
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather name="calendar" size={RFValue(24)} color={theme.colors.shape} />
          </CalendarIcon>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>18/06/2021</DateValue>
          </DateInfo>

          <Feather name="chevron-right" size={RFValue(10)} color={theme.colors.text} />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>18/06/2021</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ 2,900</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button title="Alugar agora" color={theme.colors.success} onPress={handleSchedulingComplete} />
      </Footer>
    </Container>
  )
}
