export enum CommonCodeEnum {
  city = "metroCd",
  town = "cityCd",
  genSource = "genSrcCd",
}

export interface CommonCodeModel {
  data: CommonCode[];
  errCd?: number | null;
  errMsg?: string | null;
}

export const commonCodeModelFromJson = (json: any): CommonCodeModel => {
  return {
    data: commonCodeFromJsonList(json.data),
    errCd: json.errCd ?? null,
    errMsg: json.errMsg ?? null,
  };
};

interface CommonCode {
  uppoCd?: string;
  uppoCdNm?: string;
  codeTy: string;
  code: string;
  codeNm: string;
}

const commonCodeFromJsonList = (list: any[]): CommonCode[] => {
  return list.map((e) => commonCodeFromJson(e));
};

const commonCodeFromJson = (json: any): CommonCode => {
  return {
    uppoCd: json.uppoCd ?? null,
    uppoCdNm: json.uppoCdNm ?? null,
    codeTy: json.codeTy,
    code: json.code,
    codeNm: json.codeNm,
  };
};
