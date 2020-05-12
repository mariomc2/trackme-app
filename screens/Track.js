import React from 'react';
import { StyleSheet, View } from 'react-native';


import MapTrack from '../components/MapTrack';
import Timer from '../components/Timer';


export default class Track extends React.Component {

  async componentDidMount() {
  }

  render() {


    return (
      <View style={styles.container}>
        <View style={styles.mapSection}>
          <MapTrack/>
        </View>
        <View style={styles.detailsSection}>
          <Timer />
        </View>
      </View>
    );
  }
}

// Track.propTypes = {
//   isTracking: PropTypes.bool.isRequired,
//   toggleTimer: PropTypes.func.isRequired,
// };

// Track.defaultProps = {
//   isTracking: false,
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gainsboro',
  },
  detailsSection: {
    flex: 1,
    backgroundColor: 'white',
  },
});