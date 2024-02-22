import { render, screen } from '@testing-library/react';
import { cars } from '~/seed';
import { Map } from './Map';
import type { MapProps, MapWrapperMockProps } from './types';

let renderStatus = 'LOADING';

vi.mock('@googlemaps/react-wrapper', () => ({
  Status: {
    LOADING: 'LOADING',
    FAILURE: 'FAILURE',
    SUCCESS: 'SUCCESS',
  },
  Wrapper: ({ children, render }: MapWrapperMockProps) => {
    return renderStatus !== 'SUCCESS' ? render(renderStatus) : children;
  },
}));

describe('<Map />', () => {
  const defaultProps: MapProps = {
    markers: cars.map(({ id, location: position }) => ({ id, position })),
    onClick: vi.fn(),
  };

  test('renders loading state correctly', () => {
    render(<Map {...defaultProps} />);

    expect(screen.getByTestId('map-loading')).toBeInTheDocument();
  });

  test('renders failure state correctly', () => {
    renderStatus = 'FAILURE';
    render(<Map {...defaultProps} />);

    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  test('renders success state correctly', () => {
    renderStatus = 'SUCCESS';
    render(<Map {...defaultProps} />);

    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
