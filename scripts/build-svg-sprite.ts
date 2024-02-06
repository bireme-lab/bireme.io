import fs from "fs-extra";
import path from "path";
import prettier from "prettier";
import SVGSpriter from "svg-sprite";
import { optimize } from "svgo";

const SOURCE_PATH = path.resolve(__dirname, "../icons");
const TYPES_OUTPUT_PATH = path.resolve(__dirname, "../components/Icon/Icon.types.ts");
const SPRITE_CONTENT_OUTPUT_PATH = path.resolve(__dirname, "../components/Icon/sprite.ts");

const optimizeSvg = (svgContent: string): string => {
  const { data } = optimize(svgContent, {
    floatPrecision: 2,
    multipass: true,
  });

  return data;
};

const createSprite = async (iconPaths: string[]) => {
  const spriter = new SVGSpriter({
    mode: {
      symbol: {},
    },
  });

  for (const iconPath of iconPaths) {
    const content = fs.readFileSync(iconPath, "utf-8");
    const optimizedContent = optimizeSvg(content);

    spriter.add(path.basename(iconPath), null, optimizedContent);
  }

  const { result } = await spriter.compileAsync();

  const sprite: { contents: Buffer } = result.symbol.sprite;

  return sprite.contents.toString();
};

const generateTypesFileContent = async (iconPaths: string[]) => {
  const fileContent = await prettier.format(
    `
    export type IconName = ${iconPaths
      .map((iconPath) => `'${path.basename(iconPath).replace(".svg", "")}'`)
      .join(" | ")}
  `,
    {
      parser: "typescript",
      printWidth: 100,
    },
  );

  return fileContent;
};

const generateSpriteFileContent = async (iconPaths: string[]) => {
  const sprite = await createSprite(iconPaths);
  const symbols = sprite.replace(/^<\?xml .*\?>|<svg.*?>|<\/svg>$/g, "");

  const fileContent = await prettier.format(
    `
    export const sprite = ${JSON.stringify(symbols)}
  `,
    {
      parser: "typescript",
      printWidth: 100,
    },
  );

  return fileContent;
};

const getIconList = async (iconsFolderPath: string) => {
  const iconList = await fs.readdir(iconsFolderPath);
  return iconList.map((iconPath) => path.resolve(iconsFolderPath, iconPath));
};

const main = async () => {
  const iconList = await getIconList(SOURCE_PATH);
  const spriteFileContent = await generateSpriteFileContent(iconList);
  const typesFileContent = await generateTypesFileContent(iconList);

  await Promise.all([
    fs.writeFile(SPRITE_CONTENT_OUTPUT_PATH, spriteFileContent, "utf-8"), // write sprite file
    fs.writeFile(TYPES_OUTPUT_PATH, typesFileContent, "utf-8"), // write types file
  ]);

  // eslint-disable-next-line no-console
  console.log(`Successfully generated\n  ${SPRITE_CONTENT_OUTPUT_PATH}\n  ${TYPES_OUTPUT_PATH}`);
};

main();
