import React, { useState } from 'react'
import { TextInputProps } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components'

import { Container, InputText, IconContainer } from './styles'

type Props = TextInputProps & {
  iconName: React.ComponentProps<typeof Feather>['name']
}

export function Input({ iconName, ...props }: Props) {
  const theme = useTheme()
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  function handleInputFocused() {
    setIsFocused(true)
  }

  function handleInputBlur() {
    setIsFocused(false)
    setIsFilled(!!props.value)
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={isFocused || isFilled ? theme.colors.main : theme.colors.text_detail}
        />
      </IconContainer>
      <InputText isFocused={isFocused} onFocus={handleInputFocused} onBlur={handleInputBlur} {...props} />
    </Container>
  )
}
