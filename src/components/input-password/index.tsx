import React, { useState } from 'react'
import { TextInputProps } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import { BorderlessButton } from 'react-native-gesture-handler'

import { Container, InputText, IconContainer } from './styles'

type Props = TextInputProps & {
  iconName: React.ComponentProps<typeof Feather>['name']
}

export function InputPassword({ iconName, ...props }: Props) {
  const theme = useTheme()
  const [isPasswordVisibility, setIsPasswordVisibility] = useState(true)
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  function handlePasswordVisibilityChange() {
    setIsPasswordVisibility((old) => !old)
  }

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
      <InputText
        {...props}
        isFocused={isFocused}
        secureTextEntry={isPasswordVisibility}
        onBlur={handleInputBlur}
        onFocus={handleInputFocused}
      />

      <BorderlessButton onPress={handlePasswordVisibilityChange}>
        <IconContainer isFocused={isFocused}>
          <Feather name={isPasswordVisibility ? 'eye' : 'eye-off'} size={24} color={theme.colors.text_detail} />
        </IconContainer>
      </BorderlessButton>
    </Container>
  )
}
