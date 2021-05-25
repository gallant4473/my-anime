import React, { useContext } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native'
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import * as Linking from 'expo-linking';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import Detail from './screens/Detail';
import CustomNavigationBar from './container/CustomNavigationBar';
import Latest from './screens/Latest';
import Search from './screens/Search';
import Genre from './screens/Genre';
import  { GlobalContext } from './context/GlobalContext';
import Episode from './screens/Episode';

const Stack = createStackNavigator();
const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();


const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: '#d50000',
    text: '#000'
  },
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    primary: '#d50000',
    text: '#fff'
  },
};


const prefix = Linking.createURL('/');

export default function Main() {
  const { state } = useContext(GlobalContext).THEME_LOGIC;
  const isThemeDark = state
  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const linking = {
    prefixes: [prefix, 'https://gallant4473.github.io'],
    config: {
      screens: {
        Main: {
          screens: {
            Dashboard: {
              screens: {
                Latest: 'my-anime/latest',
                Genre: 'my-anime/genre',
                Search: 'my-anime/search'
              }
            },
            Detail: 'my-anime/detail/:id',
          }
        },
        Episode: 'my-anime/episode/:id/:episode'
      }
    }
  };
  return (
    <PaperProvider theme={theme} >
      <NavigationContainer linking={linking} theme={theme} >
        <View style={styles.container} >
          <RootStack.Navigator mode="modal">
            <RootStack.Screen
              name="Main"
              options={{ headerShown: false }}
            >
              {() => (
                <Stack.Navigator
                  initialRouteName="Dashboard" 
                  screenOptions={{
                    header: (props) => <CustomNavigationBar {...props} />,
                  }}
                >
                  <Stack.Screen name="Dashboard" >
                    {() => (
                      <Tab.Navigator backBehavior="initialRoute" initialRouteName="Latest">
                        <Tab.Screen component={Latest} name="Latest" options={{ title: "RECENT RELEASE", tabBarIcon: ({ color }) => <MaterialIcons name="new-releases" size={24} color={color} /> }} />
                        <Tab.Screen name="Genre" component={Genre} options={{ title: "GENRE", tabBarIcon: ({ color }) => <MaterialIcons name="movie-filter" size={24} color={color} /> }} />
                        <Tab.Screen name="Search" component={Search} options={{ title: "SEARCH", tabBarIcon: ({ color }) => <MaterialCommunityIcons name="movie-search" size={24} color={color} /> }} />
                      </Tab.Navigator>
                    )}
                  </Stack.Screen>
                  <Stack.Screen name="Detail" component={Detail} />
                </Stack.Navigator>
              )}
            </RootStack.Screen>
            <RootStack.Screen options={{ headerShown: false }} name="Episode" component={Episode} />
          </RootStack.Navigator>
          <StatusBar />
        </View>
      </NavigationContainer>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
