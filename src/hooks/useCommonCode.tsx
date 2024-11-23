import { useEffect, useState } from "react";
import {
  CommonCodeEnum,
  CommonCodeModel,
  commonCodeModelFromJson,
} from "../models/CommonCode";
import { doc, DocumentSnapshot, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const endpointUrl: string = "/kepcoapi/commonCode.do";

const collectionName: string = "common-code";

export default function useCommonCode(props: UseCommonCodeProps) {
  const [commonCode, setCommonCode] = useState<CommonCodeModel | null>(null);

  const basicParams: { [key: string]: string } = {
    ...(props.codeTy && { codeTy: props.codeTy.toString() }),
    returnType: "json",
    apiKey: import.meta.env.VITE_DATA_KEPCO_API_KEY ?? "",
  };

  const urlParams = new URLSearchParams(basicParams);

  const docName: string = `${props.codeTy}`;

  useEffect(() => {
    if (!props.codeTy) return;

    const getCommonCode = async (): Promise<void> => {
      const dbData: DocumentSnapshot = await getDoc(
        doc(db, collectionName, docName),
      );

      if (dbData.exists()) {
        console.log("common code from firebase");
        setCommonCode(commonCodeModelFromJson(dbData.data()));
      } else {
        console.log("fetch common code");
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
          const jsonResponse: CommonCodeModel = commonCodeModelFromJson(
            await response.json(),
          );

          setCommonCode(jsonResponse);

          await setDoc(doc(db, collectionName, docName), jsonResponse);
          console.log("save common code to firebase");
        } catch (error) {
          console.log(error);
        }
      }
    };

    getCommonCode();
  }, []);
  return { commonCode };
}

interface UseCommonCodeProps {
  codeTy: CommonCodeEnum | null;
}
