import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import {MainContext} from '../Context'

import moment from 'moment';


export default class Timer extends React.Component {
  
  
  async componentDidMount() {
    try {
      
    } catch (e) {

      this.setState({
        loading: false,
        error: true,
      });
      console.log(e)
    }
  }

  renderActionButton(isTracking, toggleTimer) {
    if(isTracking){
      return(
        <TouchableOpacity onPress={toggleTimer} style={[styles.button, {backgroundColor: '#d9534f'}]}>
          <Text style={styles.buttonText}>Stop Activity</Text>
        </TouchableOpacity>
      )
    }
    return(
        <TouchableOpacity onPress={toggleTimer} style={[styles.button, {backgroundColor: '#5cb85c'}]}>
          <Text style={styles.buttonText}>Start Activity</Text>
        </TouchableOpacity>
      )
  }

  render() {

    return (
      <View style={styles.container}>
        <MainContext.Consumer>
          {({isTracking, toggleTimer}) => (this.renderActionButton(isTracking, toggleTimer))}
        </MainContext.Consumer>
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
