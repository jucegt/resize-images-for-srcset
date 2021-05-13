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

// Console colors
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m'
}

// Get all files from config input
const files = glob.sync(`${config.input}*.*`);

console.log(colors.green, '<------------ Starting ------------>', colors.reset);

if (files.length === 0) {
  console.log(colors.red, 'The input directory is empty or does not exist.', colors.reset)
} else {
  config.sizes.forEach((size: ISize) => {
    // Generates the output path according to the output and size name config
    const outputPath = `${config.output}${size.name}`
    if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath, { recursive: true });

    console.log(colors.magenta, `Generating the images for the size:`, colors.yellow,  `${size.name}`, colors.reset);

    files.forEach(file => {
      const filename = path.basename(file);
      const image = sharp(file);
      const sizeConfig = {width: size.width, height: size.height, fit: config.fit};

      // Generates the image according to the size config
      image
        .resize(sizeConfig)
        .toFile(`${outputPath}/${filename}`)
        .catch(error => {
          console.log(colors.red, error, `size: ${size.name} - filename: ${filename}`, colors.cyan);
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
            console.log(colors.red, error, `format: ${format} - filename: ${filename}`, colors.cyan);
          });
      });
    });
  });
};

console.log(colors.green, '<------------- Finish ------------->', colors.cyan);
