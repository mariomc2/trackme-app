import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

import {MainContext} from '../Context'

import bgimg from '../assets/bg.jpg';

export default function Home() {
  const navigation = useNavigation();
  const { navigate } = navigation;
  return (
    <ImageBackground
      source={bgimg}
      style={styles.imageContainer}
      imageStyle={styles.image}
    >
      <View style={styles.container}>
        <Text></Text>

        <MainContext.Consumer>
          {({isTracking}) => (renderActionButton(isTracking, navigate))}
        </MainContext.Consumer>

        <TouchableOpacity onPress={() => navigate('RunList')} style={[styles.button, {backgroundColor: '#0275d8'}]}>
          <Text style={styles.buttonText}>History of Activities</Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}

function renderActionButton(isTracking, navigate) {
  if(isTracking){
    return(
      <TouchableOpacity onPress={() => navigate('Track')} style={[styles.button, {backgroundColor: '#ff8800'}]}>
        <Text style={styles.buttonText}>Activity in Progress</Text>
      </TouchableOpacity>
    )
  }
  return(
      <TouchableOpacity onPress={() => navigate('Track')} style={[styles.button, {backgroundColor: '#f0ad4e'}]}>
        <Text style={styles.buttonText}>Start Activity</Text>
      </TouchableOpacity>
    )
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
