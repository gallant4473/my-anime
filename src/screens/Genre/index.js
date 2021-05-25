import React, { useContext, useEffect, useRef, useState } from 'react';
import {View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { IconButton, Chip, Portal, Card, Button } from 'react-native-paper';
import Loader from '../../components/Loader';
import AnimeList from '../../container/AnimeList';
import { GlobalContext } from '../../context/GlobalContext';

function Genre({ navigation }) {
  const { state, genreAction, genreMoreAction } = useContext(GlobalContext).GENRE_LOGIC;
  const { state: type, genreTypeAction } = useContext(GlobalContext).GENRE_TYPE_LOGIC
  const theme = useContext(GlobalContext).THEME_LOGIC
  const isThemeDark = theme.state
  
  const from = useRef(1)
  const modalizeRef = useRef(null);
  const genreType = useRef('popular')

  const allUrl = '/popular'
  const genreUrl = '/genre'

  useEffect(() => {
    genreAction(`${allUrl}/${from.current}`)
    genreTypeAction()
  }, [])

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const getUrl = (page = 1) => genreType.current !== 'popular' ? `${genreUrl}/${genreType.current}/${page}` : `${allUrl}/${page}`

  const onSubmit = () => {
    from.current = 1
    genreAction(getUrl(from.current))
  }

  const onChangeGenre = (type) => {
    genreType.current = type
    modalizeRef.current?.close();
    onSubmit()
  };

  const loadMoreRows = () => {
    if (state.next) {
      from.current = from.current + 1
      genreMoreAction(getUrl(from.current))
    }
  }

  const onRefresh = () => {
    from.current = 1
    genreAction(getUrl(from.current))
  }

  return (
    <View style={style.container}>
      <Card style={style.cardContainer} >
        <Card.Content style={style.cardContent} >
          <Chip>{genreType.current.toUpperCase()}</Chip>
          <IconButton disabled={type.loading} icon="filter" size={25} onPress={onOpen} />
        </Card.Content>
      </Card>
      <Loader loading={state.loading} error={state.error}>
        <AnimeList navigation={navigation} id="gerne-list" data={state.data} loadMoreRows={loadMoreRows} onRefresh={onRefresh} />
        <Portal>
          <Modalize modalHeight={(3 * Dimensions.get('window').height) / 4} ref={modalizeRef}>
            <Loader loading={type.loading} error={type.error} >
              <ScrollView style={[style.typeContainer, { backgroundColor: !isThemeDark ? '#fff' : '#272727' }]} >
                {type.data.map((item, i) => (
                  <Button onPress={() => onChangeGenre(item)} key={item} mode="outlined" style={style.typeButton} >{item.toUpperCase()}</Button>
                ))}
              </ScrollView>
            </Loader>
          </Modalize>
        </Portal>
      </Loader>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    height: 50,
    marginHorizontal: 20,
    marginTop: 20,
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 0
  },
  typeButton: {
    marginBottom: 5
  },
  typeContainer: {
    flex: 1,
    padding: 15
  }
});

export default Genre
