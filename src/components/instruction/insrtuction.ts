import { BaseComponent } from '../base-component';
import './insrtuction.css'

export class Instruction extends BaseComponent{
  constructor(){
    super('main',['instructions']);
  }

  startMain(){
    const head=document.querySelectorAll(".head-menu div")
    head.forEach(div => {div.classList.remove("active")
    });
    head[0].classList.add("active")
    const instr = document.querySelector('main')
    if (instr){
      instr.innerHTML=`
    <div class="instructions">
      <div class="main-info-left">
       <h4>How to play?</h4>
       <div class="how-register">
        <p class="how-point">1</p>
        <p class="how-text">Register new player in game</p>
       </div>
       <div class="how-config">
        <p class="how-point">2</p>
        <p class="how-text">Configure your game settings</p>
       </div>
       <div class="how-start">
        <p class="how-point">3</p>
        <p class="how-text">Start you new game! Remember card positions and match it before times up.</p>
       </div>
      </div>
     <div class="main-info-right">
      <div class="register-instr" style="background-image: url('https://sun9-46.userapi.com/impg/Wyiz526SRCcTPPkVtZKKdyfrikDOKUZYvHMxng/fq8f_EQvLlg.jpg?size=302x218&quality=96&sign=defe9c6e8d0d63c0ab5e1e61fc4f7f18&type=album');">
      </div>
      <div class="game-set-instr">
        <img src="https://sun9-59.userapi.com/impg/z8HetXoUEKYNuH-SCZn3BzHjnjU69OqSWo4EOA/VJprOVrjbD4.jpg?size=20x20&quality=96&sign=ac17c98e957477e710289d395d04e76d&type=album" alt="">
        <img class="img-inside-img" src="https://sun9-45.userapi.com/impg/WjJk8iEOavUdmaMo7JPV0udSGs_vKFfOSkm6Aw/EVdOvMCEH8U.jpg?size=16x16&quality=96&sign=9152de591fbee65d701f0b690264f763&type=album" alt="">
        <p>Game Settings</p>
      </div>
      <div class="example" style="background-image: url('https://sun9-18.userapi.com/impg/mFR4-MngKxxaGzctp6Z7Xg_CgJZgGPSRtuVWtw/lrnRjkM10KE.jpg?size=330x240&quality=96&sign=1678bbef03983bbb5c7ee78121487758&type=album');">
      </div>
    </div>
  </div>
      `
    }
  }
  removeInstr(){
    const instr = document.querySelectorAll('main div')
    if (instr){
      instr.forEach(div => {
        div.remove()
      });
    }
  }
}
