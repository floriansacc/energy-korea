import {
  CommonCodeEnum,
  CommonCodeModel,
} from "../../models/energy/CommonCode";
import { SearchInteface } from "../../pages/IntroPage";

export default function CitySelector(props: CitySelectorEntry) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="relative flex gap-2">
        <div
          className={`${props.selectorValue === CommonCodeEnum.town ? "translate-x-[100%]" : ""} absolute left-0 z-10 h-8 w-1/2 rounded-md bg-main-blue-500 px-3 transition-transform duration-300 ease-in-out`}
        ></div>
        <button
          className={`${
            props.selectorValue === CommonCodeEnum.city
              ? `font-semibold text-white`
              : `bg-transparent text-gray-300`
          } z-20 h-8 cursor-pointer select-none rounded-md px-4 transition-colors`}
          value={CommonCodeEnum.city}
          onClick={props.handleSwitchSelector}
        >
          시도별
        </button>
        <button
          className={`${
            props.selectorValue === CommonCodeEnum.town
              ? `font-semibold text-white`
              : `bg-transparent text-gray-300`
          } z-20 h-8 cursor-pointer select-none rounded-md px-4 transition-colors`}
          value={CommonCodeEnum.town}
          onClick={props.handleSwitchSelector}
        >
          시군별
        </button>
      </div>
      <div className="m-2 flex gap-2">
        <select
          className="w-fit rounded-xl bg-white/25 p-1 text-white"
          value={props.search.city ?? ""}
          onChange={(e) => props.handleSearchChange(e, "city")}
        >
          <option label="선택" defaultValue={"선택"} disabled />
          {props.citycode?.data.map(
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
        {props.selectorValue === CommonCodeEnum.town && (
          <select
            className="w-fit rounded-xl bg-white/25 p-1 text-white"
            disabled={!props.search.city}
            value={props.search.town ?? ""}
            onChange={(e) => props.handleSearchChange(e, "town")}
          >
            <option label="선택" defaultValue={"선택"} disabled />
            {props.townCode?.data.map(
              (e, i) =>
                e.codeNm !== "미분류" &&
                e.uppoCd === props.search.city && (
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

interface CitySelectorEntry {
  selectorValue: CommonCodeEnum | null;
  handleSwitchSelector: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  search: SearchInteface;
  handleSearchChange: (
    e: React.ChangeEvent<HTMLSelectElement>,
    type: "city" | "town",
  ) => void;
  citycode: CommonCodeModel | null;
  townCode: CommonCodeModel | null;
}
