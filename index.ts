// Config
import config from './config';

// Packages
import glob from 'glob';

// Functions
import generateImages from './src/generate-images';

// Console colors
import { colors } from './src/colors';

// Get all files from config input
const files = glob.sync(`${config.input}*.*`);

console.log(colors.green, '<------------ Starting ------------>', colors.reset);

if (files.length === 0) {
  console.log(colors.red, 'The input directory is empty or does not exist.', colors.reset)
} else {
  generateImages(files, config);
};

console.log(colors.green, '<------------- Finish ------------->', colors.cyan);
