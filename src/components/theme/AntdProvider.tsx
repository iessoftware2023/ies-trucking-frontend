"use client";

import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import { useServerInsertedHTML } from "next/navigation";
import { PropsWithChildren, useState } from "react";
import React from "react";

export const AntdProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [cache] = useState(() => createCache());

  const render = <>{children}</>;

  useServerInsertedHTML(() => {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `</script>${extractStyle(cache)}<script>`,
        }}
      />
    );
  });

  if (typeof window !== "undefined") {
    return render;
  }

  return (
    <StyleProvider hashPriority="high" cache={cache}>
      {render}
    </StyleProvider>
  );
};
