import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Button, Text } from 'react-native-paper';

function Home({ navigation }) {
  return (
    <View style={style.container}>
      <Text>Home Screen</Text>
      <Button title="Go to details" onPress={() => navigation.navigate('Details')} mode="contained" >
        Go to details
      </Button>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home