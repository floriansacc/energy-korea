import { useEffect, useState } from "react";
import {
  elecHomeFromJson,
  ElecHomeModel,
} from "../../models/energy/ElecHomeModel";
import { doc, DocumentSnapshot, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";

const endpointUrl: string = "/kepcoapi/powerUsage/houseAve.do";

const collectionName: string = "elec-home";

export default function useElecHome(props: UseElecHomeEntry) {
  const [elecHome, setElecHome] = useState<ElecHomeModel | null>(null);

  const docName: string = `${props.year}-${props.month},${props.cityCode}${props.townCode ? `-${props.townCode}` : ""}`;

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
      setElecHome(null);
      const dbData: DocumentSnapshot = await getDoc(
        doc(db, collectionName, docName),
      );

      if (dbData.exists()) {
        console.log("elec home from firebase");
        setElecHome(elecHomeFromJson(dbData.data()));
      } else {
        console.log("fetch elec home");

        const fetchUrl = `${endpointUrl}?${urlParams}`;
        try {
          const response = await fetch(fetchUrl, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "GET",
          });
          if (!response.ok) {
            const errorResponse: ElecHomeModel = await response.json();
            setElecHome(errorResponse);

            throw new Error(
              `error code ${errorResponse.errCd}, ${errorResponse.errMsg}`,
            );
          }
          const jsonResponse: ElecHomeModel = elecHomeFromJson(
            await response.json(),
          );

          setElecHome(jsonResponse);

          await setDoc(doc(db, collectionName, docName), jsonResponse);
          console.log("elec home saved in firebase");
        } catch (error) {
          console.log(error);
        }
      }
    };

    getElecHome();
  }, [props.cityCode, props.townCode, props.year, props.month]);

  return { elecHome };
}

interface UseElecHomeEntry {
  year: number | null;
  month: number | null;
  cityCode: string | null;
  townCode?: string | null;
}
