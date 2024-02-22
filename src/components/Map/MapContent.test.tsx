// MapContent.test.jsx
import { render, screen } from '@testing-library/react';
import type { Mock } from 'vitest';
import { MapContent } from './MapContent';
import type { MapContentProps } from './types';

describe('<MapContent />', () => {
  const defaultProps: MapContentProps = {
    center: { lat: 0, lng: 0 },
    zoom: 10,
    onClick: vi.fn(),
  };
  const GoogleMap = google.maps.Map as unknown as Mock;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders correctly', () => {
    render(<MapContent {...defaultProps} />);

    expect(screen.getByTestId('map')).toBeInTheDocument();
  });

  test('initialize Google Maps once on mount', () => {
    render(<MapContent {...defaultProps} />);

    expect(google.maps.Map).toHaveBeenCalledTimes(1);
  });

  test('behaves correctly on click', () => {
    render(<MapContent {...defaultProps} />);

    const mapInstance = GoogleMap.mock.results[0].value;
    // get click function from map addListener to simulate click event
    // this make sure that the click event is added to the map
    const clickEvent = mapInstance.addListener.mock.calls.find((call: any) => call[0] === 'click')[1];

    clickEvent();

    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  test('renders children components', () => {
    render(
      <MapContent {...defaultProps}>
        <div>Child 1</div>
        <div>Child 2</div>
      </MapContent>,
    );

    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });
});
