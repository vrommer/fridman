export class ArtWork {
  id: string;
  name: string;
  type: string;
  path: string;
  height: number;
  width: number;
  img: object;
  show: boolean;

  constructor(name, type, path, height, width, image, show=false) {
    this.id = name;
    this.name = name;
    this.type = type;
    this.path = path;
    this.height = height;
    this.width = width;
    this.img = image;
    this.show = show;
  }

  set showItem(val) {
    this.show = val;
  }

  get showItem() {
    return this.show;
  }

  toggleItem() {
    this.show = !this.show;
  }
}
