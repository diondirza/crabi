import { Map as InternalMap } from './Map';
import { MapContent } from './MapContent';
import { MapMarker } from './MapMarker';

type MapType = typeof InternalMap;

type CompoundMapType = MapType & {
  Content: typeof MapContent;
  Marker: typeof MapMarker;
};

const Map = InternalMap as CompoundMapType;

Map.Content = MapContent;
Map.Marker = MapMarker;

export { Map };
export * from './types';
