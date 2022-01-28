import React, { useState } from 'react'
import { useNetInfo } from '@react-native-community/netinfo'
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, View, Alert } from 'react-native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import * as ImagePicker from 'expo-image-picker'
import * as Yup from 'yup'
import { useTheme } from 'styled-components'
import { StatusBar } from 'expo-status-bar'
import { Feather } from '@expo/vector-icons'
import { Button, Input, InputPassword } from '@/components'
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
  const { user, signOut, updateUser } = useAuth()
  const netInfo = useNetInfo()
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit')
  const [avatar, setAvatar] = useState(user.avatar)
  const [name, setName] = useState(user.name)
  const [driverLicense, setDriverLicense] = useState(user.driver_license)

  function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
    if (netInfo.isConnected === false && optionSelected === 'passwordEdit') {
      Alert.alert('Você está offline', 'Para mudar a senha conecte-se a internet')
    } else {
      setOption(optionSelected)
    }
  }

  async function handleAvatarSelected() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    })

    if (result.cancelled) {
      return
    }

    if (result.uri) {
      setAvatar(result.uri)
    }
  }

  async function handleProfileUpdate() {
    try {
      console.log('Entrei')
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('CNH é obrigatória'),
        name: Yup.string().required('Nome é obrigatória'),
      })

      const data = { name, driverLicense }
      await schema.validate(data)
      await updateUser({
        ...user,
        avatar,
        name,
        driver_license: driverLicense,
      })

      Alert.alert('Perfil atualizado')
    } catch (err) {
      console.log(err)
      if (err instanceof Yup.ValidationError) {
        Alert.alert('Opa', err.message)
      } else {
        Alert.alert('Não foi possível atualizar o perfil')
      }
    }
  }

  async function handleSignOut() {
    Alert.alert('Tem certeza?', 'Se você sair, irá precisar de internet para conectar-se novamente', [
      {
        text: 'Cancelar',
        onPress: () => {},
      },
      {
        text: 'Confirmar',
        onPress: () => signOut(),
      },
    ])
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar style="light" />
          <Header>
            <HeaderTop>
              <View />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>
            <PhotoContainer>
              {!!avatar && <Photo source={{ uri: avatar }} />}
              <PhotoButton onPress={() => handleAvatarSelected()}>
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
                  defaultValue={name}
                  onChangeText={setName}
                />
                <Input iconName="mail" editable={false} defaultValue={user.email} />
                <Input
                  iconName="credit-card"
                  placeholder="Nome"
                  autoCapitalize="none"
                  keyboardType="numeric"
                  defaultValue={driverLicense}
                  onChangeText={setDriverLicense}
                />
              </Section>
            ) : (
              <Section>
                <InputPassword iconName="lock" placeholder="Senha atual" />
                <InputPassword iconName="lock" placeholder="Nova senha" />
                <InputPassword iconName="lock" placeholder="Repetir senha" />
              </Section>
            )}

            <Button title="Salvar alterações" onPress={handleProfileUpdate} />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
