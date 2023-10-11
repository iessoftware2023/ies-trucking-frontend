import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import envGlobal from "env";
import React, { memo, useCallback, useEffect, useMemo } from "react";

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

enum TravelMode {
  /**
   * Specifies a bicycling directions request.
   */
  BICYCLING = "BICYCLING",
  /**
   * Specifies a driving directions request.
   */
  DRIVING = "DRIVING",
  /**
   * Specifies a transit directions request.
   */
  TRANSIT = "TRANSIT",
  /**
   * Specifies a walking directions request.
   */
  WALKING = "WALKING",
}

export type ILatLng = {
  lat: number;
  lng: number;
};

type IProps = {
  pickup: ILatLng;
  dropoff: ILatLng;
  origin: ILatLng;
  destination: ILatLng;
  driverLocation: ILatLng;
};

const TrackingMapsCom: React.FC<IProps> = ({
  pickup,
  dropoff,
  //
  origin,
  destination,
  driverLocation,
}) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const mapRef = React.useRef<google.maps.Map | null>(null);

  const [directions, setDirections] =
    React.useState<google.maps.DirectionsResult>(null);

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

  useEffect(() => {
    if (!driverLocation || !mapRef.current) {
      return;
    }

    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(driverLocation);
    bounds.extend(destination);

    fitBounds(bounds);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [driverLocation]);

  const getBoundsFromDirectionsResponse = useCallback(
    (response: google.maps.DirectionsResult): google.maps.LatLngBounds => {
      if (!response.routes.length) {
        return null;
      }

      const bounds = new window.google.maps.LatLngBounds();
      const route = response.routes[0];

      for (let i = 0; i < route.legs.length; i++) {
        const leg = route.legs[i];
        bounds.extend(leg.start_location);
        bounds.extend(leg.end_location);
      }

      return bounds;
    },
    []
  );

  const handleDirectionsReady = useCallback(
    (
      response: google.maps.DirectionsResult,
      status: google.maps.DirectionsStatus
    ) => {
      if (status !== google.maps.DirectionsStatus.OK) {
        return;
      }

      const bounds = getBoundsFromDirectionsResponse(response);
      setDirections(response);
      fitBounds(bounds);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleMapLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    mapRef.current = map;
  }, []);

  const directionsServiceOptions =
    useMemo<google.maps.DirectionsRequest>(() => {
      return {
        origin,
        destination,
        travelMode: TravelMode.DRIVING,
        optimizeWaypoints: true,
      };
    }, [origin, destination]);

  if (!isLoaded) {
    return null;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      onLoad={handleMapLoad}
    >
      <Marker
        title="Origin"
        position={pickup}
        options={{
          icon: {
            url: "/images/maps/maps-pickup@2x.png",
            scaledSize: new google.maps.Size(MARKER_SIZE, MARKER_SIZE),
          },
        }}
        zIndex={1}
      />

      <Marker
        title="Destination"
        position={dropoff}
        options={{
          icon: {
            url: "/images/maps/maps-dropoff@2x.png",
            scaledSize: new google.maps.Size(MARKER_SIZE, MARKER_SIZE),
          },
        }}
        zIndex={2}
      />

      {driverLocation.lat && driverLocation.lng && (
        <Marker
          title="Driver"
          position={driverLocation}
          options={{
            icon: {
              url: "/images/maps/maps-driver@2x.png",
              scaledSize: new google.maps.Size(MARKER_SIZE, MARKER_SIZE),
            },
          }}
          zIndex={3}
        />
      )}

      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            polylineOptions: {
              strokeColor: "#1A1528",
              strokeWeight: 4,
            },
            suppressMarkers: true,
          }}
        />
      )}

      <DirectionsService
        options={directionsServiceOptions}
        callback={handleDirectionsReady}
      />
    </GoogleMap>
  );
};

export const TrackingMaps = memo(TrackingMapsCom);
