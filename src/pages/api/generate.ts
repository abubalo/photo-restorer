import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios"

type Data = {
  prompt: string;
};

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const option = {
    headers: {
      Anthorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version:
        "6359a0cab3ca6e4d3320c33d79096161208e9024d174b2311e5a21b6c7e1131c",
      input: { prompt: req.body.prompt },
    }),
  };

  const response = await axios.post("https://api.replicate.com/v1/predictions", option);

  if(response.status !== 201){
    let error = await response.data;
    res.statusCode = 500;

    res.end(JSON.stringify({detial: error.detial}))

    return;

    const prediction = await response.data;
    res.statusCode === 201;
    res.end(JSON.stringify(prediction))
  }
}
