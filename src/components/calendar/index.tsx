import React from 'react'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import { Calendar as CustomCalendar, DateData, LocaleConfig } from 'react-native-calendars'
import { generateInterval } from './generate-interval'
import { ptBr } from './locale-config'

LocaleConfig.locales['pt-br'] = ptBr
LocaleConfig.defaultLocale = 'pt-br'

type MarkedDateProps = {
  [date: string]: {
    color: string
    textColor: string
    disabled?: boolean
    disableTouchEvent?: boolean
  }
}

type CalendarProps = {
  markedDates: MarkedDateProps
  ondDayPress: (date: DateData) => void
}

function Calendar({ markedDates, ondDayPress }: CalendarProps) {
  const theme = useTheme()

  return (
    <CustomCalendar
      renderArrow={(direction) => (
        <Feather size={24} color={theme.colors.shape} name={direction === 'left' ? 'chevron-left' : 'chevron-right'} />
      )}
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        padding: 10,
        marginBottom: 10,
      }}
      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textDayHeaderFontSize: 10,
        textMonthFontSize: 20,
        textMonthFontFamily: theme.fonts.secondary_600,
        monthTextColor: theme.colors.title,
        arrowStyle: {
          marginHorizontal: -15,
        },
      }}
      firstDay={1}
      minDate={new Date().toISOString()}
      markingType="period"
      markedDates={markedDates}
      onDayPress={ondDayPress}
    />
  )
}

export { Calendar, generateInterval, MarkedDateProps }
