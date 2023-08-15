import Head from "next/head";
import React from "react";

import { PolicyContainer } from "@/containers";

const PolicyPage = () => {
  return (
    <>
      <Head>
        <title>Logistics App Privacy Policy | IES Web</title>
      </Head>
      <PolicyContainer />
    </>
  );
};

export default PolicyPage;
