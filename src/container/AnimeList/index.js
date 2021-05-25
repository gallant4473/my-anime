import React, { useEffect } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native'
import Empty from '../../components/Empty'
import ListItem from '../../components/ListItem'

export default function AnimeList({ data, loadMoreRows, onRefresh, id, navigation }) {
  useEffect(() => {
    return () => {
      console.log(id, 'unmounted')
    }
  }, [])
  const onPress = (item) => {
    navigation.navigate(item.episodenumber ? 'Episode' : 'Detail', { id: item.id, ...(item.episodenumber ? { episode: item.episodenumber } : {}) })
  }
  return (
    <FlatList
      ListEmptyComponent={<Empty />}
      refreshing={false}
      onRefresh={onRefresh}
      style={{ flex: 1 }}
      contentContainerStyle={styles.container}
      columnWrapperStyle={styles.wrapper}
      onEndReached={loadMoreRows}
      onEndReachedThreshold={0.95}
      data={data}
      numColumns={4}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card} onPressIn={() => Platform.OS === 'web' ? onPress(item) : null} onPress={() => Platform.OS !== 'web' ? onPress(item) : null} >
          <ListItem data={item} />
        </TouchableOpacity>
      )}
      keyExtractor={(item, i) => `${id}-${i}`}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  card: {
    margin: 10,
    width: Dimensions.get('window').width > 460 ? 420 : Dimensions.get('window').width - 40,
  },
})