export class ArtWork {
  name:string;
  type:string;
  path:string;
  height:number;
  width:number;

  constructor(name, type, path, height, width) {
    this.name = name;
    this.type = type;
    this.path = path;
    this.height = height;
    this.width = width;
  }
}
