import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'eu-north-1'
});

const s3 = new AWS.S3();

export default s3;
