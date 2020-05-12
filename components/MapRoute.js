import React from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import moment from 'moment';

import { fetchLocations } from '../utils/api';


export default class MapRoute extends React.Component {
  
  state = {
    locations: [],
    loading: true,
    error: false,
  };
  async componentDidMount() {
    try {
      const { run_id } = this.props
      const locations = await fetchLocations(run_id);

      this.setState({
        locations,
        loading: false,
        error: false,
      });
    } catch (e) {
      this.setState({
        loading: false,
        error: true,
      });
      console.log(e)
    }
  }

  render() {
    const { loading, locations, error } = this.state;

    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" />}
        {error && <Text>Error...</Text>}
        {!loading &&
          !error && (
            <MapView style={styles.mapStyle}
              initialRegion ={{
                latitude: locations[0].latitude,
                longitude: locations[0].longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}>              
              <Marker
                coordinate={locations[0]}
                title={'Start'}
                description={moment(locations[0].time).format('h:mm a')}
                pinColor={'#0f0'}
              />
              <Marker
                coordinate={locations[locations.length - 1]}
                title={'Finish'}
                description={moment(locations[locations.length - 1].time).format('h:mm a')}
                pinColor={'#f00'}
              />
              <MapView.Polyline
                coordinates={locations}
                strokeWidth={7}
                strokeColor="#00a8ff"
              />
            </MapView>
          )}
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
