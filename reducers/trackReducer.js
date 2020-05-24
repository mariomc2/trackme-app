export const trackReducer = (state, action) => {
  switch (action.type) {
    case 'START_TRACKING':
      return {isTracking: true, startTime: 0};//,,,state, {isTracking: false, startTime: 0}
    case 'STOP_TRACKING':
      return {isTracking: false, startTime: 0};
    case 'TOGGLE_TRACKING':
      return {isTracking: !state.isTracking, startTime: 0};
    default:
      return state;
  }
} 