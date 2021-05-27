import { BaseComponent } from '../base-component';
import './header.css'

export class Header extends BaseComponent{
  constructor(){
    super('header',['header']);
  }

  createHeader(){

    const head = document.querySelector('body');
    if(head){
      head.innerHTML=`
      <header>
    <div class="icons">
      <div>
        <p>match</p>
      </div>
      <div>
        <p>match</p>
      </div>
    </div>
    <div class="head-menu">
      <div class="about-game-head active">
        <img src="https://sun9-59.userapi.com/impg/z8HetXoUEKYNuH-SCZn3BzHjnjU69OqSWo4EOA/VJprOVrjbD4.jpg?size=20x20&quality=96&sign=ac17c98e957477e710289d395d04e76d&type=album" alt="">
        <img class="img-inside-img" src="https://sun9-46.userapi.com/impg/oL-wKdkN4BZ6HPaMtOT-eMBrTAlm_M314zlG2w/JA5b8BbGK-w.jpg?size=8x14&quality=96&sign=782155d8ab1347b91208a14aa78e2c80&type=album" alt="">
        <p>About game</p>
      </div>
      <div class="best-score-head">
        <img src="https://sun9-59.userapi.com/impg/z8HetXoUEKYNuH-SCZn3BzHjnjU69OqSWo4EOA/VJprOVrjbD4.jpg?size=20x20&quality=96&sign=ac17c98e957477e710289d395d04e76d&type=album" alt="">
        <p>Best Score</p>
      </div>
      <div class="game-setting-head">
        <img src="https://sun9-59.userapi.com/impg/z8HetXoUEKYNuH-SCZn3BzHjnjU69OqSWo4EOA/VJprOVrjbD4.jpg?size=20x20&quality=96&sign=ac17c98e957477e710289d395d04e76d&type=album" alt="">
        <img class="img-inside-img" src="https://sun9-45.userapi.com/impg/WjJk8iEOavUdmaMo7JPV0udSGs_vKFfOSkm6Aw/EVdOvMCEH8U.jpg?size=16x16&quality=96&sign=9152de591fbee65d701f0b690264f763&type=album" alt="">
        <p>Game Settings</p>
      </div>
    </div>
    <div class="right-head">
    <button class="head-register-but">
      <p>
        register new player
      </p>
    </button>
    </div>
  </header>
      <main>

      </main>
      `
    }



  }

  addUserHeader(){
    const head = document.querySelector('.right-head');
    if(head){
      head.innerHTML=`
      <button class="head-start-but">
      <p>
        start game
      </p>
    </button>
    <img class="head-avatar" src="https://sun9-46.userapi.com/impg/oL-wKdkN4BZ6HPaMtOT-eMBrTAlm_M314zlG2w/JA5b8BbGK-w.jpg?size=8x14&quality=96&sign=782155d8ab1347b91208a14aa78e2c80&type=album">

      `
    }



  }

}
