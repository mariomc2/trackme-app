import React from 'react';
import { StyleSheet, View } from 'react-native';

import moment from 'moment';

import MapRoute from '../components/MapRoute';
import RunInfo from '../components/RunInfo';

import { YellowBox } from 'react-native';

export default class Run extends React.Component {

  render() {

    YellowBox.ignoreWarnings([
      'Non-serializable values were found in the navigation state',
    ]);

    const { run } = this.props.route.params;
    const {
      run_id, title, start, distance, duration,
    } = run;

    return (
      <View style={styles.container}>
        <View style={styles.avatarSection}>
          <MapRoute run_id={run_id} />
        </View>
        <View style={styles.detailsSection}>
          <RunInfo icon="today" title="Date" subtitle={moment(start).format('dddd, MMMM Do YYYY')} />
          <RunInfo icon="alarm" title="Started at" subtitle={moment(start).format('LT')} />
          <RunInfo icon="timeline" title="Distance" subtitle={distance} />
          <RunInfo icon="update" title="Duration" subtitle={duration} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarSection: {
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
