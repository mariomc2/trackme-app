import React, { createContext, useReducer } from 'react';
import { trackReducer } from '../reducers/trackReducer';

export const TrackContext = createContext();

const TrackContextProvider = (props) => {
  const [tracking, dispatch] = useReducer(trackReducer, {isTracking: false});
  return (
    <TrackContext.Provider value={{ tracking, dispatch }}>
      {props.children}
    </TrackContext.Provider>
  );
}
 
export default TrackContextProvider;