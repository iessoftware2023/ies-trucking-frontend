/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from "react";

import { TrackingMaps } from "@/containers/booking-details/components";
import { IDriverDetail } from "@/models/dashboard-store";

interface IProps {
  driver: IDriverDetail;
}

export const TrackingMap: React.FC<IProps> = ({ driver }) => {
  const origin = useMemo(() => {
    switch (driver.orders.at(0)?.status) {
      case "on_the_way_to_pickup":
        return {
          lat: driver.orders.at(0)?.tracking.current?.lat,
          lng: driver.orders.at(0)?.tracking.current?.lng,
        };
      case "order_pickup":
        return {
          lat: driver.orders.at(0)?.booking?.pickup?.latitude,
          lng: driver.orders.at(0)?.booking?.pickup?.longitude,
        };
      case "on_the_way_to_dropoff":
        return {
          lat: driver.orders.at(0)?.booking?.pickup?.latitude,
          lng: driver.orders.at(0)?.booking?.pickup?.longitude,
        };
    }
  }, [
    driver.orders.at(0)?.tracking.current?.lat,
    driver.orders.at(0)?.tracking.current?.lng,
    driver.orders.at(0)?.booking?.pickup?.latitude,
    driver.orders.at(0)?.booking?.pickup?.longitude,
    driver.orders.at(0)?.status,
  ]);

  const destination = useMemo(() => {
    switch (driver.orders.at(0)?.status) {
      case "on_the_way_to_pickup":
        return {
          lat: driver.orders.at(0)?.booking?.pickup?.latitude,
          lng: driver.orders.at(0)?.booking?.pickup?.longitude,
        };
      case "order_pickup":
        return {
          lat: driver.orders.at(0)?.booking?.dropoff?.latitude,
          lng: driver.orders.at(0)?.booking?.dropoff?.longitude,
        };
      case "on_the_way_to_dropoff":
        return {
          lat: driver.orders.at(0)?.booking?.dropoff?.latitude,
          lng: driver.orders.at(0)?.booking?.dropoff?.longitude,
        };
    }
  }, [
    driver.orders.at(0)?.booking?.pickup?.latitude,
    driver.orders.at(0)?.booking?.pickup?.longitude,
    driver.orders.at(0)?.booking?.dropoff?.latitude,
    driver.orders.at(0)?.booking?.dropoff?.longitude,
    driver.orders.at(0)?.status,
  ]);

  return (
    <TrackingMaps
      origin={origin}
      destination={destination}
      driverLocation={{
        lat: driver.orders.at(0)?.tracking.current?.lat,
        lng: driver.orders.at(0)?.tracking.current?.lng,
      }}
      pickup={{
        lat: driver.orders.at(0)?.booking?.pickup?.latitude,
        lng: driver.orders.at(0)?.booking?.pickup?.longitude,
      }}
      dropoff={{
        lat: driver.orders.at(0)?.booking?.dropoff?.latitude,
        lng: driver.orders.at(0)?.booking?.dropoff?.longitude,
      }}
    />
  );
};
