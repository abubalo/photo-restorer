export {};

declare global {
  namespace NodeJs {
    interface ProcessEnv {
      NODE_ENV: "dev" | "prod" | "test";
      REPLICATE_API_TOKEN: string;
      S3_ACCESS_KEY: string;
      S3_SECRET_ACCESS_KEY: string;
    }
  }
}
