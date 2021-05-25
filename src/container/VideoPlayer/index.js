import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Button, useWindowDimensions } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';

export default function VideoPlayer({ url = 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const { height, width } = useWindowDimensions();

  const onPlaybackStatusUpdate = (status) => {
    setStatus(() => status)
  }
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={[styles.video, { height, width }]}
        source={{
          uri: url,
        }}
        shouldPlay
        useNativeControls
        resizeMode="contain"
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
  },
});