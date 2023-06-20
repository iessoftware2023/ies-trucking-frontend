import Head from "next/head";

import { LoginContainer } from "@/containers";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login | IES Web</title>
      </Head>

      <LoginContainer />
    </>
  );
}
