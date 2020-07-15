import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

const trackLocation = 'background-location-task';

export const trackReducer = (state, action) => {

  switch (action.type) {
    case 'START_TRACKING':
      console.log("Register Task::", trackLocation)
      Location.startLocationUpdatesAsync(trackLocation, {accuracy: Location.Accuracy.BestForNavigation, timeInterval: 1000, distanceInterval: 2});
      return {isTracking: true, startTime: action.startTime };//,,,state, {isTracking: false, startTime: 0}
    
    case 'STOP_TRACKING':
      console.log("Unregister Task::", trackLocation)
      Location.stopLocationUpdatesAsync(trackLocation)
      return {isTracking: false};
    
    case 'SET_LOCATION':
      //console.log("State from Reducer::", state)         
      if(state.locations)
    	  return {...state, locations: [...(state.locations), action.locations[0]]};
      else
        return {...state, locations: [action.locations[0]] };
    default:
      return state;
  }
}

