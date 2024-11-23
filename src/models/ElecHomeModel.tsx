export interface ElecHomeModel {
  data: ElecModel[];
  errCd?: number | null;
  errMsg?: string | null;
}

export const elecHomeFromJson = (json: any): ElecHomeModel => {
  return {
    data: json.data && elecModelFromJsonList(json.data),
    errCd: json.errCd ?? null,
    errMsg: json.errMsg ?? null,
  };
};

export interface ElecModel {
  year: number;
  month: string;
  metro: string;
  city: string;
  houseCnt: number;
  powerUsage: number;
  bill: number;
}

const elecModelFromJsonList = (list: any[]): ElecModel[] => {
  return list.map((e) => elecModelFromJson(e));
};

const elecModelFromJson = (json: any): ElecModel => {
  return {
    year: parseInt(json.year),
    month: json.month,
    metro: json.metro,
    city: json.city,
    houseCnt: json.houseCnt,
    powerUsage: json.powerUsage,
    bill: json.bill,
  };
};
