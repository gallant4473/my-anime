import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Text } from 'react-native-paper'

function Empty() {
  return (
    <View style={style.container}>
      <Text>No anime found</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
});

export default Empty
