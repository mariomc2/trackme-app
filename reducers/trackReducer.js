export const trackReducer = (state, action) => {
  switch (action.type) {
    case 'START_TRACKING':
      return {isTracking: true, startTime: action.startTime};//,,,state, {isTracking: false, startTime: 0}
    case 'STOP_TRACKING':
      return {isTracking: false};
    
    default:
      return state;
  }
} 