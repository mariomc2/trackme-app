import React, {useContext} from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import {TrackContext} from '../contexts/TrackContext';

import bgimg from '../assets/bg.jpg';

export default function Home() {
  const navigation = useNavigation();
  const { navigate } = navigation;

  const { tracking, dispatch } = useContext(TrackContext);

  const btn_bg = tracking.isTracking ? '#ff8800' : '#f0ad4e';
  const btn_txt = tracking.isTracking ? "Activity in Progress" : "Start Activity";

  return (
    <ImageBackground
      source={bgimg}
      style={styles.imageContainer}
      imageStyle={styles.image}
    >
      <View style={styles.container}>
        <Text></Text>

        <TouchableOpacity onPress={() => navigate('Track')} style={[styles.button, {backgroundColor: btn_bg}]}>
          <Text style={styles.buttonText}>{btn_txt}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigate('RunList')} style={[styles.button, {backgroundColor: '#0275d8'}]}>
          <Text style={styles.buttonText}>History of Activities</Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
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
