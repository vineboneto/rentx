import React from 'react'
import { useWindowDimensions } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { ConfirmButton } from '@/components'
import LogoSvg from '@/assets/logo_background_gray.svg'
import DoneSvg from '@/assets/done.svg'
import { Container, Content, Title, Message, Footer } from './styles'
import { useNavigation } from '@react-navigation/native'

export function SchedulingComplete() {
  const dimension = useWindowDimensions()
  const navigation = useNavigation()

  function handleHome() {
    navigation.navigate('Home')
  }

  return (
    <Container>
      <StatusBar style="light" />
      <LogoSvg width={dimension.width} />
      <Content>
        <DoneSvg width={80} height={80} />
        <Title>Carro alugado!</Title>

        <Message>
          Agora você só precisa ir {'\n'} a´te a concessionária da RENTX {'\n'} pegar o seu automóvel.
        </Message>
      </Content>
      <Footer>
        <ConfirmButton title="OK" onPress={handleHome} />
      </Footer>
    </Container>
  )
}
