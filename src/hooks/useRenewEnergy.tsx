import { useEffect, useState } from "react";
import {
  RenewEnergyModel,
  renewEnergyModelFromJson,
} from "../models/RenewEnergyModel";

const endPointUrl: string = "/kepcoapi/renewEnergy.do";

export default function useRenewEnergy(props: UseRenewEnergyEntry) {
  const [renewEnergy, setRenewEnergy] = useState<RenewEnergyModel | null>(null);

  const basicParams: { [key: string]: string } = {
    ...(props.year && { year: props.year.toString() }),
    ...(props.cityCode && { metroCd: props.cityCode }),
    ...(props.genSrcCd && { cityCd: props.genSrcCd }),
    returnType: "json",
    apiKey: import.meta.env.VITE_DATA_KEPCO_API_KEY ?? "",
  };

  const urlParams = new URLSearchParams(basicParams);

  useEffect(() => {
    if (!props.cityCode || !props.year) return;

    const getRenewEnergy = async (): Promise<void> => {
      const fetchUrl = `${endPointUrl}?${urlParams}`;
      try {
        const response = await fetch(fetchUrl, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        });
        if (!response.ok) {
          const errorResponse = await response.text();
          throw new Error(`${errorResponse}`);
        }
        const jsonResponse: RenewEnergyModel = renewEnergyModelFromJson(
          await response.json(),
        );

        setRenewEnergy(jsonResponse);
      } catch (error) {
        console.log(error);
      }
    };

    getRenewEnergy();
  }, []);

  return { renewEnergy };
}

interface UseRenewEnergyEntry {
  year: number | null;
  cityCode: string | null;
  genSrcCd?: string | null;
}
