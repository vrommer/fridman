/**
 * Created by i306534 on 28/04/2019.
 */
class ImageModel {
	constructor(name, type, location, dimensions) {
		this.imageName = name;
		this.imageType = type;
		this.imageLocation = location;
		this.imageDimensions = dimensions;
	}
};

module.exports = ImageModel;