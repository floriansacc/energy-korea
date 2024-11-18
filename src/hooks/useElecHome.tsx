import { useEffect, useState } from "react";
import { elecHomeFromJson, ElecHomeModel } from "../models/ElecHomeModel";

const baseUrl: string =
  "https://bigdata.kepco.co.kr/openapi/v1/powerUsage/houseAve.do";

export default function useElecHome(props: UseElecHomeEntry) {
  const [elecHome, setElecHome] = useState<ElecHomeModel | null>(null);

  const basicParams: { [key: string]: string } = {
    year: props.year.toString(),
    month: props.month.toString().padStart(2, "0"),
    metroCd: props.cityCode,
    returnType: "json",
    apiKey: import.meta.env.VITE_DATA_KEPCO_API_KEY ?? "",
  };

  const urlParams = new URLSearchParams(basicParams);

  useEffect(() => {
    const getElecHome = async (): Promise<void> => {
      const fetchUrl = `${baseUrl}?${urlParams}`;
      try {
        const response = await fetch(fetchUrl, {
          headers: {
            Accept: "application / json",
          },
          credentials: "same-origin",
          mode: "cors",
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`${response.statusText}`);
        }
        const jsonResponse: ElecHomeModel = elecHomeFromJson(
          await response.json(),
        );
        setElecHome(jsonResponse);
      } catch (error) {
        console.log(error);
      }
    };
    getElecHome();
  }, []);

  return { elecHome };
}

interface UseElecHomeEntry {
  year: number;
  month: number;
  cityCode: string;
}
