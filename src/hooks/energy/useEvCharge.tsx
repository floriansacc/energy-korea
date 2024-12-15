import { useEffect, useState } from "react";
import {
  EvChargeModel,
  evChargeModelFromJson,
} from "../../models/energy/EvChargeModel";

const endpointUrl: string = "/kepcoapi//EVcharge.do";

// const collectionName: string = "ev-charge";

export default function useEvCharge(props: UseEvChargeEntry) {
  const [evCharge, setEvCharge] = useState<EvChargeModel | null>(null);

  // const docName: string = `${props.cityCode}${props.townCode ? `-${props.townCode}` : ""}`;

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
      setEvCharge(null);
      // const dbData: DocumentSnapshot = await getDoc(
      //   doc(db, collectionName, docName),
      // );

      // if (dbData.exists()) {
      //   console.log("ev charge from firebase");
      // } else {
      console.log("fetch ev charge");
      const fetchUrl = `${endpointUrl}?${urlParams}`;
      try {
        const response = await fetch(fetchUrl, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        });
        if (!response.ok) {
          const errorResponse: EvChargeModel = await response.json();
          setEvCharge(errorResponse);

          throw new Error(
            `error code ${errorResponse.errCd}, ${errorResponse.errMsg}`,
          );
        }
        const jsonResponse: EvChargeModel = evChargeModelFromJson(
          await response.json(),
        );

        setEvCharge(jsonResponse);

        // await setDoc(doc(db, collectionName, docName), jsonResponse);
      } catch (error) {
        console.log(error);
      }
      // }
    };

    getEvCharge();
  }, [props.cityCode, props.townCode]);

  return { evCharge };
}

interface UseEvChargeEntry {
  cityCode: string | null;
  townCode?: string | null;
}
