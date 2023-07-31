import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const bucketName = process.env.BUCKET_NAME;
    const accessKey = process.env.S3_ACCESS_KEY;
    const secretKey = process.env.S3_SECRET_ACCESS_KEY;

    res.status(200).json({accessKey, secretKey });
  } catch (error: any) {
    res.status(500).json(error.message);
  }
}
