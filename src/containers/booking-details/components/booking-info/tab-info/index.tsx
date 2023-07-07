import { Tag } from "antd";
import React from "react";

import { AssignDriver } from "@/containers/booking-list/components/assign-driver";
import { checkCanAssignDriver } from "@/containers/booking-list/utils";
import { IBooking, IOrder } from "@/models/operator";
import { formatDate, phoneFormat } from "@/utils/string";

import { LocationItem } from "./LocationItem";

type IProps = {
  booking: IBooking;
  order: IOrder;

  onAssignDriver: (bookingId: string, driverId: string) => Promise<boolean>;
};

export const TabInfo: React.FC<IProps> = ({
  booking,
  order,

  onAssignDriver,
}) => {
  const cargoSizes = [
    booking?.cargoSize?.width,
    booking?.cargoSize?.height,
    booking?.cargoSize?.length,
  ].filter((e) => e);

  return (
    <div className="space-y-4 p-4">
      <div className="space-x-1">
        <span className="text-gray-400">Booking time:</span>
        <span className="font-semibold">{formatDate(booking?.createdAt)}</span>
      </div>

      <div className="rounded-lg border p-4">
        <div className="relative">
          <div className="absolute left-1.5 h-full border-[0.5px] border-dashed border-neutral-500" />

          <div className="space-y-2">
            <LocationItem
              type="src"
              address={booking?.pickup?.address}
              time={booking?.pickupTime}
            />
            <LocationItem
              type="dest"
              address={booking?.dropoff?.address}
              time={booking?.dropoffTime}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 rounded-lg border p-4 xl:grid-cols-2">
        <div>
          <div>
            <div className="mb-1 uppercase text-gray-400">Driver</div>

            <AssignDriver
              bookingId={booking?.id}
              driver={order?.driver}
              driverOptions={order?.booking?.drivers ?? []}
              onAssignDriver={onAssignDriver}
              readOnly={!checkCanAssignDriver(booking?.status, order?.status)}
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="uppercase text-gray-400">Type of Truck</div>

          <div className="flex items-center space-x-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={encodeURI(
                `/icons/truck-types/png/${booking?.truckType?.name}.png`
              )}
              alt=""
              className="h-3"
            />
            <div>{booking?.truckType?.name}</div>
          </div>

          {order?.truck?.licensePlate && (
            <div>
              <Tag style={{ borderRadius: 4 }}>
                {order?.truck?.licensePlate}
              </Tag>
            </div>
          )}
        </div>

        <div>
          <div className="mb-1 uppercase text-gray-400">Parking lot name</div>
          <div>{booking?.parking?.name}</div>
        </div>
      </div>

      <div className="grid gap-4 rounded-lg border p-4 xl:grid-cols-2">
        <div className="space-y-4">
          <div>
            <div className="up mb-1 uppercase text-gray-400">Sender info</div>
            <div className="font-semibold">{booking?.pickup?.fullName}</div>
            <div>{phoneFormat(booking?.pickup?.phoneNumber)}</div>
          </div>

          <div>
            <div className="up mb-1 uppercase text-gray-400">DELIVERY ITEM</div>
            <div className="flex flex-wrap gap-1">
              {booking?.cargoType && <Tag>{booking?.cargoType?.name}</Tag>}

              {booking?.cargoWeight && (
                <Tag>{booking?.cargoWeight?.description}</Tag>
              )}

              {cargoSizes.length > 0 && (
                <Tag>{cargoSizes.map((e) => `${e}m`).join(" x ")}</Tag>
              )}
            </div>
          </div>

          <div>
            <div className="up mb-1 uppercase text-gray-400">CUSTOMER INFO</div>
            <div className="font-semibold">{booking?.customerFullName}</div>
            <div>{phoneFormat(booking?.customer?.phoneNumber)}</div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="up mb-1 uppercase text-gray-400">
              Recipient Info
            </div>
            <div className="font-semibold">{booking?.dropoff?.fullName}</div>
            <div>{phoneFormat(booking?.dropoff?.phoneNumber)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
