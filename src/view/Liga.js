import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { Button, Card, Input } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import api from '../services/Api';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';


export default ({ route, navigation }) => {
  const [dataProps] = useState(route.params ? route.params : {});
  const [carregando, setCarregando] = useState(true);
  const [data, setData] = useState([]);
  const [selectedAno, setSelectedAno] = useState(2021);
  const [time, setTime] = useState({})

  const getSeasons = async () => {
    try {
      const response = await api.get(
        `/leagues/${dataProps.id}/seasons`
      );
      const json = response.data;
      setData(json.data.seasons);
    } catch (error) {
      console.error(error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    getSeasons();
  }, []);

  

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Card containerStyle={styles.containerStyle}>
            <Card.Title>{dataProps.name}</Card.Title>
            <Card.Divider />
            <View >
              <View style={styles.containerImagem}>
                <Image
                  style={styles.imagemStyle}
                  source={{ uri: dataProps.logos.light }}
                />
              </View>
              <Text>
                Data do Campeonato
              </Text>
              {carregando ? (
                <ActivityIndicator />
              ) : (
                <Picker
                  selectedValue={selectedAno}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedAno(itemValue)
                  }>
                  {data.map(({ year }, i) => {
                    return <Picker.Item key={i} label={year.toString()} value={year} />;
                  })}
                </Picker>
              )}
              
            </View>
          </Card>
        </View>
        <View>
          <Card>
            <Card.Title> Pesquisa por time</Card.Title>
            <Card.Divider />
            <View>
              <Input
                label="Nome do Time"
                placeholder="Infome o nome do time"
                leftIcon={{ type: 'font-awesome', name: 'futbol-o', color: '#332a2b' }}
                onChangeText={value => setTime(value)}
              />
              <Input
                maxLength={4}
                label="Data do Campeonato"
                placeholder="Ano"
                leftIcon={{ type: 'font-awesome', name: 'calendar', color:'#332a2b' }}
                onChangeText={value => setTime(value)}
              />
              <Button
                disabled={carregando ? true : false}
                buttonStyle={styles.buttonStyle}
                title="Buscar"
                onPress={() => navigation.navigate('TeamList', {
                  id: dataProps.id,
                  ano: selectedAno,

                })}
              />
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  containerStyle: {
    flex: 1
  },
  containerImagem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imagemStyle: {
    flex: 1,
    width: 300,
    height: 300,
  },
  buttonStyle: {
    backgroundColor: '#332a2b',
    padding: 5,
  }
})