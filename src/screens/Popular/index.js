import React, { useContext, useRef, useEffect } from 'react';
import {View, StyleSheet} from 'react-native';
import Loader from '../../components/Loader';
import AnimeList from '../../container/AnimeList';
import { GlobalContext } from '../../context/GlobalContext';

function Popular({ navigation }) {
  const { state, popularAction, popularMoreAction } = useContext(GlobalContext).POPULAR_LOGIC;
  const from = useRef(1)

  useEffect(() => {
    popularAction(from.current)
  }, [])

  const loadMoreRows = () => {
    if (state.next) {
      from.current = from.current + 1
      popularMoreAction(from.current)
    }
  }
  const onRefresh = () => {
    from.current = 1
    popularAction(from.current)
  }

  return (
    <View style={style.container}>
      <Loader loading={state.loading} error={state.error}>
        <AnimeList navigation={navigation} id="popular-list" data={state.data} loadMoreRows={loadMoreRows} onRefresh={onRefresh} />
      </Loader>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Popular
