import React from 'react'
import { ActivityIndicator, TouchableOpacityProps } from 'react-native'
import { RectButtonProps } from 'react-native-gesture-handler'
import { useTheme } from 'styled-components'

import { Container, Title } from './styles'

type Props = RectButtonProps & {
  title: string
  color?: string
  loading?: boolean
  light?: boolean
  enabled?: boolean
}

export function Button({ title, color, enabled = true, loading = false, light = false, ...props }: Props) {
  const theme = useTheme()
  return (
    <Container
      color={color}
      style={{ opacity: enabled === false || loading === true ? 0.5 : 1 }}
      enabled={enabled}
      {...props}
    >
      {loading ? <ActivityIndicator color={theme.colors.shape} /> : <Title light={light}>{title}</Title>}
    </Container>
  )
}
