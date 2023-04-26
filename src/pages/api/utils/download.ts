import { NextApiRequest, NextApiResponse } from "next";

export default function download(req: NextApiRequest, res:NextApiResponse){
    res.json("Hello there")
}