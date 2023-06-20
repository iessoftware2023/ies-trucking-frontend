"use client";

import { ConfigProvider } from "antd";
import { PropsWithChildren, useEffect, useState } from "react";

import { AntdProvider } from "./AntdProvider";

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="hidden">{children}</div>;
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#FFD523",
        },
        components: {
          Checkbox: {
            colorPrimary: "#282D3D",
            colorPrimaryHover: "#282D3D",
          },
        },
      }}
    >
      <AntdProvider>{children}</AntdProvider>
    </ConfigProvider>
  );
};
