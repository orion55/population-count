import L from 'leaflet';
import axios from 'axios';
import config from '../config/config';

export const getDist = (layer) => {
  const center = layer.getCenter();
  const eastBound = layer.getBounds().getEast();
  const centerEast = L.latLng(center.lat, eastBound);
  return Math.round(center.distanceTo(centerEast));
};

export const getAreaStatistics = (layer = null) => new Promise((resolve, reject) => {
  if (!layer) return reject(new Error('Empty input data'));

  const { API } = config;
  const { lat: x, lng: y } = layer.getCenter();

  const data = {
    method: 'get',
    url: API,
    params: {
      x, y, maxdist: getDist(layer), geometry: 0,
    },
  };

  axios(data)
    .then((response) => {
      if ('code' in response.data) {
        reject(new Error(response.data.message));
      }
      if ('population_rs' in response.data) {
        resolve(response.data.population_rs);
      }
      resolve(0);
    })
    .catch((error) => {
      reject(new Error('Error getting population count data'));
    });

  return false;
});
