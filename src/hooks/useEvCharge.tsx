import { useEffect, useState } from "react";
import { EvChargeModel, evChargeModelFromJson } from "../models/EvChargeModel";

const endpointUrl: string = "/kepcoapi//EVcharge.do";

export default function useEvCharge(props: UseEvChargeEntry) {
  const [evCharge, setEvCharge] = useState<EvChargeModel | null>(null);

  const basicParams: { [key: string]: string } = {
    ...(props.cityCode && { metroCd: props.cityCode }),
    ...(props.townCode && { cityCd: props.townCode }),
    returnType: "json",
    apiKey: import.meta.env.VITE_DATA_KEPCO_API_KEY ?? "",
  };

  const urlParams = new URLSearchParams(basicParams);

  useEffect(() => {
    if (!props.cityCode) return;

    const getEvCharge = async (): Promise<void> => {
      const fetchUrl = `${endpointUrl}?${urlParams}`;
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
        const jsonResponse: EvChargeModel = evChargeModelFromJson(
          await response.json(),
        );

        setEvCharge(jsonResponse);
      } catch (error) {
        console.log(error);
      }
    };

    getEvCharge();
  }, []);

  return { evCharge };
}

interface UseEvChargeEntry {
  cityCode: string | null;
  townCode?: string;
}
