import { useEffect, useState, type FC } from 'react';
import type { MapMarkerProps } from './types';

export const MapMarker: FC<MapMarkerProps> = ({ onClick, ...options }) => {
  const [marker, setMarker] = useState<google.maps.Marker>();

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  useEffect(() => {
    if (marker) {
      google.maps.event.clearListeners(marker, 'click');

      if (onClick) {
        marker.addListener('click', onClick);
      }
    }
  }, [marker, onClick]);

  return null;
};
