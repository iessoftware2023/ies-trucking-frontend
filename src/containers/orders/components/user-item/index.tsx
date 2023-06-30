import { DownOutlined } from "@ant-design/icons";
import { useCallback } from "react";
import { twMerge } from "tailwind-merge";

import { UserAvatar } from "@/components/elements";

type IProps = {
  id: string;
  name: string;
  description: string;
  isSelect?: boolean;
  className?: string;

  onClick?: (id: string) => void;
};

export const UserItem: React.FC<IProps> = ({
  id,
  name,
  description,
  isSelect,
  className,

  onClick,
}) => {
  const handleClick = useCallback(() => {
    onClick?.(id);
  }, [onClick, id]);

  return (
    <div
      className={twMerge("flex items-center space-x-2", className)}
      onClick={handleClick}
      aria-hidden="true"
    >
      <UserAvatar size="default" name={name} />

      <div className="flex-1">
        <div className="font-semibold">{name}</div>
        <div className="text-gray-400">{description}</div>
      </div>

      {isSelect && (
        <span>
          <DownOutlined className="text-sm text-gray-400" />
        </span>
      )}
    </div>
  );
};
