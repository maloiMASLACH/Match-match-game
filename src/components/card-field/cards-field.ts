import './card-field.css';
import { BaseComponent } from '../base-component';
import { Card } from '../card/card';

const SHOW_TIME = 5;

export class CardsField extends BaseComponent {
  private cards: Card[] = [];

  constructor() {
    super('div', ['card-field']);
  }

  clear():void {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addCards(cards: Card[]) :void {
    this.cards = cards;
    this.cards.forEach((card) => this.element.appendChild(card.element));
    setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack());
    }, SHOW_TIME * 1000);
  }

  flippedCheck = ():number => {
    let k = 0;
    const flipChekCon = document.querySelectorAll('.card-container');
    flipChekCon.forEach((div) => {
      if (div.classList.contains('flipped')) {
        k = 0;
      } else {
        k++;
        if (k === flipChekCon.length) {
          return k;
        }
      }
      return k;
    });
    return k;
  };
}
