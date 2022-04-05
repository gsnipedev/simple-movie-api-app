import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInpu,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Linking,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {FilmCard} from './screen/component/components';
import {render} from 'react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod';

const App = () => {
  const [filmData, setFilmData] = useState([]);
  const [judul, getJudul] = useState('spiderman');
  const [preJudul, getPreJudul] = useState('');
  const tesdata = [
    {nomor: 1, nama: 'Dik'},
    {nomor: 2, nama: 'Dang'},
  ];
  const [isLoading, setLoading] = useState(true);
  const [isTapped, setTapped] = useState(false);

  async function getData(sQuery) {
    try {
      setLoading(true);
      const response = await fetch(
        `http://www.omdbapi.com/?s=${sQuery}&apiKey=1808565e`,
      );
      const data = await response.json();
      if (data.Response == 'False') {
        alert('Movie not found');
        return;
      }
      setFilmData(data.Search);
      //console.log(filmData);
    } catch (error) {
      console.log('ERROR', error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getData(judul);
    return () => {
      setLoading(true);
    };
  }, [judul]);

  function carifilm() {
    setLoading(true);
    try {
      getJudul(preJudul);
    } catch (error) {
      getJudul('king');
    } finally {
      setLoading(false);
    }
  }

  function printCard() {
    return <Text>Hello Worlafafasfsafd</Text>;
  }
  return (
    <View style={styles.mainView}>
      <View style={styles.topView}>
        <Text>{preJudul}</Text>

        <TextInput
          placeholder="Cari Judul Film"
          onChangeText={typing => {
            /* setLoading(true); */
            getPreJudul(typing);
          }}></TextInput>
        <Button title="cari" onPress={carifilm}></Button>
      </View>
      <View style={styles.bottomView}>
        <ScrollView style={styles.scrView} horizontal={true}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <View style={styles.cardCont}>
              {/* <Text>{filmData[1].Title}</Text>
            <Text>{filmData[1].Poster}</Text> */}
              {filmData.map((item, index) => (
                <FilmCard imgUri={item.Poster} filmTitle={item.Title} />
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingHorizontal: 44,
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    justifyContent: 'space-between',
  },
  scrView: {},
  cardCont: {
    display: 'flex',
    flexDirection: 'row',
  },
  topView: {
    width: '100%',
    height: '20%',
  },
  bottomView: {
    height: 370,
  },
});

export default App;
