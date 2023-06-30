import { IIcon } from "./types";

export const IconDestination = ({ size = 24, className }: IIcon) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="7.4994" cy="7.4994" r="4.03846" fill="currentColor" />
    </svg>
  );
};
