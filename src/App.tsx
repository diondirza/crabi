import type { FC } from 'react';
import { RentalForm } from './components/Form';
import { Map } from './components/Map';
import { ThemeProvider } from './components/Providers';
import { RentalCarTable } from './components/Table';
import { useRentalCar } from './hooks';
import { cars } from './seed';

import './App.css';
import { AppContainer } from './App.styled';

export const App: FC = () => {
  const {
    carLocations,
    rentalCars,
    rentedCarHasReturnLocation,
    selectedCar,
    onMapClick,
    onFormRentClick,
    onFormReturnClick,
    onTableRowClick,
  } = useRentalCar(cars);

  return (
    <ThemeProvider>
      <AppContainer>
        <Map markers={carLocations} onClick={onMapClick} />
        <div>
          <RentalCarTable dataSource={rentalCars} selectedKey={selectedCar?.id} onRowClick={onTableRowClick} />
          {selectedCar && (
            <RentalForm
              available={selectedCar.available}
              name={selectedCar.bookedBy}
              hasReturnLocation={rentedCarHasReturnLocation}
              onRentClick={onFormRentClick}
              onReturnClick={onFormReturnClick}
            />
          )}
        </div>
      </AppContainer>
    </ThemeProvider>
  );
};
