import { useEffect, useState } from "react";
import useCommonCode from "../hooks/useCommonCode";
import { CommonCodeEnum } from "../models/CommonCode";
import useElecHome from "../hooks/useElecHome";

export default function IntroPage() {
  const [selectorValue, setSelectorValue] = useState<CommonCodeEnum | null>(
    null,
  );
  const [search, setSearch] = useState<SearchInteface>({
    city: null,
    town: null,
    hasTown: false,
  });

  // TODO set date
  const date = new Date("2024-09-01");

  const { commonCode: citycode } = useCommonCode({
    codeTy: CommonCodeEnum.city,
  });

  const { commonCode: townCode } = useCommonCode({
    codeTy: selectorValue === CommonCodeEnum.town ? CommonCodeEnum.town : null,
  });

  const { elecHome } = useElecHome({
    year: 2023,
    month: date.getMonth() - 1,
    ...(search.hasTown
      ? { cityCode: search.town ? search.city : null }
      : { cityCode: search.city }),
    townCode: search.town,
  });

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

  // useEffect(() => {
  //   if (citycode === null) return;
  //   console.log(citycode);
  // }, [citycode]);
  useEffect(() => {
    if (search === null) return;
    console.log(search);
  }, [search]);

  useEffect(() => {
    if (elecHome === null) return;
    console.log(elecHome);
  }, [elecHome]);

  return (
    <div className="flex flex-col items-center justify-center">
      <p>Search type</p>

      <div className="relative flex gap-2">
        <div
          className={`${selectorValue === CommonCodeEnum.town ? "translate-x-[100%]" : ""} absolute left-0 z-10 h-8 w-1/2 rounded-md bg-red-500 px-3 transition-transform duration-300 ease-in-out`}
        ></div>
        <button
          className={`${
            selectorValue === CommonCodeEnum.city
              ? `text-white`
              : `bg-transparent text-black`
          } z-20 h-8 cursor-pointer select-none rounded-md px-4 transition-colors`}
          value={CommonCodeEnum.city}
          onClick={handleSwitchSelector}
        >
          시도별
        </button>
        <button
          className={`${
            selectorValue === CommonCodeEnum.town
              ? `text-white`
              : `bg-transparent text-black`
          } z-20 h-8 cursor-pointer select-none rounded-md px-4 transition-colors`}
          value={CommonCodeEnum.town}
          onClick={handleSwitchSelector}
        >
          시군별
        </button>
      </div>
      <div className="flex">
        <select
          value={search.city ?? ""}
          onChange={(e) =>
            setSearch((prev) => {
              let newMap = { ...prev };
              newMap.city = e.target.value;
              return newMap;
            })
          }
        >
          <option label="선택" defaultValue={"선택"} disabled />
          {citycode?.data.map(
            (e, i) =>
              e.codeNm !== "미분류" && (
                <option
                  value={e.code}
                  label={e.codeNm}
                  key={`${e.codeNm}-${i}`}
                />
              ),
          )}
        </select>
        {selectorValue === CommonCodeEnum.town && (
          <select
            disabled={!search.city}
            value={search.town ?? ""}
            onChange={(e) =>
              setSearch((prev) => {
                let newMap = { ...prev };
                newMap.town = e.target.value;
                return newMap;
              })
            }
          >
            <option label="선택" defaultValue={"선택"} disabled />
            {townCode?.data.map(
              (e, i) =>
                e.codeNm !== "미분류" &&
                e.uppoCd === search.city && (
                  <option
                    value={e.code}
                    label={e.codeNm}
                    key={`${e.codeNm}-${i}`}
                  />
                ),
            )}
          </select>
        )}
      </div>
    </div>
  );
}

interface SearchInteface {
  city: string | null;
  town: string | null;
  hasTown: boolean;
}
