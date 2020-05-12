import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import RunListItem from '../components/RunListItem';

import { fetchRuns } from '../utils/api';

const keyExtractor = ({ id }) => id.toString();

export default class RunList extends React.Component {
  state = {
    runs: [],
    loading: true,
    error: false,
  };

  async componentDidMount() {
    try {
      const runs = await fetchRuns();

      this.setState({
        runs,
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

  renderRun = ({ item }) => {
    const { navigate } = this.props.navigation;
    const {
      id, run_id, title, start, distance, duration,
    } = item;

    return (
      <RunListItem
        id={id}
        run_id={run_id}
        title={title}
        start={start}
        distance={distance}
        duration={duration}
        onPress={() => navigate('Run', { run: item })}
      />
    );
  };

  render() {
    const { loading, runs, error } = this.state;

    const runsSorted = runs.sort((a, b) =>
      (a.start > b.start) ? 1 : -1);

    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" />}
        {error && <Text>Error...</Text>}
        {!loading &&
          !error && (
            <FlatList
              data={runsSorted}
              keyExtractor={keyExtractor}
              renderItem={this.renderRun}
            />
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
  },
});
