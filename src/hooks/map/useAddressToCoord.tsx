import { useEffect, useState } from "react";
import {
  addressToCoordFromJson,
  AddressToCoordModel,
} from "../../models/map/AddressToCoord";

const baseUrl: string = "//dapi.kakao.com/v2/local/search/address.json?";

export default function useAddressToCoord(props: AddressToCoordEntry) {
  const [coords, setCoords] = useState<{
    [key: string]: [AddressToCoordModel, name: string];
  } | null>(null);

  useEffect(() => {
    if (!props.address || !props.placeName) return;
    if (props.address?.length === 0) return;
    if (props.address?.length > 50) return;
    const fetchCoordinates = async (): Promise<void> => {
      try {
        setCoords({});
        const results = await Promise.all(
          props.address.map(async (address, index) => {
            const placName = props.placeName[index];
            const basicParams: { [key: string]: string } = { query: address };
            const urlParams = new URLSearchParams(basicParams);
            const fetchUrl = `${baseUrl}${urlParams.toString()}`;
            const response = await fetch(fetchUrl, {
              headers: {
                Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
                "content-type": "application/json;charset=UTF-8",
              },
              method: "GET",
            });
            if (!response.ok) {
              throw new Error(`${response.statusText}`);
            }
            const jsonResponse = await response.json();
            const toReturn: AddressToCoordModel =
              addressToCoordFromJson(jsonResponse);

            return {
              address: address,
              toReturn: toReturn,
              placName: placName,
            };
          }),
        );

        setCoords((prev) => {
          const newCoords = { ...prev };
          results.forEach((e) => {
            newCoords[e.placName] = [e.toReturn, e.placName];
          });
          return newCoords;
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoordinates();
  }, [JSON.stringify(props.address), JSON.stringify(props.placeName)]);

  return { coords };
}

interface AddressToCoordEntry {
  address: string[];
  placeName: string[];
}
