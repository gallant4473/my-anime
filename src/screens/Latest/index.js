import React, { useContext, useEffect, useRef } from 'react';
import {View, StyleSheet} from 'react-native';
import Loader from '../../components/Loader';
import AnimeList from '../../container/AnimeList';
import { GlobalContext } from '../../context/GlobalContext';

function Latest({ navigation }) {
  const { state, latestAction, latestMoreAction } = useContext(GlobalContext).LATEST_LOGIC;
  const from = useRef(1)

  useEffect(() => {
    latestAction(from.current)
    return () => {
      console.log("latest unmounted")
    }
  }, [])

  const loadMoreRows = () => {
    if (state.next) {
      from.current = from.current + 1
      latestMoreAction(from.current)
    }
  }

  const onRefresh = () => {
    from.current = 1
    latestAction(from.current)
  }

  return (
    <View style={style.container}>
      <Loader loading={state.loading} error={state.error}>
        <AnimeList navigation={navigation} id="latest-list" data={state.data} loadMoreRows={loadMoreRows} onRefresh={onRefresh} />
      </Loader>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Latest
