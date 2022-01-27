import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { RectButton } from 'react-native-gesture-handler'

type ContainerProps = {
  color?: string
}

type TitleProps = {
  light: boolean
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 100%;

  padding: 19px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.color ? props.color : props.theme.colors.main)};
  margin-bottom: 8px;
`

export const Title = styled.Text<TitleProps>`
  font-family: ${(props) => props.theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
  color: ${(props) => (props.light ? props.theme.colors.header : props.theme.colors.shape)};
`
