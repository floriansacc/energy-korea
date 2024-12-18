import { useEffect, useState } from "react";
import { elecHomeFromJson, ElecHomeModel } from "../models/ElecHomeModel";

const endpointUrl: string = "/kepcoapi/powerUsage/houseAve.do";

export default function useElecHome(props: UseElecHomeEntry) {
  const [elecHome, setElecHome] = useState<ElecHomeModel | null>(null);

  const basicParams: { [key: string]: string } = {
    ...(props.year && { year: props.year.toString() }),
    ...(props.month && { month: props.month.toString().padStart(2, "0") }),
    ...(props.cityCode && { metroCd: props.cityCode }),
    ...(props.townCode && { cityCd: props.townCode }),
    returnType: "json",
    apiKey: import.meta.env.VITE_DATA_KEPCO_API_KEY ?? "",
  };

  const urlParams = new URLSearchParams(basicParams);

  useEffect(() => {
    if (!props.cityCode || !props.year || !props.month) return;

    const getElecHome = async (): Promise<void> => {
      const fetchUrl = `${endpointUrl}?${urlParams}`;
      try {
        const response = await fetch(fetchUrl, {
          headers: {
            "Content-Type": "application/json",
          },
          // credentials: "same-origin",
          // mode: "cors",
          method: "GET",
        });
        if (!response.ok) {
          const errorResponse = await response.text();
          throw new Error(`${errorResponse}`);
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
  year: number | null;
  month: number | null;
  cityCode: string | null;
  townCode?: string;
}
