export interface CoordToAddressModel {
  meta: MetaModel;
  document: DocumentsModel[];
}

export const coordToAddressModelFromJson = (json: any): CoordToAddressModel => {
  return {
    meta: metalModelFromJson(json.meta),
    document: documentsModelFromJsonList(json.documents),
  };
};

interface MetaModel {
  totalCount: number;
}

const metalModelFromJson = (json: any): MetaModel => {
  return { totalCount: json.total_count };
};

interface DocumentsModel {
  address?: AddressModel;
  roadAddress?: RoadAddressModel;
}

const documentsModelFromJson = (json: any): DocumentsModel => {
  return {
    address: addressModelFromJson(json.address ?? {}),
    roadAddress: roadAddressModelFromJson(json.road_address ?? {}),
  };
};
const documentsModelFromJsonList = (list: any[]): DocumentsModel[] => {
  return list.map((e) => documentsModelFromJson(e));
};

interface AddressModel {
  addressName?: string;
  region1depthName?: string;
  region2depthName?: string;
  region3depthName?: string;
  mountainYn?: string;
  mainAddressNo?: number;
  subAddressNo?: number;
}

const addressModelFromJson = (json: any): AddressModel => {
  return {
    addressName: json.address_name,
    region1depthName: json.region_1depth_name,
    region2depthName: json.region_2depth_name,
    region3depthName: json.region_3depth_name,
    mountainYn: json.mountain_yn,
    mainAddressNo: parseInt(json.main_address_no),
    subAddressNo: parseInt(json.sub_address_no),
  };
};

interface RoadAddressModel {
  addressName: string;
  region1depthName: string;
  region2depthName: string;
  region3depthName: string;
  roadName: string;
  undergroundYn: string;
  mainBuildingNo: number;
  subBuildingNo: number;
  buildingName: string;
  zoneNo: number;
}

const roadAddressModelFromJson = (json: any): RoadAddressModel => {
  return {
    addressName: json.address_name,
    region1depthName: json.region_1depth_name,
    region2depthName: json.region_2depth_name,
    region3depthName: json.region_3depth_name,
    roadName: json.road_name,
    undergroundYn: json.underground_yn,
    mainBuildingNo: parseInt(json.main_building_no),
    subBuildingNo: parseInt(json.sub_building_no),
    buildingName: json.building_name,
    zoneNo: parseInt(json.zone_no),
  };
};
