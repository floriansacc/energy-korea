import { ElecHomeModel } from "../../models/energy/ElecHomeModel";

export default function HouseConsumption(props: HouseConsumptionEntry) {
  return (
    <div className="m-2 flex h-96 flex-col gap-1 overflow-scroll rounded-md border border-solid border-line px-4 py-2">
      {props?.entry?.data.map((e, i) => (
        <div
          className={`${i !== 0 ? "border-t border-solid border-line" : ""} flex flex-col items-start justify-start p-2 text-lg font-semibold text-white/75`}
        >
          <div className="flex gap-2">
            <span>
              {e.metro}
              {e.city && ` - ${e.city}`},
            </span>
            <span>
              {e.year}년 {e.month}월
            </span>
          </div>
          <span>기구수: {e.houseCnt}</span>
          <span>평균 전기요금: {e.bill}원</span>
          <span>평균 전력사용량: {e.powerUsage}원</span>
        </div>
      ))}
    </div>
  );
}

interface HouseConsumptionEntry {
  entry: ElecHomeModel | null;
}
