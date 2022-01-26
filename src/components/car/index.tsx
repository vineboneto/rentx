import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'
import GasolineSvg from '@/assets/gasoline.svg'
import { Container, Details, Brand, Name, About, Rent, Period, Price, Type, CarImage } from './styles'
import { CarDto } from '@/dtos'
import { getAccessoryIcon } from '@/utils'

type Props = RectButtonProps & {
  data: CarDto
}

export function Car({ data, ...props }: Props) {
  const MotorIcon = getAccessoryIcon(data.fuel_type)

  return (
    <Container {...props}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>
        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{`R$ ${data.rent.price}`}</Price>
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
