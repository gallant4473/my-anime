import React, { useContext, useEffect, useRef, useState } from 'react';
import {View, StyleSheet} from 'react-native';
import { Searchbar } from 'react-native-paper';
import Loader from '../../components/Loader';
import AnimeList from '../../container/AnimeList';
import { GlobalContext } from '../../context/GlobalContext';

function Search({ navigation }) {
  const { state, searchAction, searchMoreAction } = useContext(GlobalContext).SEARCH_LOGIC;
  const [searchQuery, setSearchQuery] = useState('');
  
  const from = useRef(1)

  const allUrl = '/popular'
  const searchUrl = '/search'

  useEffect(() => {
    searchAction(`${allUrl}/${from.current}`)
  }, [])

  const getUrl = (page = 1) => searchQuery.length ? `${searchUrl}/${searchQuery}/${page}` : `${allUrl}/${page}`

  const onChangeSearch = query => setSearchQuery(query);

  const loadMoreRows = () => {
    if (state.next) {
      from.current = from.current + 1
      searchMoreAction(getUrl(from.current))
    }
  }

  const onRefresh = () => {
    from.current = 1
    searchAction(getUrl(from.current))
  }

  const onSubmit = () => {
    from.current = 1
    searchAction(getUrl(from.current))
  }

  return (
    <View style={style.container}>
      <View style={style.searchBarContainer} >
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          onIconPress={onSubmit}
          onSubmitEditing={onSubmit}
        />
      </View>
      <Loader loading={state.loading} error={state.error}>
        <AnimeList navigation={navigation} id="search-list" data={state.data} loadMoreRows={loadMoreRows} onRefresh={onRefresh} />
      </Loader>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    marginHorizontal: 20,
    marginTop: 20
  }
});

export default Search
