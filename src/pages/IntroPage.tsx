import { useContext, useEffect, useState } from "react";
import useCommonCode from "../hooks/energy/useCommonCode";
import { CommonCodeEnum } from "../models/energy/CommonCode";
import useElecHome from "../hooks/energy/useElecHome";
import useEvCharge from "../hooks/energy/useEvCharge";
import CitySelector from "../components/energy/CitySelector";
import MapComponent from "../components/map/MapComponent";
import { Context } from "../layout/HomePage";
import useAddressToCoord from "../hooks/map/useAddressToCoord";
import HouseConsumption from "../components/energy/HouseConsumption";

export default function IntroPage() {
  const context = useContext(Context);
  const [selectorValue, setSelectorValue] = useState<CommonCodeEnum | null>(
    CommonCodeEnum.city,
  );

  const [search, setSearch] = useState<SearchInteface>({
    city: null,
    town: null,
    hasTown: false,
  });

  // TODO set date
  const [date] = useState<Date>(new Date("2024-02-01"));

  const { commonCode: citycode } = useCommonCode({
    codeTy: CommonCodeEnum.city,
  });

  const { commonCode: townCode } = useCommonCode({
    codeTy: selectorValue === CommonCodeEnum.town ? CommonCodeEnum.town : null,
  });

  const { elecHome } = useElecHome({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    ...(search.hasTown
      ? { cityCode: search.town ? search.city : null }
      : { cityCode: search.city }),
    townCode: search.town,
  });

  const { evCharge } = useEvCharge({
    ...(search.hasTown
      ? { cityCode: search.town ? search.city : null }
      : { cityCode: search.city }),
    townCode: search.town,
  });

  const { coords } = useAddressToCoord(
    { address: [], placeName: [] },
    // {
    // ...((evCharge?.data ?? []).length > 0 && evCharge?.data
    //   ? { address: evCharge?.data.map((e) => e.stnAddr) }
    //   : { address: [] }),
    // ...((evCharge?.data ?? []).length > 0 && evCharge?.data
    //   ? { placeName: evCharge?.data.map((e) => e.stnPlace) }
    //   : { placeName: [] }),
    // }
  );

  const handleSwitchSelector = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    const newValue: CommonCodeEnum | null =
      Object.values(CommonCodeEnum).find(
        (item) => item === e.currentTarget.value,
      ) ?? null;
    setSelectorValue(newValue);
    setSearch({
      city: null,
      town: null,
      hasTown: newValue === CommonCodeEnum.town,
    });
  };

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    type: "city" | "town",
  ): void => {
    setSearch((prev) => {
      let newMap = { ...prev };
      type === "city" && (newMap.city = e.target.value);
      type === "town" && (newMap.town = e.target.value);
      return newMap;
    });
  };

  useEffect(() => {
    if (elecHome === null) return;
    console.log(elecHome);
  }, [elecHome]);
  useEffect(() => {
    if (coords === null) return;
    console.log(coords);
  }, [coords]);

  return (
    <div className="mt-10 flex h-full w-full justify-between gap-2 px-4 py-2">
      <div className="flex h-full w-full flex-col overscroll-y-auto rounded-md border border-solid border-main-blue-500">
        <CitySelector
          search={search}
          selectorValue={selectorValue}
          citycode={citycode}
          townCode={townCode}
          handleSearchChange={handleSearchChange}
          handleSwitchSelector={handleSwitchSelector}
        />
        <HouseConsumption entry={elecHome} />
        <div className="m-2 flex h-96 flex-col gap-1 overflow-scroll rounded-md border border-solid border-main-blue-500 p-2">
          {evCharge?.data?.map((e) => (
            <div className="border-t border-solid border-line pt-1">
              {Object.entries(e).map((item) => (
                <p className="text-sm">{item[1]}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="h-96 w-2/6 min-w-[300px] overflow-hidden rounded-xl border border-solid border-black">
        <MapComponent
          location={context?.gpsLocation ?? null}
          mapMarkers={Object.entries(coords ?? {}).map(([_, value]) => {
            return {
              lat: value[0].document?.[0]?.y ?? null,
              lng: value[0].document?.[0]?.x ?? null,
              name: value[1],
            };
          })}
        />
      </div>
    </div>
  );
}

export interface SearchInteface {
  city: string | null;
  town: string | null;
  hasTown: boolean;
}
