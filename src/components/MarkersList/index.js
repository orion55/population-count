import React from 'react';
import classNames from 'classnames';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import styles from './styles.module.css';

const MarkersList = (props) => {
  const { markers } = props;
  if (markers.length === 0) return null;

  const getMarkers = () => markers.map((item) => {
    const icon = L.divIcon({
      className: classNames(styles.markerslist__icon),
      html: item.count || 0,
    });
    return <Marker key={item.id} icon={icon} position={item.position} />;
  });

  return (
    <div className={styles.markerslist}>
      {getMarkers()}
    </div>
  );
};

export default MarkersList;
