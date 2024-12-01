import { useEffect, useState } from "react";
import {
  RenewEnergyModel,
  renewEnergyModelFromJson,
} from "../../models/energy/RenewEnergyModel";
import { doc, DocumentSnapshot, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";

const endPointUrl: string = "/kepcoapi/renewEnergy.do";

const collectionName: string = "renewable-energy";

export default function useRenewEnergy(props: UseRenewEnergyEntry) {
  const [renewEnergy, setRenewEnergy] = useState<RenewEnergyModel | null>(null);

  const docName: string = `${props.year},${props.cityCode}${props.genSrcCd ? `-${props.genSrcCd}` : ""}`;

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
      const dbData: DocumentSnapshot = await getDoc(
        doc(db, collectionName, docName),
      );

      if (dbData.exists()) {
        console.log("renewable energy from firebase");
        setRenewEnergy(renewEnergyModelFromJson(dbData.data()));
      } else {
        console.log("fetch renewable energy");
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

          await setDoc(doc(db, collectionName, docName), jsonResponse);
          console.log("renewable energy saved in firebase");
        } catch (error) {
          console.log(error);
        }
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
