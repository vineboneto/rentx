import React, { useRef, useState } from 'react'
import { FlatList, ViewToken } from 'react-native'
import { Bullet } from '../bullet'
import { Container, ImageIndexes, CarImageWrapper, CarImage } from './styles'

type Props = {
  imagesUrl: string[]
}

type ChangeImageProps = {
  viewableItems: ViewToken[]
  changed: ViewToken[]
}

export function ImageSlider({ imagesUrl }: Props) {
  const [imageIndex, setImageIndex] = useState(0)

  const indexChange = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!
    setImageIndex(index)
  })

  return (
    <Container>
      <ImageIndexes>
        {imagesUrl.map((_, index) => (
          <Bullet key={index.toString()} active={index === imageIndex} />
        ))}
      </ImageIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: item }} resizeMode="contain" />
          </CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 20 }}
        onViewableItemsChanged={indexChange.current}
      />
    </Container>
  )
}
