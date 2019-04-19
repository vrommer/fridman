export class ArtWork {
  id: string;
  name: string;
  type: string;
  path: string;
  height: number;
  width: number;
  img: object;

  constructor(name, type, path, height, width, image) {
    this.id = name;
    this.name = name;
    this.type = type;
    this.path = path;
    this.height = height;
    this.width = width;
    this.img = image;
  }
}
