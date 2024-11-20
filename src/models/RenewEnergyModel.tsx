export interface RenewEnergyModel {
  data: RenewEnergy[];
}

export const renewEnergyModel = (json: any): RenewEnergyModel => {
  return { data: renewEnergyFromJsonList(json.data) };
};

interface RenewEnergy {
  genSrc: string;
  metro: string;
  city: string;
  cnt: number;
  capacity: number;
  areaCnt: number;
  areaCapacity: number;
}

const renewEnergyFromJsonList = (list: any[]): RenewEnergy[] => {
  return list.map((e) => renewEnergyFromJson(e));
};

const renewEnergyFromJson = (json: any): RenewEnergy => {
  return {
    genSrc: json.genSrc,
    metro: json.metro,
    city: json.city,
    cnt: json.cnt,
    capacity: json.capacity,
    areaCnt: json.areaCnt,
    areaCapacity: json.areaCapacity,
  };
};
