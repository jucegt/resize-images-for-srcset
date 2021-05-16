// Packages
import path from 'path';
import sharp from 'sharp';

import { colors } from './colors';

// Definitions
import IConfig from '../definitions/IConfig';
import ISize from '../definitions/ISize';
import { TFormat } from '../definitions/Types';

const sharpImage = (file: string, size: ISize, config: IConfig, output: string, format?: TFormat) => {
  const filename = path.basename(file);
  const image = sharp(file);
  const sizeConfig = {width: size.width, height: size.height, fit: config.fit};

  if (format) {
    // The current image format
    const filesplit = filename.split('.');
    const defaultFormat = filesplit[filesplit.length-1];

    // Generates the image according to the format config
    image
      .toFormat(format)
      .resize(sizeConfig)
      .toFile(`${output}/${filename.replace(defaultFormat, format)}`)
      .catch(error => {
        console.log(colors.red, error, `format: ${format} - filename: ${filename}`, colors.cyan);
      });
  } else {
    // Generates the image according to the size config
    image
      .resize(sizeConfig)
      .toFile(`${output}/${filename}`)
      .catch(error => {
        console.log(colors.red, error, `size: ${size.name} - filename: ${filename}`, colors.cyan);
      });
  }
};

export default sharpImage;
