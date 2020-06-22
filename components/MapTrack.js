import React, { useContext, useState, useEffect } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import {TrackContext} from '../contexts/TrackContext';

import { fetchLocations } from '../utils/api';

const MapTrack = () =>{
  const { tracking, dispatch } = useContext(TrackContext);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(false);

  // When loads component
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setError(true);
      }

      if(!tracking.isTracking){
        Location.watchPositionAsync({accuracy: Location.Accuracy.BestForNavigation}, (location) => setLocation(location));
      }
    })();
  },[]);

  // Update the map location with background location
  useEffect(() => {
    if(tracking.isTracking && tracking.locations){
        setLocation(tracking.locations[0]);
      }
  },[tracking]);

  // Switch to the normal location
  useEffect(() => {
    if(tracking.isTracking){
      Location.watchPositionAsync({}, null);
    }
    else{
      Location.watchPositionAsync({accuracy: Location.Accuracy.BestForNavigation}, (location) => setLocation(location));
    }
  },[tracking.isTracking]);

  return (
    <View style={styles.container}>
    {console.log("STATE::", location)}
    {!location && <ActivityIndicator size="large" />}
    {error && <Text>Error...</Text>}
    {location && (
      <MapView style={styles.mapStyle}
               initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
               }}            
      >
      <Marker
        coordinate={location.coords}
        pinColor={'#07f'}
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
