import { NextApiRequest, NextApiResponse } from "next";
import Replicate from "replicate"; 

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const imageUrl = req.body.imageUrl;

  const apiToken = process.env.REPLICATE_API_TOKEN;

  if (!apiToken) {
    throw new Error("API Token is missing");
  }

  const replicate = new Replicate({ auth: apiToken });
  const model =
    "cjwbw/vqfr:ccd53a9a38ebbaa783a1e6318d22fa68c14c3aed66cc3589e53ef07d07f5be1d";

  try {
    const output: any = await replicate.run(model, {
      input: {
        image: imageUrl,
      },
    });
    res.status(200).json(output);
  } catch (error: any) {
    res.status(500).json(error);
  }
}
