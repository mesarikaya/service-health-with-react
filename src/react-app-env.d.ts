/// <reference types="react-scripts" />
declare global {
    namespace NodeJS {
      interface ProcessEnv {
          REACT_APP_NODE_ENV: string;
          REACT_APP_API: string;
          REACT_APP_HTTP: string;
          REACT_APP_CLIENT_ID: string;
          REACT_APP_TENANT_ID: string;
      }
    }
  }
  
  export {};