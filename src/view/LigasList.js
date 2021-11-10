import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import api from '../services/Api';


export default props => {
    const [carregando, setCarregando] = useState(true);
    const [data, setData] = useState([]);
    
    const getLigas = async () => {
      try {
        const response = await api.get(
          '/leagues',
        );
        const json = response.data;
        setData(json.data);
        
      } catch (error) {
        console.error(error);
      } finally {
        setCarregando(false);
      }
    };
    useEffect(() => {
      getLigas();
    }, []);
  
    function getLigasItens({item: data}) {
      return (
        <ListItem key={data.id} bottomDivider onPress ={()=> props.navigation.navigate('Liga', data)}>
          <Avatar size={60} source={{uri: data.logos.light}} />
          <ListItem.Content>
            <ListItem.Title>{data.name}</ListItem.Title>
            <ListItem.Subtitle>{data.abbr}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      );
    }
  
    return (
      <View>
        {carregando ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({id}, index) => id}
            renderItem={getLigasItens}
          />
        )}
      </View>
    );
  };