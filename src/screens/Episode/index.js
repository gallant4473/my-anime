import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { lockAsync, OrientationLock } from 'expo-screen-orientation';
import Loader from '../../components/Loader';
import VideoPlayer from '../../container/VideoPlayer';
import { GlobalContext } from '../../context/GlobalContext';

function Episode({ route }) {
  const { state, episodeAction, episodeResetAction } = useContext(GlobalContext).EPISODE_LOGIC;
  useEffect(() => {
    if(Platform.OS !== 'web') {
      const changeScreenOrientation = async () => {
        await lockAsync(OrientationLock.LANDSCAPE);
      }
      changeScreenOrientation()
      return async () => {
        await lockAsync(OrientationLock.PORTRAIT_UP);
      }
    }
  }, [])
  useEffect(() => {
    if (route?.params?.id && route?.params?.episode) {
      episodeAction(`${route.params.id}/${route?.params?.episode}`)
    }
    return () => {
      episodeResetAction()
    }
  }, [route?.params?.id, route?.params?.episode])
  const { data, loading, error } = state
  const link = data?.links && Array.isArray(data.links) && data.links.length ? data.links[0] : {}
  return (
    <SafeAreaView style={style.container}>
      <Loader loading={loading} error={error}>
        {link.src ? <VideoPlayer url={link.src} /> : null}
      </Loader>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Episode
