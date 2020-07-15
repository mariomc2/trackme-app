import React, { useContext, useState, useEffect } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

import {TrackContext} from '../contexts/TrackContext';

import { fetchLocations } from '../utils/api';

const MapTrack = () =>{
  const { tracking, dispatch } = useContext(TrackContext);
  const [locations, setLocations] = useState(null);
  const [error, setError] = useState(false);

  // When loads component
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setError(true);
      }

      if(!tracking.isTracking){
        Location.watchPositionAsync({accuracy: Location.Accuracy.BestForNavigation}, (location) => setLocations([location]));
      }
    })();

    return function cleanup(){
      Location.watchPositionAsync({}, null);
    }
  },[]);

  // Update the map location with background location
  useEffect(() => {
    if(tracking.isTracking && tracking.locations)
        setLocations(tracking.locations);

  },[tracking]);

  // Switch to the normal location
  useEffect(() => {
    if(tracking.isTracking){
      Location.watchPositionAsync({}, null);
    }
    else{
      Location.watchPositionAsync({accuracy: Location.Accuracy.BestForNavigation}, (location) => setLocations([location]));
    }

  },[tracking.isTracking]);

  return (
    <View style={styles.container}>
    {  
      //console.log("STATE::", location)
    }
    {!Array.isArray(locations) && 
      <MapView style={styles.mapStyle}
               initialRegion={{
                latitude: 0,
                longitude: 0,
                latitudeDelta: 90,
                longitudeDelta: 90,
               }}            
      />
    }
    {error && <Text>Error...</Text>}
    {Array.isArray(locations) && (

      <MapView style={styles.mapStyle}
               initialRegion={{
                latitude: locations[0].coords.latitude,
                longitude: locations[0].coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
               }}            
      >
      <Marker
        coordinate={locations[locations.length - 1].coords}
        pinColor={'#07f'}
      />

      <Polyline
        coordinates={locations.map(x => x.coords)}
        strokeColor="#07f"
        strokeWidth={7}
      />

      </MapView>
    )}  
    </View>
    
  );
}

export default MapTrack;


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
