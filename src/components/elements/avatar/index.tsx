import { Avatar } from "antd";
import { AvatarSize } from "antd/es/avatar/SizeContext";
import React from "react";

// import { getAvatarText, getColorFromText } from "./utils";

type IProps = {
  name: string;
  size?: AvatarSize;
};

export const UserAvatar: React.FC<IProps> = ({ name, size = "default" }) => {
  // const avatarText = getAvatarText(name, 2);

  return (
    <Avatar size={size} src="/images/avatar@2x.png" alt={name} />
    // <Avatar
    //   size={size}
    //   style={{ backgroundColor: getColorFromText(avatarText) }}
    // >
    //   {avatarText}
    // </Avatar>
  );
};
