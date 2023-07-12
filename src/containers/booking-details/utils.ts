export const extractLatLngFromModel = (location: {
  latitude?: number;
  longitude?: number;
  lat?: number;
  lng?: number;
}) =>
  location
    ? {
        lat: location?.latitude ?? location?.lat,
        lng: location?.longitude ?? location?.lng,
      }
    : null;
