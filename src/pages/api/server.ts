import { NextApiRequest, NextApiResponse } from "next";
import Replicate from "replicate";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiToken = process.env.REPLICATE_API_TOKEN;

  if (!apiToken) {
    throw new Error("API Token is missing");
  }

  const { imageUrl } = req.body;
  // configure api key
  const replicate = new Replicate({ auth: apiToken });
  const model =
    "cjwbw/vqfr:ccd53a9a38ebbaa783a1e6318d22fa68c14c3aed66cc3589e53ef07d07f5be1d";

  try {
    const output: any = await replicate.run(model, {
      input: {
        image: imageUrl,
      },
    });
    res.json(output);
  } catch (error: any) {
    res.json(error);
  }
}
