import React, { useState } from 'react'
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import { useTheme } from 'styled-components'
import { useNavigation, useRoute } from '@react-navigation/native'

import { BackButton, Bullet, Button, InputPassword } from '@/components'
import { Container, Header, Steps, Title, SubTitle, Form, FormTitle } from './styles'

type Params = {
  user: {
    name: string
    cnh: string
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

  function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert('Informe a senha e a confirmação dela')
    }

    if (password !== passwordConfirm) {
      return Alert.alert('As senhas não são iguais')
    }

    navigation.navigate('Confirmation', {
      nextScreenRoute: 'SignIn',
      title: 'Conta criada!',
      message: 'Agora é so fazer login\ne aproveitar',
    })
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
