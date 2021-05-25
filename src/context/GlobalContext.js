import React, { createContext, useReducer, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Snackbar, Text } from 'react-native-paper'
import { LATEST_LOGIC } from '../screens/Latest/logic'
import { POPULAR_LOGIC } from '../screens/Popular/logic'
import { SEARCH_LOGIC } from '../screens/Search/logic'
import { GENRE_LOGIC, GENRE_TYPE_LOGIC } from '../screens/Genre/logic'
import { DETAIL_LOGIC } from '../screens/Detail/logic'
import { THEME_LOGIC } from '../container/CustomNavigationBar/logic'
import { EPISODE_LOGIC } from '../screens/Episode/logic'

export const GlobalContext = createContext({})

const intermediate = {
  THEME_LOGIC,
  LATEST_LOGIC,
  POPULAR_LOGIC,
  SEARCH_LOGIC,
  GENRE_LOGIC,
  GENRE_TYPE_LOGIC,
  DETAIL_LOGIC,
  EPISODE_LOGIC
}

function GlobalProvider({ children }) {
  const [message, setMessage] = useState('')
  const data = {}
  const applyMiddleware = dispatch => action => {
    if (action.successMessage) {
      setMessage(action.successMessage)
    }
    dispatch(action)
  }
  Object.keys(intermediate).forEach((item) => {
    const [state, dispatch] = useReducer(intermediate[item].reducer, intermediate[item].initialState);
    const boundActions = {}
    const enhancedDispatch = applyMiddleware(dispatch)
    for (let key in intermediate[item].actions) {
      boundActions[key] = intermediate[item].actions[key](enhancedDispatch);
    }
    data[item] = {
      state,
      ...boundActions
    }
  })
  return (
    <GlobalContext.Provider value={data} >
      <View style={styles.container}>
        {children}
        <Snackbar
          style={styles.snackbar}
          duration={3000}
          visible={!!message}
          onDismiss={() => setMessage('')}
        >
          <Text style={styles.messageText} >{message}</Text>
        </Snackbar>
      </View>
    </GlobalContext.Provider>
  )
}

const styles = StyleSheet.create({
  messageText: {
    color: '#fff'
  },
  container: {
    flex: 1,
  },
  snackbar: {
  }
})

export default GlobalProvider

