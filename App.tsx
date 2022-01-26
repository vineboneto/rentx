import React from 'react'
import { ThemeProvider } from 'styled-components'
import { StatusBar } from 'expo-status-bar'
import AppLoading from 'expo-app-loading'
import { useFonts, Archivo_400Regular, Archivo_500Medium, Archivo_600SemiBold } from '@expo-google-fonts/archivo'
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter'
import { Home } from '@/screens'
import theme from '@/global/theme'

export default function App() {
  const [fontLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
  })

  if (!fontLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="auto" />
      <Home />
    </ThemeProvider>
  )
}
