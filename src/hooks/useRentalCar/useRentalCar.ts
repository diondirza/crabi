import { useState } from 'react';
import type { MapMarker } from '~/components/Map';

export const useRentalCar = (initialCars: RentalCar[]) => {
  const [rentalCars, setRentalCars] = useState<RentalCar[]>(initialCars);
  const [selectedCar, setSelectedCar] = useState<RentalCar>();
  const [inReturnProcessCar, setInReturnProcessCar] = useState<RentalCar>();
  const rentedCarHasReturnLocation = Boolean(inReturnProcessCar);
  const carLocations = rentalCars.reduce<MapMarker[]>(
    (result, { available, id, imageUrl: icon, location: position }) => {
      const unconfirmRentedCarWithReturnLocation = id === inReturnProcessCar?.id;

      // show available car or unconfirm rented car with return location
      if (available || unconfirmRentedCarWithReturnLocation) {
        // use default icon for rented car with return location
        return [...result, { id, icon: unconfirmRentedCarWithReturnLocation ? undefined : icon, position }];
      }
      return result;
    },
    [],
  );

  const handleFormRent = (userName: string) => {
    if (!selectedCar) return;

    const bookedCar: RentalCar = {
      ...selectedCar,
      available: false,
      bookedBy: userName,
      bookedDate: new Date().toISOString(),
    };

    setRentalCars((prevCars) => prevCars.map((car) => (car.id === bookedCar.id ? bookedCar : car)));
    setSelectedCar(undefined);
  };

  const handleFormReturn = () => {
    if (!selectedCar) return;

    const returnedCar: RentalCar = {
      ...selectedCar,
      available: true,
      bookedBy: '',
      bookedDate: '',
    };

    setRentalCars((prevCars) => prevCars.map((car) => (car.id === returnedCar.id ? returnedCar : car)));
    setSelectedCar(undefined);
    setInReturnProcessCar(undefined);
  };

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (!event.latLng) return;

    const selectedLocation = event.latLng.toJSON();

    // pick the return location of the rented car
    if (selectedCar && !selectedCar.available) {
      const returnedCar: RentalCar = {
        ...selectedCar,
        location: selectedLocation,
      };

      // store the backup of the selected car to restore it if the user decides to cancel to return
      if (!inReturnProcessCar) setInReturnProcessCar(selectedCar);

      setSelectedCar(returnedCar);
      setRentalCars((prevCars) => prevCars.map((car) => (car.id === returnedCar.id ? returnedCar : car)));
    } else {
      // find the car on the clicked location
      const car = rentalCars.find(
        ({ location }) => location.lat === selectedLocation.lat && location.lng === selectedLocation.lng,
      );

      if (car) setSelectedCar(car);
    }
  };

  const handleTableRowClick = (record: RentalCar) => {
    if (selectedCar?.id === record.id) {
      // clear selection on twice row click
      setSelectedCar(undefined);
    } else {
      setSelectedCar(record);
    }

    // restore the backup
    if (inReturnProcessCar) {
      setRentalCars((prevCars) => prevCars.map((car) => (car.id === inReturnProcessCar.id ? inReturnProcessCar : car)));
      setInReturnProcessCar(undefined);
    }
  };

  return {
    carLocations,
    onFormRentClick: handleFormRent,
    onFormReturnClick: handleFormReturn,
    onMapClick: handleMapClick,
    onTableRowClick: handleTableRowClick,
    rentalCars,
    rentedCarHasReturnLocation,
    selectedCar,
  };
};
