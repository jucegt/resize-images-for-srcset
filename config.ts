import IConfig from './definitions/IConfig';

const config: IConfig = {
  "input": "./images/",
  "output": "./dist/",
  "fit": "cover",
  "sizes": [
    {
      "name": "sm",
      "width": 375,
      "height": 140
    },
    {
      "name": "md",
      "width": 587,
      "height": 220
    },
    {
      "name": "lg",
      "width": 800,
      "height": 300
    }
  ],
  "formats": ["webp"]
};

export default config;
