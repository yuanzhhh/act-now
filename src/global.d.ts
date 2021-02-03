declare module '*.svg' {
  const value: string;
  export = value;
}

declare module '*.png' {
  const value: string;
  export = value;
}

declare module '*.gif' {
  const value: any;
  export default value;
}

declare module '*.jpeg' {
  const value: any;
  export default value;
}

declare module '*.jpg' {
  const value: any;
  export default value;
}

declare module 'cryptico' {
  const value: any;
  export default value;
}

declare module 'video.js' {
  const value: any;
  export default value;
}

interface Window {
  requestIdleCallback: Function
  __sgm__: any;
  __qd__: any;
}

declare var process: {
  env: {
    NODE_ENV: 'development' | 'beta' | 'production' | 'test';
  };
};
