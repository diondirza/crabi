import { render, screen } from '@testing-library/react';
import { RentalCarTable } from './RentalCarTable';
import { cars } from '~/seed';

describe('<RentalCarTable />', () => {
  const onRowClick = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders correctly', () => {
    render(<RentalCarTable dataSource={[]} onRowClick={onRowClick} />);

    expect(screen.getByText('Car Model')).toBeInTheDocument();
    expect(screen.getByText('Car Vendor')).toBeInTheDocument();
    expect(screen.getByText('Available')).toBeInTheDocument();
    expect(screen.getByText('Booked By')).toBeInTheDocument();
    expect(screen.getByText('Booked Date')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Base Location')).toBeInTheDocument();
  });

  test('behaves correctly on row click', () => {
    const firstCar = cars[0];
    render(<RentalCarTable dataSource={cars} onRowClick={onRowClick} />);

    const firstRow = screen.getByText(cars[0].model).closest('tr')!;
    firstRow?.click();

    expect(onRowClick).toHaveBeenCalledWith(firstCar);
  });
});
