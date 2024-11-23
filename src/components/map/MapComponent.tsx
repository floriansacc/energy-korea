import { Map, MapMarker } from "react-kakao-maps-sdk";

export default function MapComponent(props: MapComponentProps) {
  return (
    <div className="h-[500px] w-[500px] border border-solid border-black">
      <Map
        center={{
          lat: props?.location?.latitude ?? 37.526126,
          lng: props?.location?.longitude ?? 126.922255,
        }}
        level={4}
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
        {props?.location && (
          <MapMarker
            position={{
              lat: props?.location?.latitude,
              lng: props?.location?.longitude,
            }}
            clickable={true}
          >
            <div className="flex bg-transparent text-black">My location</div>
          </MapMarker>
        )}
      </Map>
    </div>
  );
}

interface MapComponentProps {
  location: GeolocationCoordinates | null;
}
