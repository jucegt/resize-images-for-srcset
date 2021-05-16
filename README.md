# Resize images for srcset

A simple image resize with Node.js([using sharp](https://github.com/lovell/sharp)) to generate the images in different sizes for use in srcset attribute in `<img>` tag.

## Installation

Clone this repository:

```bash
git clone git@github.com:jucegt/resize-images-for-srcset.git resize-images

cd resize-images
```

## How to use it?

Create a folder in the root of the project and inside it place the images to resize(by default, it is called `images` in the config file). In the config file you can change the input and output folder of the images.

```json
{
  "input": "./images/",
  "output": "./dist/",
  ...
}
```

In the config file change or add sizes and formats to generate the images.

```json
{
  ...
  "sizes": [
    {
      "name": "lg",
      "width": 800,
      "height": 300
    }
  ],
  "formats": ["webp"]
}
```

To avoid generating extra formats, leave the `formats` parameter as an empty array.

```json
{
  ...
  "formats": []
}
```

Use `yarn images` or `npm images` to generate the images.

PS. Don't forget to install the necessary modules using `yarn install` or `npm install`.

### TODO

- [x] ~Validate if the directory is empty or does not exist.~
- [ ] Generate the picture tag per image(with the corresponding sources).
- [ ] Add the option to resize by percentage.
- [ ] Do not resize if the sizes in the config file are larger than the original image size.
