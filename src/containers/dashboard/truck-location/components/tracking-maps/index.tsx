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
  packings: ILatLng[];
  trucks: ILatLng[];
};

const TrackingMapsCom: React.FC<IProps> = ({ packings, trucks }) => {
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
        bottom: 20,
        left: 20,
        right: 20,
        top: 56,
      });
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    const bounds = new window.google.maps.LatLngBounds();

    packings.map((packing) => {
      bounds.extend(packing);
    });

    fitBounds(bounds);
  }, [fitBounds, packings]);

  const handleMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  if (!isLoaded) {
    return null;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      onLoad={handleMapLoad}
    >
      {packings.map((packing, index) => (
        <Marker
          key={index}
          title="packing"
          position={packing}
          options={{
            icon: {
              url: "/images/maps/truck-inactive@3x.png",
              scaledSize: new google.maps.Size(MARKER_SIZE, MARKER_SIZE),
            },
          }}
          zIndex={1}
        />
      ))}
      {trucks.map((truck, index) => (
        <Marker
          key={index}
          title="truck"
          position={truck}
          options={{
            icon: {
              url: "/images/maps/truck-active@3x.png",
              scaledSize: new google.maps.Size(MARKER_SIZE, MARKER_SIZE),
            },
          }}
          zIndex={1}
        />
      ))}
    </GoogleMap>
  );
};

export const TrackingMaps = memo(TrackingMapsCom);
