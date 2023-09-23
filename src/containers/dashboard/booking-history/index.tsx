import Image from "next/image";
import bookingHistoryChart from "public/images/booking-history-chart.png";
import React from "react";

export const BookingHistory = () => {
  return (
    <div className="flex flex-1 flex-col items-start justify-start gap-2.5 rounded border border-sky-100 bg-white p-4">
      <div className="inline-flex items-center justify-between self-stretch">
        <div className="inline-flex flex-col items-start justify-start">
          <div className="font-Inter text-base font-normal leading-normal text-black">
            Booking History
          </div>
        </div>
        <div className="flex items-start justify-start gap-6 self-stretch">
          <div className="flex items-end justify-center gap-3">
            {["7 days", "15 days", "30 days"].map((d, idx) => (
              <div
                key={idx}
                className="flex cursor-pointer items-center justify-center gap-2.5 rounded bg-indigo-600/10 px-2 py-0.5 hover:bg-indigo-600/50"
              >
                <div className="text-center font-Inter text-xs font-normal leading-[18px] text-indigo-600">
                  {d}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-[0px] self-stretch border border-stone-300"></div>
      <Image src={bookingHistoryChart} alt="booking history chart" />
    </div>
  );
};
