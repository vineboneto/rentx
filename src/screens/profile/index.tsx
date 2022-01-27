import React, { useState } from 'react'
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useTheme } from 'styled-components'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { Feather } from '@expo/vector-icons'
import { BackButton, Input, InputPassword } from '@/components'
import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
} from './styles'
import { useAuth } from '@/hooks'

export function Profile() {
  const theme = useTheme()
  const { user } = useAuth()
  const navigation = useNavigation()
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit')

  function handleGoBack() {
    navigation.goBack()
  }

  function handleSignOut() {}

  function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
    setOption(optionSelected)
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar style="light" />
          <Header>
            <HeaderTop>
              <BackButton color={theme.colors.shape} onPress={handleGoBack} />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>
            <PhotoContainer>
              <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/58813966?v=4' }} />
              <PhotoButton onPress={() => {}}>
                <Feather name="camera" size={24} color={theme.colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option onPress={() => handleOptionChange('dataEdit')} active={option === 'dataEdit'}>
                <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
              </Option>
              <Option onPress={() => handleOptionChange('passwordEdit')} active={option === 'passwordEdit'}>
                <OptionTitle active={option === 'passwordEdit'}>Trocar senha</OptionTitle>
              </Option>
            </Options>

            {option === 'dataEdit' ? (
              <Section>
                <Input
                  iconName="user"
                  placeholder="Nome"
                  autoCapitalize="none"
                  autoCorrect={false}
                  defaultValue={user.name}
                />
                <Input iconName="mail" editable={false} defaultValue={user.email} />
                <Input
                  iconName="credit-card"
                  placeholder="Nome"
                  autoCapitalize="none"
                  keyboardType="numeric"
                  defaultValue={user.driver_license}
                />
              </Section>
            ) : (
              <Section>
                <InputPassword iconName="lock" placeholder="Senha atual" />
                <InputPassword iconName="lock" placeholder="Nova senha" />
                <InputPassword iconName="lock" placeholder="Repetir senha" />
              </Section>
            )}
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
