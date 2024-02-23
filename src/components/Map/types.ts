import type { CSSProperties, ReactNode } from 'react';

export interface MapProps {
  markers: MapMarker[];
  onClick?: (event: google.maps.MapMouseEvent) => void;
}

export interface MapContentProps extends google.maps.MapOptions {
  center: google.maps.LatLngLiteral;
  children?: React.ReactNode;
  onClick?: (event: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  style?: CSSProperties;
  zoom: number;
}

export type MapMarker = Entity & Pick<google.maps.MarkerOptions, 'icon' | 'position'>;

export interface MapMarkerProps extends google.maps.MarkerOptions {
  onClick?: (event: google.maps.MapMouseEvent) => void;
}

export interface MapWrapperMockProps {
  children: ReactNode;
  render: (status: string) => ReactNode;
}
