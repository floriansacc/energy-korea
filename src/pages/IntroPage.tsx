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
import EvChargeStation from "../components/energy/EvChargeStation";
import useGetSearchDate from "../hooks/useGetSearchDate";
import DateSelector from "../components/energy/DateSelector";

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

  const { searchDate, setSearchDate, startDate, monthList } =
    useGetSearchDate();

  const { commonCode: citycode } = useCommonCode({
    codeTy: CommonCodeEnum.city,
  });

  const { commonCode: townCode } = useCommonCode({
    codeTy: selectorValue === CommonCodeEnum.town ? CommonCodeEnum.town : null,
  });

  const { elecHome } = useElecHome({
    year: searchDate.getFullYear(),
    month: searchDate.getMonth() + 1,
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
    // { address: [], placeName: [] },
    {
      ...((evCharge?.data ?? []).length > 0 && evCharge?.data
        ? { address: evCharge?.data.map((e) => e.stnAddr) }
        : { address: [] }),
      ...((evCharge?.data ?? []).length > 0 && evCharge?.data
        ? { placeName: evCharge?.data.map((e) => e.stnPlace) }
        : { placeName: [] }),
    },
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
    <div className="relative mt-10 flex h-full w-full justify-between gap-2 px-4 py-2">
      <div className="flex h-full w-full flex-col overscroll-y-auto rounded-md border border-solid border-main-blue-500">
        <p className="mx-4 my-2 text-center text-lg font-semibold text-white">
          가정평균 전력사용량 및 전기차충전소 설치현황을 확인해보세요!
        </p>
        <div className="flex w-full items-end justify-center px-4">
          <CitySelector
            search={search}
            selectorValue={selectorValue}
            citycode={citycode}
            townCode={townCode}
            handleSearchChange={handleSearchChange}
            handleSwitchSelector={handleSwitchSelector}
          />
          <DateSelector
            startDate={startDate}
            searchDate={searchDate}
            setSearchDate={setSearchDate}
            monthList={monthList}
          />
        </div>
        <div
          style={{ perspective: "550px", transformStyle: "preserve-3d" }}
          className="relative flex w-full justify-between p-2"
        >
          <EvChargeStation entry={evCharge} />
          <HouseConsumption entry={elecHome} />
        </div>
      </div>
      <div className="sticky top-5 h-96 w-2/6 min-w-[300px] overflow-hidden rounded-xl border border-solid border-black">
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
