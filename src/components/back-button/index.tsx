import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { BorderlessButtonProps } from 'react-native-gesture-handler'
import { useTheme } from 'styled-components'

import { Container } from './styles'

type Props = BorderlessButtonProps & {
  color?: string
}

export function BackButton({ color, ...props }: Props) {
  const theme = useTheme()

  return (
    <Container {...props}>
      <MaterialIcons name="chevron-left" size={24} color={color || theme.colors.text} />
    </Container>
  )
}
