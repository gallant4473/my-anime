import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Card } from 'react-native-paper'
import { GlobalContext } from '../../context/GlobalContext'

export default function ListItem({ data }) {
  const theme = useContext(GlobalContext).THEME_LOGIC
  const isThemeDark = theme.state
  return (
    <View style={[styles.container, { backgroundColor: isThemeDark ? 'rgb(30, 30, 30)' : '#fff' } ]} >
      <Card.Cover style={{ height: 250, }} source={{ uri: data.image }} />
      <Card.Title titleStyle={styles.title} title={data.title} subtitle={data.episodenumber ? `Episode ${data.episodenumber}` : ''} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.75,
    shadowOpacity: 0.24,
    borderRadius: 4,
    elevation: 1,
  },
  title: {
    fontSize: 13
  }
})
