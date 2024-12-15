import { EvChargeModel } from "../../models/energy/EvChargeModel";

export default function EvChargeStation(props: EvChargeStationEntry) {
  return (
    <div className="m-2 flex h-96 w-full snap-y snap-mandatory flex-col gap-1 overflow-scroll rounded-md border border-solid border-line bg-gray-700/80 px-4 py-2 transition-transform hover:scale-110">
      {props.entry?.errMsg === "NotFound" ? (
        <p
          className={`flex flex-col items-start justify-start p-2 text-lg font-semibold text-white/75`}
        >
          데이터가 없습니다
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
}
