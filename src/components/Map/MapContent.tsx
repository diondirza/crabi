import { useEffect, useRef, useState, type FC, isValidElement, Children, cloneElement } from 'react';
import type { MapContentProps, MapMarkerProps } from './types';

export const MapContent: FC<MapContentProps> = ({ children, style, onClick, ...options }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (!ref.current || map) return;

    setMap(
      new google.maps.Map(ref.current, {
        ...options,
        mapTypeControl: false,
        streetViewControl: false,
      }),
    );
  }, [map, options]);

  useEffect(() => {
    if (map) {
      google.maps.event.clearListeners(map, 'click');

      if (onClick) {
        map.addListener('click', onClick);
      }
    }
  }, [map, onClick]);

  return (
    <>
      <div ref={ref} data-testid="map" id="map" style={style} />
      {Children.map(children, (child) => {
        if (isValidElement<MapMarkerProps>(child)) {
          return cloneElement(child, { map });
        }
      })}
    </>
  );
};
