export class Pokemon {
  id: number;
  name: string;
  image: string;
  sprite: string;

  constructor(id: number, name: string, image: string, sprite: string) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.sprite = sprite;
  }
}
