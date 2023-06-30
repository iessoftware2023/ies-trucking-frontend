import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  Marker,
  // Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import envGlobal from "env";
import React, { memo, useCallback } from "react";

const { GOOGLE_MAPS_API_KEY } = envGlobal();

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
  origin: ILatLng;
  destination: ILatLng;
  driverLocation: ILatLng;
};

const TrackingMapsCom: React.FC<IProps> = ({
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

  const fitMapBounds = useCallback((response: google.maps.DirectionsResult) => {
    if (!response.routes.length) {
      return;
    }

    const bounds = new window.google.maps.LatLngBounds();

    const route = response.routes[0];

    for (let i = 0; i < route.legs.length; i++) {
      const leg = route.legs[i];
      bounds.extend(leg.start_location);
      bounds.extend(leg.end_location);
    }

    mapRef.current.fitBounds(bounds, {
      bottom: 10,
      left: 10,
      right: 10,
      top: 10,
    });
  }, []);

  const handleDirectionsReady = useCallback(
    (
      response: google.maps.DirectionsResult,
      status: google.maps.DirectionsStatus
    ) => {
      console.log("onDirectionsReady", status, response);

      if (status !== google.maps.DirectionsStatus.OK) {
        return;
      }

      setDirections(response);
      fitMapBounds(response);
    },
    [fitMapBounds]
  );

  const handleMapLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    mapRef.current = map;
  }, []);

  const directionsServiceOptions = React.useMemo(() => {
    return {
      origin,
      destination,
      travelMode: TravelMode.DRIVING,
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
        position={origin}
        icon="/images/maps/map-pickup.png"
      />

      <Marker
        title="Destination"
        position={destination}
        icon="/images/maps/map-dropoff.png"
      />

      {driverLocation && (
        <Marker
          title="Driver"
          position={driverLocation}
          icon="/images/maps/driver-location.png"
        />
      )}

      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            polylineOptions: {
              strokeColor: "black",
              strokeWeight: 3,
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
