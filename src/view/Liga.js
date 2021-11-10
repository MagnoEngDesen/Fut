import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, Image} from 'react-native';
import { Button, Card} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import api from '../services/Api';


export default ({route, navigation}) => {
    const [dataProps] = useState(route.params ? route.params : {});
    const [carregando, setCarregando] = useState(true);
    const [data, setData] = useState([]);
    const [selectedAno, setSelectedAno] = useState(2021);
  
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
      <View style={{flex:1}}>
        <Card containerStyle={{flex: 1}}>
          <Card.Title>{dataProps.name}</Card.Title>
          <Card.Divider />
          <View>
            <Image
              style={{width: 300, height: 300}}
              resizeMode="cover"
              source={{uri: dataProps.logos.light}}
            />
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
                {data.map(({year}, i) => {
                  return <Picker.Item key={i} label={year.toString()} value={year} />;
                })}
              </Picker>
            )}
            <Button
             disabled={carregando? true: false}
             buttonStyle={{
              backgroundColor: '#332a2b',
              padding: 5,
            }}
            title="Buscar"
            onPress={()=> navigation.navigate('TeamList', {
                id: dataProps.id,
                ano: selectedAno,
  
            })}
            />
          </View>
        </Card>
      </View>
    );
  };