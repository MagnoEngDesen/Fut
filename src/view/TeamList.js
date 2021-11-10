import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import {Avatar, Chip, ListItem} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import api from '../services/Api';

export default props => {
    const [data, setData] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const quantidadeDeTimes = data.length
    const [paramsTeamList] = useState(props.route.params);
    const getLigas = async () => {
      try {
        const response = await api.get(
          `/leagues/${paramsTeamList.id}/standings?season=${paramsTeamList.ano}&sort=asc`,
        );
        const json = response.data;
        setData(json.data.standings);
      } catch (error) {
        console.error(error);
      } finally {
        setCarregando(false);
      }
    };
    useEffect(() => {
      getLigas();
    }, []);
  
     
  
    return (
      <SafeAreaView>
        <ScrollView>
          {carregando ? (
            <ActivityIndicator />
          ) : (
            data.map(({team, stats}, i) => {
              const rank = stats.find((value, index, arr) =>{
                return(
                  arr[index].name === 'rank'
                )
              })
              const pontos = stats.find((value, index, arr)=>{
                return (
                  arr[index].name === "points"
                )
              }) 
              
              return (
                <ListItem key={i} bottomDivider>
                  <Avatar size={60} source={{uri: team.logos[0].href}} />
                  <ListItem.Content>
                    <ListItem.Title>{team.name}</ListItem.Title>
                    <ListItem.Subtitle>{team.abbreviation}</ListItem.Subtitle>
                  </ListItem.Content>
                  <Chip title={pontos.displayValue}  buttonStyle={ 
                    
                    (rank.value === 1) || (rank.value === 2)|| (rank.value === 3)|| (rank.value === 4) ? ({backgroundColor:'#86BA90'})
                     : (rank.value === (quantidadeDeTimes) 
                     || (rank.value === (quantidadeDeTimes-1)
                     || (rank.value ===(quantidadeDeTimes -2))
                     || (rank.value === (quantidadeDeTimes -3))
                     ) ? {backgroundColor:'#DF2935'}:  {}) 
  
                    
                    
                    } />
                </ListItem>
              );
            })
          )}
        </ScrollView>
      </SafeAreaView>
    );
  };