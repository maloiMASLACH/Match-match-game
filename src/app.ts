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

    const cat = categories[Math.floor(Math.random() * (10 - 0))];
    const images = cat.images.map((name) => `${cat.category}/${name}`);
    this.game.initGame(images);
  }
  async newGameWithSet(cardType:string,difficulty:string) {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const cat = categories[+cardType*3+(+difficulty)];
    console.log(+cardType*3+(+difficulty))
    console.log(cat)
    const images = cat.images.map((name) => `${cat.category}/${name}`);
    this.game.initGame(images);
  }
    timer() {
    let timeStart = new Date().getTime();
    console.log(timeStart)
    return {
        get seconds() {
            const seconds = Math.ceil((new Date().getTime() - timeStart) / 1000) + 's';
            return seconds;
        }
      }
    }
}
