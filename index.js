const config = require('./config.json');

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const sharp = require('sharp');

const files = glob.sync(config.input);

config.sizes.forEach(size => {
	const dir = `${config.output}${size.name}`
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true }, error => {
			if (error) throw error;
		})
	}

	files.forEach(file => {
		const filename = path.basename(file);
		const  image = sharp(file);

		image
			.resize({width: size.width, height: size.height, fit: config.fit})
			.toFile(`${dir}/${filename}`)
			.catch(error => {
				console.log(error);
			});
	});
});