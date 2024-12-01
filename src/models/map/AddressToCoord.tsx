export interface AddressToCoordModel {
  meta: MetaModel;
  document: DocumentsModel[];
}

export const addressToCoordFromJson = (json: any): AddressToCoordModel => {
  return {
    meta: metaModelFromJson(json.meta),
    document: documentsModeltoJsonList(json.documents),
  };
};

interface MetaModel {
  totalCount: number;
}

const metaModelFromJson = (json: any): MetaModel => {
  return { totalCount: json.total_count };
};

interface DocumentsModel {
  addressName: string;
  addressType: string;
  x: number;
  y: number;
}

const documentsModeltoJsonList = (list: any[]): DocumentsModel[] => {
  return list.map((e) => documentsModeltoJson(e));
};

const documentsModeltoJson = (json: any): DocumentsModel => {
  return {
    addressName: json.address_name,
    addressType: json.address_type,
    x: json.x,
    y: json.y,
  };
};
