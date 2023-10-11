import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import envGlobal from "env";
import React, { memo, useCallback, useEffect } from "react";

const { GOOGLE_MAPS_API_KEY } = envGlobal();

const MARKER_SIZE = 32;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: LATITUDE_DELTA,
  lng: LONGITUDE_DELTA,
};

export type ILatLng = {
  lat: number;
  lng: number;
};

type IProps = {
  parkingLocation: ILatLng;
};

const ParkingMapsCom: React.FC<IProps> = ({ parkingLocation }) => {
  console.log("📢 parkingLocation", parkingLocation);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const mapRef = React.useRef<google.maps.Map | null>(null);

  const fitBounds = useCallback((bounds: google.maps.LatLngBounds) => {
    if (!bounds || !mapRef.current) {
      return;
    }

    mapRef.current &&
      mapRef.current.fitBounds(bounds, {
        bottom: 56,
        left: 56,
        right: 56,
        top: 56,
      });
  }, []);

  const handleMapLoad = useCallback(
    (map: google.maps.Map) => {
      mapRef.current = map;
      map.setZoom(15);
      const pt = new google.maps.LatLng(
        parkingLocation.lat,
        parkingLocation.lng
      );

      map.setCenter(pt);
    },
    [parkingLocation]
  );

  if (!isLoaded) {
    return null;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      onLoad={handleMapLoad}
    >
      {parkingLocation.lat && parkingLocation.lng && (
        <Marker
          title="Driver"
          position={parkingLocation}
          options={{
            icon: {
              url: "/images/maps/maps-driver@2x.png",
              scaledSize: new google.maps.Size(MARKER_SIZE, MARKER_SIZE),
            },
          }}
          zIndex={3}
        />
      )}
    </GoogleMap>
  );
};

export const ParkingMaps = memo(ParkingMapsCom);
