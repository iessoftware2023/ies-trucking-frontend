import { createEnvsFromList } from "env";
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  const scriptEnv = `window.__ENV__ = ${JSON.stringify(createEnvsFromList())}`;

  return (
    <Html lang="en">
      <Head>
        {/* Polyfill Intl.NumberFormat, its dependencies & en, vi locale data */}
        <script
          async={false}
          src="https://polyfill.io/v3/polyfill.min.js?features=Intl.NumberFormat,Intl.NumberFormat.~locale.en,Intl.NumberFormat.~locale.vi"
        />
        <script dangerouslySetInnerHTML={{ __html: scriptEnv }} />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
