import React, { createContext, useReducer } from 'react';
import { trackReducer } from '../reducers/trackReducer';
import * as TaskManager from 'expo-task-manager';

export const TrackContext = createContext();

const TrackContextProvider = (props) => {
  const [tracking, dispatch] = useReducer(trackReducer, {isTracking: false});

  function setLocation(locations){
  	console.log("Locations: ", locations);
  }

  TaskManager.defineTask('background-location-task', ({ data, error }) => {
	  if (error) {
	    // Error occurred - check `error.message` for more details.
	    return;
	  }
	  if (data) {
	    const { locations } = data;
	    dispatch({ type: 'SET_LOCATION', locations });
	    // do something with the locations captured in the background
	  }
	});

  return (
    <TrackContext.Provider value={{ tracking, dispatch }}>
      {props.children}
    </TrackContext.Provider>
  );
}
 
export default TrackContextProvider;

const setLocation = (locations) => {
	dispatch({ type: 'SET_LOCATION', locations })
	console.log("Locations: ", locations);
}

