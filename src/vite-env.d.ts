
/// <reference types="vite/client" />

// Ensure THREE types are available
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace JSX {
  interface IntrinsicElements {
    textGeometry: any;
  }
}

declare module '*.gltf' {
  const src: string;
  export default src;
}

declare module '*.glb' {
  const src: string;
  export default src;
}
