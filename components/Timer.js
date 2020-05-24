import React, {useContext, useEffect} from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import {TrackContext} from '../contexts/TrackContext';

import moment from 'moment';

const Timer = () =>{
  const { tracking, dispatch } = useContext(TrackContext);

  const bg = tracking.isTracking ? '#d9534f' : '#5cb85c';
  const btn_txt = tracking.isTracking ? "Stop Activity" : "Start Activity";

  return(
    <View style={styles.container}>
      <TouchableOpacity onPress={() => dispatch({ type: 'TOGGLE_TRACKING' })} style={[styles.button, {backgroundColor: bg}]}>
        <Text style={styles.buttonText}>{btn_txt}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Timer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 20,
    borderRadius: 5,
    margin:10,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
});
