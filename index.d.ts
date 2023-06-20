/* eslint-disable @typescript-eslint/no-explicit-any */
declare interface ENVIRONMENT {
  API_URL: string;
  GOOGLE_MAPS_API_KEY: string;
}

declare interface Window {
  __ENV__: ENVIRONMENT;
}

declare module "*.svg" {
  const content: React.ComponentType<
    React.SVGProps<SVGSVGElement> | CustomIconComponentProps
  >;
  export default content;
}
