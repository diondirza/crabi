interface Car extends Entity {
  model: string;
  vendor: string;
  imageUrl: string;
}

interface RentalCar extends Car {
  available: boolean;
  baseLocation: google.maps.LatLngLiteral;
  location: google.maps.LatLngLiteral;
  bookedBy: string;
  bookedDate: ParsableDate;
  returnDate: ParsableDate;
}
