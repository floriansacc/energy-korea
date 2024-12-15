import { createContext } from "react";
import useGpsLocation from "../hooks/map/useGpsLocation";
import IntroPage from "../pages/IntroPage";

export const Context = createContext<ContextEntry | null>(null);

export default function HomePage() {
  const { gpsLocation } = useGpsLocation();

  return (
    <Context.Provider value={{ gpsLocation }}>
      <div className="flex h-fit min-h-screen w-screen flex-col items-start justify-start bg-gray-800">
        <IntroPage />
      </div>
    </Context.Provider>
  );
}

interface ContextEntry {
  gpsLocation: GeolocationCoordinates | null;
}
