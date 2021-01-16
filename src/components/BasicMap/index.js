import React, { useState, useRef, useEffect } from 'react';
import { Map, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import styles from './styles.module.css';
import config from '../../config/config';

const BasicMap = () => {
  const [mapLayers, setMapLayers] = useState([]);
  const mapRef = useRef();

  const onCreate = (e) => {
    // console.log(e);
    const { layerType, layer } = e;
    if (layerType === 'polygon') {
      const { _leaflet_id } = layer;

      setMapLayers((layers) => [
        ...layers,
        { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
      ]);
    }
  };

  const onEdited = (e) => {
    // console.log(e);
    const { layers: { _layers } } = e;

    Object.values(_layers).forEach(({ _leaflet_id, editing }) => {
      setMapLayers((layers) => layers.map((l) => (l.id === _leaflet_id
        ? { ...l, latlngs: { ...editing.latlngs[0] } }
        : l)));
    });
  };

  const onDeleted = (e) => {
    // console.log(e);
    const { layers: { _layers } } = e;

    Object.values(_layers).forEach(({ _leaflet_id }) => {
      setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
    });
  };

  useEffect(() => {
    console.log(mapLayers);
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
      </Map>
    </>
  );
};

export default BasicMap;
