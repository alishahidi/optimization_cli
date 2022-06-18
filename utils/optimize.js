import sharp from "sharp";

const optimize = async (importPath, quality, exportPath) => {
	await sharp(importPath)
		.jpeg({
			quality,
		})
		.toFile(exportPath);
}


export default optimize;
