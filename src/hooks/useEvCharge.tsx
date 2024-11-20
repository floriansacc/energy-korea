import { useEffect, useState } from "react";
import { EvChargeModel, evChargeModelFromJson } from "../models/EvChargeModel";

const baseUrl: string = "/EVcharge.do";

export default function useEvCharge(props: UseEvChargeEntry) {
  const [evCharge, setEvCharge] = useState<EvChargeModel | null>(null);

  const basicParams: { [key: string]: string } = {
    metroCd: props.cityCode,
    ...(props.townCode && { cityCd: props.townCode }),
    returnType: "json",
    apiKey: import.meta.env.VITE_DATA_KEPCO_API_KEY ?? "",
  };

  const urlParams = new URLSearchParams(basicParams);

  useEffect(() => {
    const getEvCharge = async (): Promise<void> => {
      const fetchUrl = `${baseUrl}${urlParams}`;
      try {
        const response = await fetch(fetchUrl, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`${response.statusText}`);
        }
        const jsonResponse: EvChargeModel = evChargeModelFromJson(
          await response.json(),
        );

        setEvCharge(jsonResponse);
      } catch (error) {
        console.log(error);
      }
    };

    //   getEvCharge();
  }, []);
}

interface UseEvChargeEntry {
  cityCode: string;
  townCode?: string;
}
