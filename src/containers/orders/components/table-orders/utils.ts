import { parsePhoneNumber } from "libphonenumber-js";

import { IBooking, IOrder } from "@/models/operator";

import { ITableRow } from ".";

export const convertBookingsToTable = (bookings: IBooking[]): ITableRow[] => {
  return bookings.map((booking) => {
    return {
      id: booking.id,
      bookingId: booking.id,
      orderId: null,
      code: booking.code,
      bookingStatus: booking.status,
      orderStatus: null,
      driver: null,
      drivers: booking.drivers ?? [],
      pickUpLocation: booking.pickup?.address,
      pickUpTime: booking.pickupTime,
      deliveryLocation: booking.dropoff?.address,
      deliveryTime: booking.dropoffTime,
      typeOfTruck: booking.truckType?.name,
      customer: {
        name: booking.customerFullName,
        phone: booking.pickup?.phoneNumber,
      },
      total: {
        cost: booking.cost,
        currency: booking.currency,
      },
    };
  });
};

export const convertOrdersToTable = (orders: IOrder[]): ITableRow[] => {
  return orders.map((order) => {
    return {
      id: order.id,
      bookingId: order.booking?.id,
      orderId: order.id,
      code: order.booking?.code,
      bookingStatus: order.booking?.status,
      orderStatus: order.status,
      driver: {
        id: order.driver?.id,
        name: order.driver?.name,
        phoneNumber: order.driver?.phoneNumber,
      },
      drivers: order.booking?.drivers ?? [],
      pickUpLocation: order.booking?.pickup?.address,
      pickUpTime: order.booking?.pickupTime,
      deliveryLocation: order.booking?.dropoff?.address,
      deliveryTime: order.booking?.dropoffTime,
      typeOfTruck: order.truck?.truckType?.name,
      customer: {
        name: order.booking?.pickup?.fullName,
        phone: order.booking?.pickup?.phoneNumber,
      },
      total: {
        cost: order.booking?.cost,
        currency: order.booking?.currency,
      },
    };
  });
};

export const getBookingSearchField = (booking: IBooking) => {
  const arr = [
    booking.truckType?.name,
    booking.pickup?.address,
    booking.dropoff?.address,
  ];

  return arr.join("|");
};

export const getOrderSearchField = (order: IOrder) => {
  const parsedDriverPhone = parsePhoneNumber(order.driver?.phoneNumber);

  const arr = [
    parsedDriverPhone.formatInternational().replace(/\s/g, ""),
    parsedDriverPhone.formatNational().replace(/\s/g, ""),
    order.driver?.name,
    order.truck?.truckType?.name,
    order.booking?.pickup?.address,
    order.booking?.dropoff?.address,
    order.truck?.licensePlate,
  ];

  return arr.join("|");
};
