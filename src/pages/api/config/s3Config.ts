import AWS from "aws-sdk";

if (!process.env.S3_ACCESS_KEY && !process.env.S3_SECRET_ACCESS_KEY) {
  throw new Error("AWS secret credential not provided!");
}

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "eu-north-1",
});

const s3 = new AWS.S3();

export default s3;
