// Packages
import fs from 'fs';

// Functions
import sharpImage from './sharp-image';

// Console colors
import { colors } from './colors';

// Definitions
import IConfig from '../definitions/IConfig';
import ISize from '../definitions/ISize';
import { TFormat } from '../definitions/Types';

const generateImages = (files: string[], config: IConfig) => {
  config.sizes.forEach((size: ISize) => {
    // Generates the output path according to the output and size name config
    const outputPath = `${config.output}${size.name}`
    if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath, { recursive: true });

    console.log(colors.magenta, `Generating the images for the size:`, colors.yellow,  `${size.name}`, colors.reset);

    files.forEach((file: string) => {
      sharpImage(file, size, config, outputPath);
      config.formats.forEach((format: TFormat) => {
        sharpImage(file, size, config, outputPath, format);
      });
    });
  });
};

export default generateImages;
