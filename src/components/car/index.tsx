import React from 'react'
import { useNetInfo } from '@react-native-community/netinfo'
import { RectButtonProps } from 'react-native-gesture-handler'
import { Container, Details, Brand, Name, About, Rent, Period, Price, Type, CarImage } from './styles'
import { Car as ModelCar } from '@/databases/model/car'
import { getAccessoryIcon } from '@/utils'

type Props = RectButtonProps & {
  data: ModelCar
}

export function Car({ data, ...props }: Props) {
  const MotorIcon = getAccessoryIcon(data.fuel_type)
  const netInfo = useNetInfo()

  return (
    <Container {...props}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>
        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>R$ {netInfo.isConnected === true ? data.price : '...'}</Price>
          </Rent>

          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <CarImage
        source={{
          uri: data.thumbnail,
        }}
        resizeMode="contain"
      />
    </Container>
  )
}
