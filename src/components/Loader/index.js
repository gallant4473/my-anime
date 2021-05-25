import React from 'react'
import { View, StyleSheet, } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
  }
})

const Loader = ({ loading = false, error = false, children = null }) => {
  if (loading) {
    return (
      <View style={style.container} >
        <ActivityIndicator size="large" color="green" />
      </View>
    )
  } else if (error) {
    return (
      <View style={style.container} >
        <Text>Something went wrong</Text>
      </View>
    )
  }
  return children
}

export default Loader