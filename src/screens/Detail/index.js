import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import { Caption, Subheading, Paragraph, Chip, Button } from 'react-native-paper'
import Loader from '../../components/Loader';
import { GlobalContext } from '../../context/GlobalContext';

function Detail({ route, navigation }) {
  const { state, detailAction, detailResetAction } = useContext(GlobalContext).DETAIL_LOGIC;
  const [episode, setEpisode] = useState(-1)

  useEffect(() => {
    if (route?.params?.id) {
      detailAction(route.params.id)
    }
    return () => {
      detailResetAction()
    }
  }, [route?.params?.id])

  const onPressEpisode = (i) => {
    setEpisode(i)
    navigation.navigate('Episode', { id: route.params.id, episode: i })
  }

  const { data, loading, error } = state
  const { height, width } = Dimensions.get("window")
  return (
    <ScrollView contentContainerStyle={style.scrollContainer}>
      <View style={style.container} >
        <Loader loading={loading} error={error}>
          <Image resizeMode={width > height ? "contain" : "cover"} style={{ height: height / 2 }} source={{ uri: data.image }} />
          <View style={style.detailContainer} >
            <Subheading style={style.title} >{data.title}</Subheading>
            <View style={style.subDetailContainer} >
              {data.relased ? <Caption style={style.caption} >{data.relased}</Caption> : null}
              {data.type ? <Caption style={style.caption} >{data.type}</Caption> : null}
              {data.status ? <Caption style={style.caption} >{data.status}</Caption> : null}
            </View>
            {data.summary ? <Paragraph style={style.paragraph} >{data.summary}</Paragraph> : null}
            {data.genres && data.genres.length ? (
            <View style={style.tagContainer} >
              {data.genres.map((item, i) => (<Chip key={i} mode="outlined" icon="movie" style={style.tag} >{item}</Chip>))}
            </View>
            ) : null}
            {data.totalepisode && parseInt(data.totalepisode) ? (
              <View style={style.episodeContainer} >
                {Array.from({ length: parseInt(data.totalepisode) }).map((item, i) => (
                  <Button onPress={() => onPressEpisode(i + 1)} labelStyle={style.episodeText} style={style.episode} key={i} mode={episode === i + 1 ? "contained" : "outlined"}>EP-{i + 1}</Button>
                ))}
              </View>
            ) : null}
          </View>
        </Loader>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1
  },
  container: {
    flex: 1,
  },
  detailContainer: {
    padding: 20
  },
  title: {
    fontWeight: 'bold'
  },
  subDetailContainer: {
    flexDirection: 'row'
  },
  caption: {
    marginRight: 15
  },
  paragraph: {
    marginVertical: 15
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginVertical: 10
  },
  tag: {
    marginRight: 10,
    marginBottom: 10
  },
  episodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginVertical: 10
  },
  episode: {
    width: 100,
    marginLeft: 10,
    marginBottom: 10,
  },
  episodeText: {
    fontWeight: 'bold',
  }
});

export default Detail
