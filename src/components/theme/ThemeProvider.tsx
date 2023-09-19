"use client";

import { ConfigProvider } from "antd";
import { PropsWithChildren, useEffect, useState } from "react";

import { AntdProvider } from "./AntdProvider";

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

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
          Menu: {
            itemBg: "#32394d",
          },
          Layout: {
            colorBgBody: "transparent",
          },
          Segmented: {
            colorBgLayout: "transparent",
            controlPaddingHorizontal: 16,
            itemSelectedBg: "#282D3D",
            borderRadius: 999,
          },
        },
      }}
    >
      <AntdProvider>{children}</AntdProvider>
    </ConfigProvider>
  );
};
