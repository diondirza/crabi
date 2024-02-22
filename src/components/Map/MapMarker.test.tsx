import { render } from '@testing-library/react';
import type { MockInstance } from 'vitest';
import { MapMarker } from './MapMarker';

describe('MapMarker', () => {
  const Marker = google.maps.Marker as unknown as MockInstance;
  const defaultPosition = { lat: -34.397, lng: 150.644 };
  let map: google.maps.Map;

  beforeEach(() => {
    const div = document.createElement('div');

    map = new google.maps.Map(div);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('creates a marker on mount', () => {
    render(<MapMarker map={map} position={defaultPosition} />);

    expect(Marker).toHaveBeenCalledTimes(1);
  });

  test('removes the marker on unmount', () => {
    const { unmount } = render(<MapMarker map={map} position={defaultPosition} />);
    const markerInstance = Marker.mock.results[0].value;

    unmount();

    expect(markerInstance.setMap).toHaveBeenCalledWith(null);
  });

  test('updates marker options when props change', () => {
    const { rerender } = render(<MapMarker map={map} position={defaultPosition} />);
    const newOptions = { position: { lat: -35, lng: 151 }, title: 'New Title' };
    const markerInstance = Marker.mock.results[0].value;

    rerender(<MapMarker map={map} {...newOptions} />);

    expect(markerInstance.setOptions).toHaveBeenCalledWith(expect.objectContaining(newOptions));
  });

  test('handles click events', () => {
    const handleClick = vi.fn();
    render(<MapMarker map={map} onClick={handleClick} position={defaultPosition} />);

    const markerInstance = Marker.mock.results[0].value;
    // get click function from marker addListener to simulate click event
    // this make sure that the click event is added to the marker
    const clickEvent = markerInstance.addListener.mock.calls.find((call: any) => call[0] === 'click')[1];

    clickEvent();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
