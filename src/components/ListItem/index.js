import React from 'react'
import { StyleSheet } from 'react-native'
import { Card } from 'react-native-paper'

export default function ListItem({ data }) {
  return (
    <Card>
      <Card.Cover style={{ height: 250, }} source={{ uri: data.image }} />
      <Card.Title titleStyle={styles.title} title={data.title} subtitle={data.episodenumber ? `Episode ${data.episodenumber}` : ''} />
    </Card>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 13
  }
})
