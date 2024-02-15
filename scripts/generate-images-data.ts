import { asyncMap } from "@/utils/array";
import fs from "fs-extra";
import path from "path";
import { getPlaiceholder } from "plaiceholder";
import prettier from "prettier";
import sharp from "sharp";

const ROOT_DIR = path.join(__dirname, "..");
const IMAGE_DIR = path.join(__dirname, "../public/images");
const OUTPUT_DIR = path.join(__dirname, "../components/Image/data.ts");
const ACCEPTED_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp"]);

const findImages = async (dir: string, images: string[] = []) => {
  const files = await fs.readdir(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = await fs.stat(filePath);

    if (stats.isDirectory()) {
      await findImages(filePath, images);
    } else if (ACCEPTED_EXTENSIONS.has(path.extname(filePath).toLowerCase())) {
      images.push(path.relative(ROOT_DIR, filePath));
    }
  }

  return images;
};

const getBlurData = async (imagePath: string) => {
  try {
    const buffer = await sharp(imagePath).toBuffer();
    const data = await getPlaiceholder(buffer);

    return data;
  } catch (error) {
    throw new Error(`Error while reading image ${imagePath}: ${error}`);
  }
};

const main = async () => {
  const images = await findImages(IMAGE_DIR);
  // eslint-disable-next-line no-console
  console.log("Number of images found:", images.length);

  const data: Record<
    string,
    {
      name: string;
      extension: string;
      blurHash: string;
    }
  > = {};

  await asyncMap(images, async (imagePath) => {
    const blurData = await getBlurData(imagePath);

    const imageSrc = imagePath.replace("public/", "/");

    data[imageSrc] = {
      name: path.basename(imagePath),
      extension: path.extname(imagePath),
      blurHash: blurData.base64,
    };
  });

  const fileContent = await prettier.format(
    `
    export const data = ${JSON.stringify(data, null, 2)}
  `,
    {
      parser: "typescript",
      printWidth: 100,
    },
  );

  await fs.writeFile(OUTPUT_DIR, fileContent, "utf-8");
};

main();
