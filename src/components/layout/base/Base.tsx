import Head from "next/head";
import React, { PropsWithChildren } from "react";

type IProps = PropsWithChildren<{
  title: string;
}>;

export const LayoutBase: React.FC<IProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div>{children}</div>
    </>
  );
};
