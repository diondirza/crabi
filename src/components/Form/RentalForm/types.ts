export interface RentalFormValues {
  name: string;
}

export interface RentalFormProps {
  available: boolean;
  name: string;
  hasReturnLocation?: boolean;
  onRentClick: (userName: string) => void;
  onReturnClick: () => void;
}
