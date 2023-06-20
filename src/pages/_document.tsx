import { createEnvsFromList } from "env";
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  const scriptEnv = `window.__ENV__ = ${JSON.stringify(createEnvsFromList())}`;

  return (
    <Html lang="en">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: scriptEnv }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
