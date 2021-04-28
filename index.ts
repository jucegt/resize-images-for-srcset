// Config
import config from './config';

// Packages
import fs from 'fs';
import path from 'path';
import glob from 'glob';
import sharp from 'sharp';

// Interfaces/Types
import ISize from './definitions/ISize';
import { TFormat } from './definitions/Types';

// Get all files from config input
const files = glob.sync(`${config.input}*.*`);

config.sizes.forEach((size: ISize) => {
  // Generates the output path according to the output and size name config
  const outputPath = `${config.output}${size.name}`
  if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath, { recursive: true });

  files.forEach(file => {
    const filename = path.basename(file);
    const image = sharp(file);
    const sizeConfig = {width: size.width, height: size.height, fit: config.fit};

    // Generates the image according to the size config
    image
      .resize(sizeConfig)
      .toFile(`${outputPath}/${filename}`)
      .catch(error => {
        console.log(error);
      });

    config.formats.forEach((format: TFormat) => {
      // The current image format
      const filesplit = filename.split('.');
      const defaultFormat = filesplit[filesplit.length-1];

      // Generates the image according to the format config
      image
        .toFormat(format)
        .resize(sizeConfig)
        .toFile(`${outputPath}/${filename.replace(defaultFormat, format)}`)
        .catch(error => {
          console.log(error);
        });
    });
  });
});
