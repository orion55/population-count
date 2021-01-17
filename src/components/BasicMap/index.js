import React, { useState, useRef, useEffect } from 'react';
import { Map, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { useToasts } from 'react-toast-notifications';
import styles from './styles.module.css';
import config from '../../config/config';
import MarkersList from '../MarkersList';
import { getAreaStatistics } from '../../libs/utils';

const BasicMap = () => {
  const [mapLayers, setMapLayers] = useState([]);
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef();
  const editRef = useRef();
  const { addToast } = useToasts();

  const onCreate = async (e) => {
    const { layerType, layer } = e;
    if (layerType === 'polygon') {
      const { _leaflet_id } = layer;
      setMapLayers((layers) => [...layers, { id: _leaflet_id, latlngs: layer.getLatLngs()[0] }]);
      let count = 0;
      try {
        count = await getAreaStatistics(layer);
      } catch (err) {
        addToast(err.toString(), { appearance: 'error', autoDismiss: true });
      }
      setMarkers((oldMarkers) => [...oldMarkers, { id: _leaflet_id, position: layer.getCenter(), count }]);
    }
  };

  const onEdited = (e) => {
    const { layers: { _layers } } = e;

    Object.values(_layers).forEach(async (layer) => {
      const { _leaflet_id, editing } = layer;

      let count = 0;
      try {
        count = await getAreaStatistics(layer);
      } catch (err) {
        addToast(err.toString(), { appearance: 'error', autoDismiss: true });
      }

      setMapLayers((layers) => layers.map((l) => (
        l.id === _leaflet_id
          ? { ...l, latlngs: { ...editing.latlngs[0] } }
          : l)));

      setMarkers((oldMarkers) => oldMarkers.map((l) => {
        if (l.id === _leaflet_id) {
          return { ...l, position: layer.getCenter(), count };
        }
        return l;
      }));
    });
  };

  const onDeleted = (e) => {
    const { layers: { _layers } } = e;

    Object.values(_layers).forEach(({ _leaflet_id }) => {
      setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
      setMarkers((oldMarkers) => oldMarkers.filter((l) => l.id !== _leaflet_id));
    });
  };

  return (
    <>
      <Map center={config.center} zoom={config.zoomLevel} ref={mapRef} className={styles.map}>
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={onCreate}
            onEdited={onEdited}
            onDeleted={onDeleted}
            draw={{
              rectangle: false,
              polyline: false,
              circle: false,
              circlemarker: false,
              marker: false,
            }}
            ref={editRef}
          />
        </FeatureGroup>
        <TileLayer
          url={config.maptiler.url}
          attribution={config.maptiler.attribution}
        />
        <MarkersList markers={markers} />
      </Map>
    </>
  );
};

export default BasicMap;
