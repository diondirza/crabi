import { fireEvent, render, screen } from 'test/utils';
import { RentalForm } from './RentalForm';
import type { RentalFormProps } from './types';

describe('<RentalForm />', () => {
  const defaultProps: RentalFormProps = {
    available: true,
    name: '',
    hasReturnLocation: false,
    onRentClick: vi.fn(),
    onReturnClick: vi.fn(),
  };
  const returnLocationMessage = 'Please select the return location on the map!';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders correctly when available', () => {
    render(<RentalForm {...defaultProps} />);

    expect(screen.getByRole('button', { name: 'Rent' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Name' })).toBeInTheDocument();
    expect(screen.queryByText(returnLocationMessage)).not.toBeInTheDocument();
  });

  test('renders correctly when booked and no return location selected', () => {
    render(<RentalForm {...defaultProps} available={false} />);

    expect(screen.queryByRole('textbox', { name: 'Name' })).not.toBeInTheDocument();
    expect(screen.getByText(returnLocationMessage)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Return' })).toBeDisabled();
  });

  test('renders correctly when booked and return location selected', () => {
    render(<RentalForm {...defaultProps} available={false} hasReturnLocation={true} />);

    expect(screen.queryByRole('textbox', { name: 'Name' })).not.toBeInTheDocument();
    expect(screen.queryByText(returnLocationMessage)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Return' })).toBeEnabled();
  });

  test('behaves correctly when rent form submitted', async () => {
    const name = 'User';
    render(<RentalForm {...defaultProps} name={name} />);

    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveValue(name);

    fireEvent.submit(screen.getByRole('button', { name: 'Rent' }));

    expect(
      await screen.findByText(`Dear ${name}, thank you for choosing us for your journey! Enjoy the ride.`),
    ).toBeInTheDocument();
    expect(defaultProps.onRentClick).toBeCalledWith(name);
    expect(defaultProps.onReturnClick).not.toBeCalled();
  });

  test('resets form and calls onReturnClick on return', async () => {
    const name = 'User';

    render(<RentalForm {...defaultProps} name={name} available={false} hasReturnLocation={true} />);

    fireEvent.click(screen.getByRole('button', { name: 'Return' }));

    expect(
      await screen.findByText(/Thank you for choosing our service, your car has been successfully returned./),
    ).toBeInTheDocument();
    expect(defaultProps.onReturnClick).toBeCalledTimes(1);
  });
});
