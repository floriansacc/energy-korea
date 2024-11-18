export interface ElecHomeModel {
  data: ElecModel[];
}

export const elecHomeFromJson = (json: any): ElecHomeModel => {
  return { data: elecModelFromJsonList(json.data) };
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
