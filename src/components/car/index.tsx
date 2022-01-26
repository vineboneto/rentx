import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'
import GasolineSvg from '@/assets/gasoline.svg'
import { Container, Details, Brand, Name, About, Rent, Period, Price, Type, CarImage } from './styles'

type CarData = {
  brand: string
  name: string
  rent: {
    period: string
    price: number
  }
  thumbnail: string
}

type Props = RectButtonProps & {
  data: CarData
}

export function Car({ data, ...props }: Props) {
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
            <GasolineSvg />
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
