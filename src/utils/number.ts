import { pluralize } from "./string";

type INumberFormatOptions = {
  locale?: string;
  fractionDigits?: number;
  isCompact?: boolean;
};

export const numberFormat = (
  n: number,
  options?: INumberFormatOptions
): string => {
  const _options: INumberFormatOptions = {
    locale: "vi-US",
    fractionDigits: 1,
    isCompact: false,
    ...options,
  };

  return new Intl.NumberFormat(_options.locale, {
    notation: _options.isCompact ? "compact" : "standard",
    maximumFractionDigits: _options.fractionDigits,
    minimumFractionDigits: 0,
  }).format(n);
};

type ICurrencyFormatOptions = {
  locale?: string;
  currency: string;
  fractionDigits?: number;
  isCompact?: boolean;
  currencyDisplay?: "symbol" | "narrowSymbol" | "code" | "name";
};

export const currencyFormat = (n: number, options: ICurrencyFormatOptions) => {
  const _options: ICurrencyFormatOptions = {
    locale: "en-US",
    currency: "AUD",
    fractionDigits: 2,
    isCompact: false,
    currencyDisplay: "code",
    ...options,
  };

  return new Intl.NumberFormat(_options.locale, {
    style: "currency",
    currency: _options.currency || "AUD",
    notation: _options.isCompact ? "compact" : "standard",
    maximumFractionDigits: _options.fractionDigits,
    minimumFractionDigits: 0,
    currencyDisplay: _options.currencyDisplay || "code",
  }).format(n);
};

export const distanceFormat = (n: number, options?: INumberFormatOptions) => {
  if (n < 1000) {
    return `${numberFormat(n, options)} m`;
  }

  return `${numberFormat(n / 1000, options)} km`;
};

export const durationFormat = (seconds: number) => {
  const MINUTE_IN_SECONDS = 60;
  const HOUR_IN_SECONDS = MINUTE_IN_SECONDS * 60;
  const DAY_IN_SECONDS = HOUR_IN_SECONDS * 24;

  const days = Math.floor(seconds / DAY_IN_SECONDS);
  seconds %= DAY_IN_SECONDS;
  const hours = Math.floor(seconds / HOUR_IN_SECONDS);
  seconds %= HOUR_IN_SECONDS;
  const minutes = Math.floor(seconds / MINUTE_IN_SECONDS);
  seconds %= MINUTE_IN_SECONDS;

  const resultArray: string[] = [];

  if (days) resultArray.push(pluralize(days, "day"));
  if (hours) resultArray.push(pluralize(hours, "hour"));
  if (minutes) resultArray.push(pluralize(minutes, "minute"));
  if (seconds) resultArray.push(pluralize(seconds, "second"));

  const result = resultArray.join(" ") || "0 second";

  return result;
};
