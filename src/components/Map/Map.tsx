import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { Spin } from 'antd';
import { type FC, type ReactElement } from 'react';
import { MapContent as Content } from './MapContent';
import { MapMarker as Marker } from './MapMarker';
import type { MapProps } from './types';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const render = (status: Status): ReactElement => {
  if (status === Status.FAILURE) return <>Error</>;
  return <Spin aria-hidden data-testid="map-loading" />;
};

export const Map: FC<MapProps> = ({ markers, onClick }) => {
  const center = { lat: 24.47598098075336, lng: 54.359314612077455 };
  const zoom = 9;

  return (
    <Wrapper apiKey={API_KEY} render={render}>
      <Content center={center} zoom={zoom} style={{ height: 'calc(100vh)', width: 'calc(60vw)' }} onClick={onClick}>
        {markers.map(({ id, ...props }) => (
          <Marker key={id} {...props} onClick={onClick} />
        ))}
      </Content>
    </Wrapper>
  );
};
