import React from 'react'
import { useWindowDimensions } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useNavigation, useRoute } from '@react-navigation/native'

import { ConfirmButton } from '@/components'
import LogoSvg from '@/assets/logo_background_gray.svg'
import DoneSvg from '@/assets/done.svg'
import { Container, Content, Title, Message, Footer } from './styles'

type Params = {
  title: string
  message: string
  nextScreenRoute: string
}

export function Confirmation() {
  const dimension = useWindowDimensions()
  const navigation = useNavigation<any>()
  const route = useRoute()
  const { title, message, nextScreenRoute } = route.params as Params

  function handleNavigation() {
    navigation.navigate(nextScreenRoute)
  }
  return (
    <Container>
      <StatusBar style="light" />
      <LogoSvg width={dimension.width} />
      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>

        <Message>{message}</Message>
      </Content>
      <Footer>
        <ConfirmButton title="OK" onPress={handleNavigation} />
      </Footer>
    </Container>
  )
}
