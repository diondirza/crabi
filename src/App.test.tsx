import { render, fireEvent, screen } from '@testing-library/react';
import { App } from './App';
import { cars } from './seed';

describe('<App />', () => {
  it('renders correctly', () => {
    render(<App />);

    expect(screen.getByTestId('map-loading')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('renders RentalForm when a car is selected', async () => {
    render(<App />);

    fireEvent.click(screen.getByText(cars[0].model).closest('tr')!);

    expect(screen.getByRole('textbox', { name: 'Name' })).toBeInTheDocument();
  });
});
