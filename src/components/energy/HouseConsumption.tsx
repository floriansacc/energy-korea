import { ElecHomeModel } from "../../models/energy/ElecHomeModel";

export default function HouseConsumption(props: HouseConsumptionEntry) {
  return (
    <div
      className="m-2 flex h-96 w-full snap-y snap-mandatory flex-col gap-1 overflow-scroll rounded-md border border-solid border-line bg-gray-700/80 px-4 py-2 transition-transform hover:scale-110"
      style={
        {
          //
          // transform: `translateZ(40px)`,
        }
      }
    >
      {props.entry?.errMsg === "NotFound" ? (
        <p
          className={`flex flex-col items-start justify-start p-2 text-lg font-semibold text-white/75`}
        >
          데이터가 없습니다
        </p>
      ) : (
        props?.entry?.data.map((e, i) => (
          <div
            key={`${e.houseCnt}-${i}`}
            className={`${i !== 0 ? "border-t border-solid border-line" : ""} relative my-8 flex snap-start scroll-mt-10 flex-col items-start justify-start p-2 text-lg font-normal text-white/75`}
          >
            <p className="absolute right-2 top-2 rounded-sm bg-bgcolor/50 px-2 py-1 text-black">
              {i}
            </p>
            <div className="my-4 flex gap-2 text-2xl font-bold">
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
            <span>평균 전력사용량: {e.powerUsage} kWh</span>
          </div>
        ))
      )}
    </div>
  );
}

interface HouseConsumptionEntry {
  entry: ElecHomeModel | null;
}
