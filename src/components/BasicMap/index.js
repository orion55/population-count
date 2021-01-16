import React, { useState, useRef, useEffect } from 'react';
import { Map, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import styles from './styles.module.css';
import config from '../../config/config';
import MarkersList from '../MarkersList';
import { getAreaStatistics } from '../../libs/utils';

const BasicMap = () => {
  const [mapLayers, setMapLayers] = useState([]);
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef();

  const onCreate = async (e) => {
    const { layerType, layer } = e;
    if (layerType === 'polygon') {
      const { _leaflet_id } = layer;
      setMapLayers((layers) => [...layers, { id: _leaflet_id, latlngs: layer.getLatLngs()[0] }]);
      const count = await getAreaStatistics(layer);
      setMarkers((oldMarkers) => [...oldMarkers, { id: _leaflet_id, position: layer.getCenter(), count }]);
    }
  };

  const onEdited = (e) => {
    const { layers: { _layers } } = e;
    console.log(e);

    Object.values(_layers).forEach((layer) => {
      const { _leaflet_id, editing } = layer;

      setMapLayers((layers) => layers.map((l) => (
        l.id === _leaflet_id
          ? { ...l, latlngs: { ...editing.latlngs[0] } }
          : l)));

      setMarkers((oldMarkers) => oldMarkers.map((l) => (
        l.id === _leaflet_id
          ? { ...l, position: layer.getCenter(), count: 100 }
          : l)));
    });
  };

  const onDeleted = (e) => {
    // console.log(e);
    const { layers: { _layers } } = e;

    Object.values(_layers).forEach(({ _leaflet_id }) => {
      setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
      setMarkers((oldMarkers) => oldMarkers.filter((l) => l.id !== _leaflet_id));
    });
  };

  useEffect(() => {
    // console.log(mapLayers);
  }, [mapLayers]);

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
