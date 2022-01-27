import React, { useState } from 'react'
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as Yup from 'yup'

import { BackButton, Bullet, Button, Input } from '@/components'
import { Container, Header, Steps, Title, SubTitle, Form, FormTitle } from './styles'

export function SignUpFirstStep() {
  const navigation = useNavigation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [driverLicense, setDriverLicense] = useState('')

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('CNH é obrigatória'),
        email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
        name: Yup.string().required('Nome é obrigatório'),
      })
      const data = { name, email, driverLicense }
      await schema.validate(data)
      navigation.navigate('SignUpSecondStep', { user: data })
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        Alert.alert(err.message)
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="position">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleGoBack} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>Crie sua{'\n'}conta</Title>
          <SubTitle>Faça o seu cadastro de{'\n'}forma rápida</SubTitle>

          <Form>
            <FormTitle>1. Dados</FormTitle>
            <Input iconName="user" placeholder="Nome" onChangeText={setName} value={name} />
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              onChangeText={setDriverLicense}
              value={driverLicense}
            />
          </Form>

          <Button title="Próximo" onPress={handleNextStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
