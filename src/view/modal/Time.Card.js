import React, { useEffect, useState } from "react";
import { Card } from "react-native-elements";
import { View, Image, StyleSheet, ActivityIndicator} from "react-native";
import api from "../../services/Api";




export default props => {
    const [data, setData] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [paramsTeamList] = useState(props.route.params);
    const [team, stats] = data
    carregando? false : console.warn(team.name)
    

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
        <Card>
            <Card.Title>Lindo</Card.Title>
            <Card.Divider />
              <View>
              <View style={styles.containerImagem}>
                
              </View>
              </View>
            
        </Card>
    )
}
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