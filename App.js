import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {MainContext} from './Context'

import Home from './screens/Home';
import Track from './screens/Track';
import RunList from './screens/RunList';
import Run from './screens/Run';


const Stack = createStackNavigator();

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.toggleTimer = () => {
      this.setState(state => ({
        isTracking: !state.isTracking          
      }));
    };

    this.state = {
      isTracking: false,
      toggleTimer: this.toggleTimer,
    };
  }

  render(){
    const { isTracking } = this.state;
    return (
      <View style={styles.container}>
        <MainContext.Provider value={this.state}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                options={{ title: 'Home'}}
                name="Home" 
                component={Home}
              />
              <Stack.Screen
                options={{ title: 'Track Me'}}
                name="Track" 
                component={Track}
              />
              <Stack.Screen
                options={{ title: 'My Runs'}}
                name="RunList" 
                component={RunList}
              />
              <Stack.Screen
                options={{ title: 'Run'}}
                name="Run" 
                component={Run}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </MainContext.Provider>
      </View>
    );
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});