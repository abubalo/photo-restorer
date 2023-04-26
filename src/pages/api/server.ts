import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  prompt: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const imageUrl = req.body.imageUrl

  const option = {
    headers: {
      Anthorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        version: "9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3",
      input: { img: imageUrl, version: "v1.4", scale: 2 },
    }),
  };

  const response = await axios.post(
    "https://api.replicate.com/v1/predictions",
    option
  );

  if (response.status !== 201) {
    let error = await response.data;
    res.statusCode = 500;

    res.end(JSON.stringify({ detial: error.detial }));

    return;
  }
  const prediction = await response.data;
  res.statusCode === 201;
  res.end(JSON.stringify(prediction));
}
