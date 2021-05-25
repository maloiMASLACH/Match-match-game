import './style.css';
import { App } from './app';
import { Header } from './components/header/header';
import { Instruction } from './components/instruction/insrtuction';
import { Register } from './components/register/register';
import { DataBase } from './components/data-base/data-base'
import { uid } from './keygen';



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

  const database: DataBase =new DataBase(firstName,lastName,eMail)
  const table = document.getElementById("table")

  table?.insertAdjacentHTML("beforeend",`
    <tr>
      <td>${database.id}</td>
      <td>${database.firstName}</td>
      <td>${database.lastName}</td>
      <td>${database.eMail}</td>
    </tr>
  `)

  function init(){
    let db:IDBDatabase;
    let dbObgect= null;
    let crDb= indexedDB.open("formDB",6);

    crDb.onerror=function(err){
      console.log('err1')
    }
    crDb.onsuccess=function(ev){
      db=crDb.result
      let tx=db.transaction('scoreTable','readwrite');
      if(db){console.log("ss")}
      tx.oncomplete =(ev)=>{
        console.log("ev")
      }
      tx.onerror =(err)=>{
        console.warn("err2")
      }
      let store=tx.objectStore('scoreTable')
      let request = store.add(player)
      request.onsuccess=(ev)=>{
        console.log('success')
      }
      request.onerror=(err)=>{
        console.log("error")
      }
    }
    crDb.onupgradeneeded=function(ev){
      db=crDb.result
      let old_version=ev.oldVersion;
      let new_version=ev.newVersion;
      console.log(`updated from ${old_version} to ${new_version} version`)
      if(!db.objectStoreNames.contains('scoreTable')){
      dbObgect=db.createObjectStore('scoreTable',{
        keyPath: "id",
      });
      }
    }
      let player ={
        id: uid(),
        firstName,
        lastName,
        eMail
      }
      // if(db){console.log("ss")}
     /*
*/

}

   init()

    new Header().addUserHeader()

  document.querySelector(".head-start-but")?.addEventListener("click",()=>{
    new Instruction().removeInstr();
    new App(appElement).newGame();

    })

  new Register().closeForm();
  })

});


};





