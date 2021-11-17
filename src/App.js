import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import LigasList from "./view/LigasList";
import TeamList from "./view/TeamList";
import Liga from "./view/Liga";
import TimeCard from "./view/modal/Time.Card";


const Stack = createNativeStackNavigator();
export default props =>{
  
  
  return(
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LigasList"
        screenOptions={screenOptions}
      >
        <Stack.Screen
        name="LigasList"
        component={LigasList}
        options={()=>{
          return{
            title: 'Lista de Ligas'
          }
        }}
        />
        <Stack.Screen
        name="TimeCard"
        component={TimeCard}
        options={()=>{
          return{
            title: 'Busca por time'
          }
        }}
        />
        <Stack.Screen
        name="Liga"
        component={Liga}
        options={()=>{
          return{
            title: 'Liga - Campeonato'
          }
        }}
        />
        <Stack.Screen
        name="TeamList"
        component={TeamList}
        options={()=>{
          return{
            title: 'Times - Por Classificação'
          }
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}



const screenOptions = {
  headerStyle: {
    backgroundColor: '#332a2b',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};