import React, { useContext } from 'react'
import { Appbar, Switch } from 'react-native-paper';
import { GlobalContext } from '../../context/GlobalContext';

function CustomNavigationBar({ navigation, previous }) {
  const { state, themeAction } = useContext(GlobalContext).THEME_LOGIC;
  const isThemeDark = state
  return (
    <Appbar.Header>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="My Anime" />
        <Switch
          color="#fff"
          value={isThemeDark}
          onValueChange={() => themeAction()}
        />
    </Appbar.Header>
  );
}

export default CustomNavigationBar