import AWS from "aws-sdk";
import axios from "axios";

const S3Bucket = async () => {
  try {
    const response = await axios.get("api/aws-keys");
    const {accessKey, secretKey} = await response.data;

  AWS.config.update({
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
    region: "eu-north-1",
  });

  const s3 = new AWS.S3()
  return s3;

  } catch (error: any) {
    console.log("Error fetching AWS credentials: ", error.message);
    return null;
  }

};

export default S3Bucket;
