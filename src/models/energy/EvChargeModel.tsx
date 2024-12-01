export interface EvChargeModel {
  data?: EvCharge[];
  errCd?: number | null;
  errMsg?: string | null;
}

export const evChargeModelFromJson = (json: any): EvChargeModel => {
  return {
    data: json.data && evChargeFromJsonList(json.data),
    errCd: json.errCd ?? null,
    errMsg: json.errMsg ?? null,
  };
};

interface EvCharge {
  metro: string;
  city: string;
  stnPlace: string;
  stnAddr: string;
  rapidCnt: number;
  slowCnt: number;
  carType: string;
}

const evChargeFromJsonList = (list: any[]): EvCharge[] => {
  return list.map((e) => evChargeFromJson(e));
};

const evChargeFromJson = (json: any): EvCharge => {
  return {
    metro: json.metro,
    city: json.city,
    stnPlace: json.stnPlace,
    stnAddr: json.stnAddr,
    rapidCnt: json.rapidCnt,
    slowCnt: json.slowCnt,
    carType: json.carType,
  };
};
