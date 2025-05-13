declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<
    React.ComponentProps<'svg'> & { title?: string }
  >;
  export default ReactComponent;
}

declare module '*.png' {
  const value: string;

  export default value;
}

/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_API_END_POINT: string;
  readonly VITE_APP_AWS_PUBLIC_CDN_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
