import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'

import { Container, Title } from './styles'

type Props = RectButtonProps & {
  title: string
}

export function ConfirmButton({ title, ...props }: Props) {
  return (
    <Container {...props}>
      <Title>{title}</Title>
    </Container>
  )
}
