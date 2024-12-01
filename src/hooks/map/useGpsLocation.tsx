import { useEffect, useState } from "react";

export default function useGpsLocation() {
  const [gpsLocation, setGpsLocation] = useState<GeolocationCoordinates | null>(
    null,
  );

  const succesLocation = (position: GeolocationPosition): void => {
    try {
      setGpsLocation(position.coords);
    } catch (error) {
      console.log(error);
    }
  };

  const errorLocation = (errorPos: GeolocationPositionError): void => {
    console.log(errorPos.message);
  };

  useEffect(() => {
    if (gpsLocation) return;
    navigator.geolocation.getCurrentPosition(succesLocation, errorLocation);
  }, [gpsLocation]);

  return { gpsLocation };
}
