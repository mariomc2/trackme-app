import React, {useContext, useEffect, useState} from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import {TrackContext} from '../contexts/TrackContext';

import moment from 'moment';
import 'moment-duration-format';

const Timer = () =>{
  const { tracking, dispatch } = useContext(TrackContext);
  const [duration, setDuration] = useState(null);
  const [timerId, setTimerId] = useState(null);

  const btn_bg = tracking.isTracking ? '#d9534f' : '#5cb85c';
  const btn_txt = tracking.isTracking ? "Stop Activity" : "Start Activity";

  function iniTimer(startTime){
    return setInterval(() => 
        setDuration(moment(Date.now()).diff(moment(startTime))), 1000);
  }
  function toggle(){
    if(!tracking.isTracking){
      const startTime = Date.now();   
      setTimerId(iniTimer(startTime));
      dispatch({ type: 'START_TRACKING', startTime });
    }
    else{
      clearInterval(timerId);
      setDuration(null);
      dispatch({ type: 'STOP_TRACKING' });
    }
        
  }

  useEffect(()=>{
    tracking.isTracking ? setTimerId(iniTimer(tracking.startTime)) : null;
  },[]);

  return(
    <View style={styles.container}>
      {tracking.isTracking && (
        <View>
          <Text style={styles.elapsedTime}>{ duration && moment.duration(duration).format("hh:mm:ss") } </Text>
          <Text>Start Time: {moment(tracking.startTime).format('h:mm a')}</Text>
        </View>
      )}
      <TouchableOpacity onPress={() => toggle()} style={[styles.button, {backgroundColor: btn_bg}]}>
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
  elapsedTime: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 15,
  },
});
