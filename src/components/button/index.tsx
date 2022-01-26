import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'

import { Container, Title } from './styles'

type Props = RectButtonProps & {
  title: string
  color?: string
  onPress: () => void
}

export function Button({ title, color, onPress, ...rest }: Props) {
  return (
    <Container color={color} onPress={onPress} {...rest}>
      <Title>{title}</Title>
    </Container>
  )
}
