import { NextApiHandler, NextApiRequest } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (
  req: NextApiRequest,
  saveLocally?: boolean
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const options: formidable.Options = {};
  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), "/public/uploads");
    options.filename = (name, ext, path, form) => {
      return Date.now().toString() + "_" + path.originalFilename;
    };
  }
  options.maxFileSize = 4000 * 1024 * 1024;
  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

const upload: NextApiHandler = async (req, res) => {
  try {
    // Create the upload directory if it doesn't exist
    await fs.mkdir(path.join(process.cwd() + "/public", "/uploads"), {
      recursive: true,
    });

    // Read uploaded files
    const { files } = await readFile(req, true);

    // Log the name of the first uploaded file
    const fileNames = Array.isArray(files.file)
      ? files.file.map((file) => (file as any).name)
      : [(files.file as any).name];

      console.log(fileNames)
    res.status(200).json({ files: fileNames });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default upload;
