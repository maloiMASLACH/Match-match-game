import { BaseComponent } from '../base-component';
import './game-settings.css';

export class GameSettings extends BaseComponent {
  constructor() {
    super('main', ['data-base']);
  }

  settingsMenu = ():void => {
    const head = document.querySelectorAll('.head-menu div');
    head.forEach((div) => {
      div.classList.remove('active');
    });
    head[2].classList.add('active');
    const block = document.querySelector('main');
    if (block) {
      block.innerHTML = `
    <div class="game-settings">
    <fieldset class="game-parammetr">
      <legend>Game Cards</legend>
      <select name="list1" id="first-set">
        <option value="0">Countries</option>
        <option value="1">Pride</option>
        <option value="2">Social Media</option>
        <option value="3">Food</option>
      </select>
    </fieldset>
    <fieldset class="game-parammetr">
      <legend>Difficulty</legend>
      <select name="list2" id="thecond-set">
        <option value="2">Easy</option>
        <option value="1">Medium</option>
        <option value="0">Hard</option>
      </select>
    </fieldset>
  </div>
    `;
    }
  };
}
