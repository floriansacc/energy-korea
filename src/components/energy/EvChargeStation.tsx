import { useState } from "react";
import { EvChargeModel } from "../../models/energy/EvChargeModel";
import { FaArrowAltCircleDown } from "react-icons/fa";

export default function EvChargeStation(props: EvChargeStationEntry) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div
      className={`${isOpen ? "sm:h-auto sm:max-h-fit" : "sm:h-12 sm:overflow-hidden"} relative m-2 flex h-96 w-full snap-y snap-mandatory flex-col gap-1 rounded-md border border-solid border-line bg-gray-700/80 px-4 py-2 transition-transform sm:mx-0 sm:my-2 sm:transition-[height] md:overflow-scroll md:hover:scale-110 lg:overflow-scroll lg:hover:scale-110`}
      onClick={() => setIsOpen(() => !isOpen)}
    >
      <FaArrowAltCircleDown
        className={`${isOpen ? "" : "-rotate-180"} absolute right-2 top-3 h-6 w-6 text-white transition-transform duration-300`}
      />
      <h1 className="text-center text-2xl font-bold text-white">
        전기차 충전소 설치현황
      </h1>
      {props.entry?.errMsg === "NotFound" ? (
        <p
          className={`flex flex-col items-start justify-start p-2 text-lg font-semibold text-white/75`}
        >
          조회하신 기간에 해당된 데이터가 없습니다 <br />
          <span className="text-sm">
            ({props.searchDate.getFullYear()}년{props.searchDate.getMonth() + 1}
            월)
          </span>
        </p>
      ) : (
        props?.entry?.data.map((e, i) => (
          <div
            key={`${e.stnAddr}-${i}`}
            className={`${i !== 0 ? "border-t border-solid border-line" : ""} relative flex flex-col items-start justify-start p-2 text-lg font-normal text-white/75`}
          >
            <div className="flex gap-2">
              <span className="font-semibold">
                {e.metro}
                {e.city && ` - ${e.city}`}
              </span>
            </div>
            <span>위치: {e.stnPlace}</span>
            <span>({e.stnAddr})</span>
            <span>급속충전기 대수: {e.rapidCnt}원</span>
            <span>완속충전기 대수: {e.slowCnt}원</span>
            <span>지원차종: {e.carType}</span>
          </div>
        ))
      )}
    </div>
  );
}

interface EvChargeStationEntry {
  entry: EvChargeModel | null;
  searchDate: Date;
}
