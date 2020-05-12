import React from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


import { fetchLocations } from '../utils/api';


export default class MapRoute extends React.Component {
  
  
  async componentDidMount() {
    try {
      
    } catch (e) {
      this.setState({
        loading: false,
        error: true,
      });
      console.log(e)
    }
  }

  render() {
    

    return (
      <View style={styles.container}>
        <MapView style={styles.mapStyle}
     
         >              
              
        </MapView>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
