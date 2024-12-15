import { useState, useEffect } from "react";

//////////////////////////////////////////////////////////////////////
///
/// 날짜 선택할 때 calibration 해주는 hook
///
//////////////////////////////////////////////////////////////////////
///
/// timeDisplay -> 날짜 선택 기능이 있는 페이지 (옵션)
///
///
/////////////////////////////////////////////////////////////////////

export default function useGetSearchDate() {
  const [startDate] = useState<Date>(new Date());

  const [searchDate, setSearchDate] = useState<Date>(new Date());

  const [monthList, setMonthList] = useState<number[]>([]);

  useEffect(() => {
    if (searchDate > startDate) {
      setSearchDate(startDate);
    }
  }, [searchDate]);

  // ------------------------------------------------------
  // - 날짜 선택해서 확인 누를 시 선택한 날짜 반영해주는 것
  // - 또한, 페이지 갱신 시 선택한 날짜 로딩해주는 것
  // ------------------------------------------------------
  useEffect(() => {
    setSearchDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth());
      newDate.setFullYear(newDate.getFullYear());
      return newDate;
    });
  }, []);

  // ------------------------------------------------------
  // 표시 가능한 월 및 일을 계산함
  // ------------------------------------------------------
  useEffect(() => {
    let startMonths = [];

    // ------------------------------------------------------
    // 표시 가능한 월 계산
    // ------------------------------------------------------
    if (searchDate.getFullYear() === startDate.getFullYear()) {
      const availableMonth = startDate.getMonth();
      for (let i = 0; i <= availableMonth; i++) {
        startMonths.push(i + 1);
      }
    } else {
      startMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    }

    setMonthList(startMonths);
  }, [searchDate]);

  return {
    searchDate,
    setSearchDate,
    startDate,
    monthList,
  };
}
