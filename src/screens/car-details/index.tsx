import React from 'react'
import { useNavigation } from '@react-navigation/native'

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
  About,
  Accessories,
  Footer,
} from './styles'

export function CarDetails() {
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  function handleScheduling() {
    navigation.navigate('Scheduling')
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleGoBack} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={['https://e7.pngegg.com/pngimages/586/647/png-clipart-lamborghini-lamborghini.png']} />
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

        <About>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam nulla itaque hic possimus aut! Quidem est,
          aliquid ratione ipsa iusto aspernatur molestias voluptatibus pariatur corporis asperiores ipsum et praesentium
          aut.
        </About>
      </Content>

      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleScheduling} />
      </Footer>
    </Container>
  )
}
