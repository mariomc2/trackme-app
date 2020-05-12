import uuidv4 from 'uuid/v4';

import capitalize from '../utils/capitalize';

const mapRun = run => {
  const {
    id, title, started_at, distance, duration,
  } = run;

  const sd = new Date(started_at);
  return {
    id: uuidv4(),
    run_id: id,
    title,
    start: sd,
    distance: (distance/1000).toPrecision(2) + ' Km', 
    duration: (duration/60).toPrecision(2) + ' Mins',
  };
};

export const fetchRuns = async () => {
  const response = await fetch('http://192.168.1.74:3000/runs/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }});
  const runData = await response.json();
  
  return runData.runs.map(mapRun);
};


const mapLocation = location => {
  const {
    latitude, longitude, logged_at,
  } = location;

  return {
    latitude,
    longitude,
    time: logged_at,
  };
};

export const fetchLocations = async (run_id) => {
  const response = await fetch('http://192.168.1.74:3000/runs/' + run_id + '/locations', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }});
  const locationData = await response.json();

  return locationData.locations.map(mapLocation);
};
