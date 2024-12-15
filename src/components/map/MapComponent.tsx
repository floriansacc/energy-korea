import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

export default function MapComponent(props: MapComponentProps) {
  const [legendOpen, setLegendOpen] = useState<boolean[]>([]);

  useEffect(() => {
    props.mapMarkers && setLegendOpen(props.mapMarkers.map((_) => false));
  }, [props.mapMarkers]);

  return (
    <Map
      center={{
        lat:
          props?.mapMarkers?.[0]?.lat ?? props?.location?.latitude ?? 37.526126,
        lng:
          props?.mapMarkers?.[0]?.lng ??
          props?.location?.longitude ??
          126.922255,
      }}
      level={props?.mapMarkers?.[0]?.lng ? 6 : 4}
      className="h-full w-full"
    >
      {/* <Polyline
              path={
                routePathList?.msgBody.itemList.map((e) => ({
                  lat: e.gpsY,
                  lng: e.gpsX,
                })) ?? []
              }
              strokeWeight={3} // 선의 두께입니다
              strokeColor={"#000"} // 선의 색깔입니다
              strokeOpacity={0.8} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
              strokeStyle={"solid"} // 선의 스타일입니다
            /> */}
      {/* <MarkerClusterer averageCenter={true} minLevel={10}> */}
      {props.mapMarkers &&
        props.mapMarkers?.map(
          (e, i) =>
            e.lat &&
            e.lng && (
              <MapMarker
                key={`${e.lat}-${e.lng}-${i}`}
                position={{
                  lat: e.lat,
                  lng: e.lng,
                }}
                clickable={true}
                onClick={() =>
                  setLegendOpen((prev) => {
                    const newValues = [...prev];
                    newValues[i] = !newValues[i];
                    return newValues;
                  })
                }
              >
                {legendOpen[i] && (
                  <div
                    id={`name-${e.lat}-${e.lng}`}
                    className="flex w-fit bg-transparent text-sm text-black"
                  >
                    {e.name}
                  </div>
                )}
              </MapMarker>
            ),
        )}
      {/* </MarkerClusterer> */}
      {props?.location && (
        <MapMarker
          key={`${props?.location?.latitude}-${props?.location?.longitude}`}
          position={{
            lat: props?.location?.latitude,
            lng: props?.location?.longitude,
          }}
          clickable={true}
        >
          <div className="bg-transparent text-sm text-black">My location</div>
        </MapMarker>
      )}
    </Map>
  );
}

interface MapComponentProps {
  location: GeolocationCoordinates | null;
  mapMarkers: {
    lat: number | null;
    lng: number | null;
    name: string;
  }[];
}
