import './style.css';
import { App } from './app';
import { Header } from './components/header/header';
import { Instruction } from './components/instruction/insrtuction';
import { Register } from './components/register/register';
import { DataBase } from './components/data-base/data-base'
import { uid } from './keygen';
import { GameSettings } from './components/game-settings/game-settngs';



window.onload = () => {

new Header().createHeader();

const appElement = document.querySelector('main');
if (!appElement) throw Error('App root element not found');

new Instruction().startMain();

document.querySelector('.head-register-but')?.addEventListener('click',() =>{
  new Register().registerForm();
  const form = <HTMLFormElement>document.getElementById('form')
  document.querySelector(".cancel")?.addEventListener('click',()=>{
    new Register().closeForm();
  });

 form?.addEventListener("submit", e=>{
  e.preventDefault()
  const firstName:string =(<HTMLInputElement>document.getElementById("firstName")).value
  const lastName:string =(<HTMLInputElement>document.getElementById("lastName")).value
  const eMail:string =(<HTMLInputElement>document.getElementById("eMail")).value

  const player ={
    id: uid(),
    firstName,
    lastName,
    eMail
  }
  new DataBase().init(player)
    new Header().addUserHeader()

   document.querySelector(".head-start-but")?.addEventListener("click",()=>{
      if(document.querySelector(".game-settings")==null){
      new Instruction().removeInstr();
      new App(appElement).newGame();
      }else{
        let cardType= (<HTMLInputElement>document.getElementById("first-set"))?.value
    let difficulty= (<HTMLInputElement>document.getElementById("thecond-set"))?.value
    if (cardType && difficulty){
    new Instruction().removeInstr();
    new App(appElement).newGameWithSet(cardType,difficulty);
    }
      }
      })

  new Register().closeForm();
  })

});
document.querySelector(".best-score-head")?.addEventListener("click",(e)=>{
  new DataBase().createScorePage();
  new DataBase().showTable();
})

document.querySelector(".about-game-head")?.addEventListener("click",()=>{
  new Instruction().startMain();
})
document.querySelector(".game-setting-head")?.addEventListener("click",()=>{

  new GameSettings().settingsMenu();
  document.querySelector(".head-start-but")?.addEventListener("click",()=>{

    let cardType= (<HTMLInputElement>document.getElementById("first-set"))?.value
    let difficulty= (<HTMLInputElement>document.getElementById("thecond-set"))?.value
    if (cardType && difficulty){
    new Instruction().removeInstr();
    new App(appElement).newGameWithSet(cardType,difficulty);
    const time= new App(appElement).timer()
    console.log(time.seconds)
    }
    })
})
};





