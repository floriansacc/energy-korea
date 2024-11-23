import { useEffect } from "react";
import useElecHome from "../hooks/useElecHome";
import useRenewEnergy from "../hooks/useRenewEnergy";
import useEvCharge from "../hooks/useEvCharge";
import useGpsLocation from "../hooks/useGpsLocation";
import MapComponent from "../components/map/MapComponent";
import useCommonCode from "../hooks/useCommonCode";

export default function HomePage() {
  const date = new Date("2024-09-01");

  const { commonCode } = useCommonCode({ codeTy: null });

  const { elecHome } = useElecHome({
    year: null,
    month: date.getMonth() - 1,
    cityCode: "11",
  });

  const { renewEnergy } = useRenewEnergy({ year: null, cityCode: "11" });

  const { evCharge } = useEvCharge({ cityCode: null });

  const { gpsLocation } = useGpsLocation();

  useEffect(() => {
    if (commonCode === null) return;
    console.log(commonCode);
  }, [commonCode]);

  useEffect(() => {
    if (elecHome === null) return;
    console.log(elecHome);
  }, [elecHome]);

  useEffect(() => {
    if (renewEnergy === null) return;
    console.log(renewEnergy);
  }, [renewEnergy]);

  useEffect(() => {
    if (evCharge === null) return;
    console.log(evCharge);
  }, [evCharge]);

  return (
    <div>
      <MapComponent location={gpsLocation} />
    </div>
  );
}
