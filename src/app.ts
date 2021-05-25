import { Game } from './components/game/game';
import { ImageCategoryModel } from './models/image-category-model';
export class App {
  private readonly game: Game;

  constructor(private readonly rootElement: HTMLElement) {
    this.game = new Game();
    this.rootElement.appendChild(this.game.element)
  }


 async newGame() {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();

    const cat = categories[/*Math.floor(Math.random() * (10 - 0 + 1)) + 0*/1];
    const images = cat.images.map((name) => `${cat.category}/${name}`);
    this.game.initGame(images);
  }
}
