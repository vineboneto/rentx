import React, { useState } from 'react'
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import { useTheme } from 'styled-components'
import { useNavigation, useRoute } from '@react-navigation/native'

import { BackButton, Bullet, Button, InputPassword } from '@/components'
import api from '@/service/api'
import { Container, Header, Steps, Title, SubTitle, Form, FormTitle } from './styles'

type Params = {
  user: {
    name: string
    driverLicense: string
    email: string
  }
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const theme = useTheme()
  const route = useRoute()
  const { user } = route.params as Params

  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert('Informe a senha e a confirmação dela')
    }

    if (password !== passwordConfirm) {
      return Alert.alert('As senhas não são iguais')
    }

    console.log(user)

    try {
      const response = await api.post('/users', {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password,
      })
      console.log('response')
      console.log(response.data)
      navigation.navigate('Confirmation', {
        nextScreenRoute: 'SignIn',
        title: 'Conta criada!',
        message: 'Agora é so fazer login\ne aproveitar',
      })
    } catch (err) {
      Alert.alert('Opa', 'Não foi possível cadastrar')
    }
  }

  return (
    <KeyboardAvoidingView behavior="position">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleGoBack} />
            <Steps>
              <Bullet />
              <Bullet active />
            </Steps>
          </Header>

          <Title>Crie sua{'\n'}conta</Title>
          <SubTitle>Faça o seu cadastro de{'\n'}forma rápida</SubTitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>
            <InputPassword iconName="lock" placeholder="Senha" onChangeText={setPassword} value={password} />
            <InputPassword
              iconName="lock"
              placeholder="Repetir Senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>

          <Button title="Cadastrar" color={theme.colors.success} onPress={handleRegister} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
