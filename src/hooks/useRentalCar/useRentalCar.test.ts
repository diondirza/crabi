import { RenderHookResult, act, renderHook } from '@testing-library/react';
import { cars } from '~/seed';
import { useRentalCar } from './useRentalCar';

describe('useRentalCar hook', () => {
  const initialCars: RentalCar[] = [
    cars[0],
    cars[1],
    {
      ...cars[2],
      available: false,
      bookedBy: 'User',
      bookedDate: '2024-01-01T00:00:00.000Z',
    },
  ];
  test('initialize state correctly with 1 booked car and 2 available cars', () => {
    const { result } = renderHook(() => useRentalCar(initialCars));

    expect(result.current.rentalCars).toHaveLength(3);
    expect(result.current.carLocations).toHaveLength(2);
    expect(result.current.selectedCar).toBeUndefined();
    expect(result.current.rentedCarHasReturnLocation).toBeFalsy();
  });

  test('handle map click to select the right car and switch between car', () => {
    const [firstCar, secondCar] = initialCars;
    const { result } = renderHook(() => useRentalCar(initialCars));

    act(() => {
      result.current.onMapClick({ latLng: { toJSON: () => firstCar.location } } as google.maps.MapMouseEvent);
    });

    expect(result.current.selectedCar?.id).toBe(firstCar.id);

    act(() => {
      result.current.onMapClick({ latLng: { toJSON: () => secondCar.location } } as google.maps.MapMouseEvent);
    });

    expect(result.current.selectedCar?.id).toBe(secondCar.id);
  });

  test('handle table row click to select and deselect a car', () => {
    const [selectedCar] = initialCars;
    const { result } = renderHook(() => useRentalCar(initialCars));

    act(() => {
      result.current.onTableRowClick(selectedCar);
    });

    expect(result.current.selectedCar?.id).toBe(selectedCar.id);

    act(() => {
      result.current.onTableRowClick(selectedCar);
    });

    expect(result.current.selectedCar).toBeUndefined();
  });

  test('handle form rent to book a car', () => {
    const [selectedCar] = initialCars;
    const userName = 'User';
    const { result } = renderHook(() => useRentalCar(initialCars));

    act(() => {
      result.current.onTableRowClick(selectedCar);
    });
    act(() => {
      result.current.onFormRentClick(userName);
    });

    const bookedCar = result.current.rentalCars.find(({ id }) => id === selectedCar.id)!;

    expect(bookedCar.available).toBeFalsy();
    expect(bookedCar.bookedBy).toBe(userName);
    expect(result.current.selectedCar).toBeUndefined();
  });

  describe('handle return process', () => {
    const selectedCar = initialCars[2];
    const newLocation = { lat: 10, lng: 20 };
    let result: RenderHookResult<ReturnType<typeof useRentalCar>, RentalCar[]>['result'];

    beforeEach(() => {
      result = renderHook(() => useRentalCar(initialCars)).result;

      act(() => {
        result.current.onTableRowClick(selectedCar);
      });
      act(() => {
        result.current.onMapClick({ latLng: { toJSON: () => newLocation } } as google.maps.MapMouseEvent);
      });
    });

    test('renders return location in the map', () => {
      expect(result.current.rentedCarHasReturnLocation).toBeTruthy();
      expect(result.current.carLocations).toHaveLength(3);
    });

    test('click on return to make a car available again on new location', () => {
      act(() => {
        result.current.onFormReturnClick();
      });

      const bookedCar = result.current.rentalCars.find(({ id }) => id === selectedCar.id)!;

      expect(bookedCar.available).toBeTruthy();
      expect(bookedCar.location.lat).toBe(newLocation.lat);
      expect(bookedCar.location.lng).toBe(newLocation.lng);
      expect(result.current.selectedCar).toBeUndefined();
    });

    test('click on other car to cancel the return process and restore booked car location', () => {
      const [, otherCar] = initialCars;
      act(() => {
        result.current.onTableRowClick(otherCar);
      });

      const bookedCar = result.current.rentalCars.find(({ id }) => id === selectedCar.id)!;

      expect(bookedCar.available).toBeFalsy();
      expect(bookedCar.location.lat).toBe(selectedCar.location.lat);
      expect(bookedCar.location.lng).toBe(selectedCar.location.lng);
      expect(result.current.selectedCar?.id).toBe(otherCar.id);
    });
  });
});
