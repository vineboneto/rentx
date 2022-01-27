import React, { useState } from 'react'
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { useTheme } from 'styled-components'
import * as Yup from 'yup'
import { Button, Input, InputPassword } from '@/components'
import { Container, Header, Title, SubTitle, Form, Footer } from './styles'

export function SignIn() {
  const theme = useTheme()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()

  async function handleSignIn() {
    const schema = Yup.object().shape({
      email: Yup.string().required('E-mail obrigatório').email('Digite um email válido'),
      password: Yup.string().required('Senha obrigatória'),
    })
    try {
      await schema.validate({ email, password })
      Alert.alert('Deu certo!')
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        Alert.alert('Opa', err.message)
      } else {
        Alert.alert('Erro na autenticação', 'Ocorrei ao fazer login, verifique as credenciais')
      }
    }
  }

  function handleSignUpFirstStep() {
    navigation.navigate('SignUpFirstStep')
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar style="dark" />
          <Header>
            <Title>Estamos {'\n'}quase lá</Title>
            <SubTitle>
              Faça seu login para começar{'\n'}
              uma experiência incrível.
            </SubTitle>
          </Header>
          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <InputPassword iconName="lock" placeholder="Senha" value={password} onChangeText={setPassword} />
          </Form>
          <Footer>
            <Button title="Login" onPress={handleSignIn} loading={false} />
            <Button
              title="Criar Conta gratuita"
              onPress={handleSignUpFirstStep}
              color={theme.colors.background_secondary}
              light
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
