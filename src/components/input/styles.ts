import { RFValue } from 'react-native-responsive-fontsize'
import styled, { css } from 'styled-components/native'
import { TextInput } from 'react-native'

type ContainerProps = {
  isFocused: boolean
}

export const Container = styled.View`
  flex-direction: row;

  margin-bottom: 8px;
`

export const IconContainer = styled.View<ContainerProps>`
  width: 55px;
  height: 56px;

  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background_secondary};
  margin-right: 2px;

  ${(props) =>
    props.isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${props.theme.colors.main};
    `}
`

export const InputText = styled(TextInput)<ContainerProps>`
  flex: 1;
  font-family: ${(props) => props.theme.fonts.primary_400};
  background-color: ${(props) => props.theme.colors.background_secondary};
  font-size: ${RFValue(15)}px;
  color: ${(props) => props.theme.colors.text};

  padding: 0 23px;

  ${(props) =>
    props.isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${props.theme.colors.main};
    `}
`
