/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from "react";

import { TrackingMaps } from "@/containers/booking-details/components";
import { IDriverDetail } from "@/models/dashboard-store";

interface IProps {
  orders: IDriverDetail["orders"];
}

export const TrackingMap: React.FC<IProps> = ({ orders }) => {
  const origin = useMemo(() => {
    switch (orders.at(0)?.status) {
      case "on_the_way_to_pickup":
        return {
          lat: orders.at(0)?.tracking.current?.lat,
          lng: orders.at(0)?.tracking.current?.lng,
        };
      case "order_pickup":
        return {
          lat: orders.at(0)?.booking?.pickup?.latitude,
          lng: orders.at(0)?.booking?.pickup?.longitude,
        };
      case "on_the_way_to_dropoff":
        return {
          lat: orders.at(0)?.booking?.pickup?.latitude,
          lng: orders.at(0)?.booking?.pickup?.longitude,
        };
    }
  }, [
    orders.at(0)?.tracking.current?.lat,
    orders.at(0)?.tracking.current?.lng,
    orders.at(0)?.booking?.pickup?.latitude,
    orders.at(0)?.booking?.pickup?.longitude,
    orders.at(0)?.status,
  ]);

  const destination = useMemo(() => {
    switch (orders.at(0)?.status) {
      case "on_the_way_to_pickup":
        return {
          lat: orders.at(0)?.booking?.pickup?.latitude,
          lng: orders.at(0)?.booking?.pickup?.longitude,
        };
      case "order_pickup":
        return {
          lat: orders.at(0)?.booking?.dropoff?.latitude,
          lng: orders.at(0)?.booking?.dropoff?.longitude,
        };
      case "on_the_way_to_dropoff":
        return {
          lat: orders.at(0)?.booking?.dropoff?.latitude,
          lng: orders.at(0)?.booking?.dropoff?.longitude,
        };
    }
  }, [
    orders.at(0)?.booking?.pickup?.latitude,
    orders.at(0)?.booking?.pickup?.longitude,
    orders.at(0)?.booking?.dropoff?.latitude,
    orders.at(0)?.booking?.dropoff?.longitude,
    orders.at(0)?.status,
  ]);

  return (
    <TrackingMaps
      origin={origin}
      destination={destination}
      driverLocation={{
        lat: orders.at(0)?.tracking.current?.lat,
        lng: orders.at(0)?.tracking.current?.lng,
      }}
      pickup={{
        lat: orders.at(0)?.booking?.pickup?.latitude,
        lng: orders.at(0)?.booking?.pickup?.longitude,
      }}
      dropoff={{
        lat: orders.at(0)?.booking?.dropoff?.latitude,
        lng: orders.at(0)?.booking?.dropoff?.longitude,
      }}
    />
  );
};
