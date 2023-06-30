import { IconDestination } from "@/components/icons";
import { formatDate } from "@/utils/string";

export const LOCATION_OBJ = {
  src: {
    icon: <div className="flex h-3 w-3 bg-gray-600" />,
    mask: {
      top: 0,
      bottom: undefined,
    },
  },
  dest: {
    icon: <IconDestination size={12} className="text-yellow-500" />,
    mask: {
      top: undefined,
      bottom: 0,
    },
  },
};

export const LocationItem: React.FC<{
  type: keyof typeof LOCATION_OBJ;
  address: string;
  time: string;
}> = ({ type, address, time }) => {
  const obj = LOCATION_OBJ[type];

  return (
    <div className="relative flex items-center">
      <div
        className="absolute flex h-1/2 w-3 bg-white"
        style={{ top: obj.mask.top, bottom: obj.mask.bottom }}
      />

      <div className="z-1 mr-4">{obj.icon}</div>

      <div className="flex-1 space-y-1">
        <div>{address}</div>

        <div className="flex items-center space-x-1 text-gray-500">
          <i className="far fa-clock" />
          <span>{formatDate(time)}</span>
        </div>
      </div>
    </div>
  );
};
