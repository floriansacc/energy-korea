import { useState } from "react";
import { daysInMonth, yearRange } from "../../functions/dateFunction";

export default function DateSelector(props: DatePickerEntry) {
  const [rangeYear] = useState(
    yearRange(
      props.startDate.getFullYear() - 50,
      props.startDate.getFullYear(),
      1,
    ),
  );

  return (
    <div className="ml-4 flex flex-col items-center justify-center gap-1">
      <div className="m-2 flex gap-2">
        <select
          className="w-fit rounded-xl bg-white/25 p-1 text-white"
          name="year-start"
          value={props.searchDate.getFullYear()}
          onChange={(year) => {
            props.setSearchDate((prev) => {
              const newDate = new Date(prev);
              if (newDate.getMonth() + 1 === 2 && newDate.getDate() === 29) {
                const numOfDays = daysInMonth(
                  newDate.getMonth() + 1,
                  parseInt(year.target.value),
                );
                newDate.setDate(numOfDays);
              }
              newDate.setFullYear(parseInt(year.target.value));
              return newDate;
            });
          }}
        >
          <option
            key="선택-year-start"
            label="연도 선택"
            disabled
            defaultValue={`연도 선택`}
          ></option>
          {rangeYear.map((e) => (
            <option key={`year-1-${e}`} value={e} label={`${e}년`}></option>
          ))}
        </select>
        <select
          className="w-fit rounded-xl bg-white/25 p-1 text-white"
          name="month-start"
          value={props.searchDate.getMonth() + 1}
          onChange={(month) => {
            props.setSearchDate((prev) => {
              const newDate = new Date(prev);

              const previousDay = newDate.getDate();
              const numOfDays = daysInMonth(
                parseInt(month.target.value),
                newDate.getFullYear(),
              );

              newDate.setDate(1);
              newDate.setMonth(parseInt(month.target.value) - 1);

              if (previousDay > numOfDays) {
                newDate.setDate(numOfDays);
              } else {
                newDate.setDate(previousDay);
              }

              return newDate;
            });
          }}
        >
          <option
            key="선택-month"
            label="월"
            disabled
            defaultValue={`월`}
          ></option>
          {props.monthList &&
            props.monthList.map((e, i) => (
              <option
                key={`monthList-start-${i}`}
                value={e}
                label={`${e}월`}
              ></option>
            ))}
        </select>
      </div>
    </div>
  );
}

interface DatePickerEntry {
  startDate: Date;
  searchDate: Date;
  setSearchDate: React.Dispatch<React.SetStateAction<Date>>;
  monthList: number[];
}
