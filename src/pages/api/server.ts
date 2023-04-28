import { NextApiRequest, NextApiResponse } from "next";
import Replicate from "replicate";

interface PromptUrl {
  version: string;
  input:{
    imageUrl: string;

  }
}

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    imageUrl: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const imageUrl = req.body.formData;

  if (!imageUrl) {
    res.status(401).json("Invlid input");
  }

  const ApiToken = process.env.REPLICATE_API_TOKEN;

  if (!ApiToken) {
    throw new Error("API Token is undifined");
  }

  const replicate = new Replicate({ auth: ApiToken });

  try {
    const output: any = await replicate.run(
      "cjwbw/vqfr:ccd53a9a38ebbaa783a1e6318d22fa68c14c3aed66cc3589e53ef07d07f5be1d",
      {
        input: {
          image: imageUrl,
        },
      }
    );

    res.status(201).json(output);
  } catch (error: any) {
    res.status(500).json(error);
  }
}
