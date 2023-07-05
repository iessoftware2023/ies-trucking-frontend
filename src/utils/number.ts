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
    return `${numberFormat(n, options)}m`;
  }

  return `${numberFormat(n / 1000, options)}km`;
};

export const durationFormat = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const list = [];

  if (hours > 0) {
    list.push(pluralize(hours, "hour"));
  }

  if (minutes > 0) {
    list.push(pluralize(minutes, "minute"));
  }

  return list.join(" ");
};
