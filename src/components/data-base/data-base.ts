import { BaseComponent } from '../base-component';
import './data-base.css'

export class DataBase extends BaseComponent{
 constructor(){
  super('main',['data-base']);
}
  createScorePage(){
    const head=document.querySelectorAll(".head-menu div")
    head.forEach(div => {div.classList.remove("active")
    });
    head[1].classList.add("active")
    const block = document.querySelector("main")
    if(block)
    block.innerHTML=`
    <div class="best-score">
      <ul class="wlist">
      </ul>
    </div>
    `
 this.showTable;
  }
   showTable(){
    let db:IDBDatabase;
    let crDb= indexedDB.open("formDB",6);
    crDb.onsuccess=function(ev){
      db=crDb.result
      let tx=db.transaction('scoreTable','readwrite');
      tx.oncomplete =(ev)=>{
      let list=document.querySelector('.wlist')
      let tx=db.transaction('scoreTable','readonly')
       let store= tx.objectStore('scoreTable');
       let getReq= store.getAll();
       getReq.onsuccess=(ev)=>{
        if(list)
        list.innerHTML= getReq.result.map(player=>{
          return `
            <li>
             <img class="head-avatar" src="https://sun9-46.userapi.com/impg/oL-wKdkN4BZ6HPaMtOT-eMBrTAlm_M314zlG2w/JA5b8BbGK-w.jpg?size=8x14&quality=96&sign=782155d8ab1347b91208a14aa78e2c80&type=album">
             <div class="man-info">
               <div class="name-and-surname">
                 <p class="name">${player.firstName}</p>
                 <p class="surname">${player.lastName}</p>
               </div>
               <p class="email">${player.eMail}</p>
             </div>
             <p class="player-score">Score:100</p>
            </li>
          `
        }).join('\n')
       }
      }
    }
   }

   init(player: object){
    let db:IDBDatabase;
    let dbObgect= null;
    let crDb= indexedDB.open("formDB",6);

    crDb.onerror=function(err){
      console.log('err1')
    }
    crDb.onsuccess=function(ev){
      db=crDb.result
      let tx=db.transaction('scoreTable','readwrite');
      tx.oncomplete =(ev)=>{
        buildlist();
      }
      let store=tx.objectStore('scoreTable')
      let request = store.add(player)
    }
    crDb.onupgradeneeded=(ev)=>{
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

   function buildlist(){
      let list=document.querySelector('.wlist')
      let tx=db.transaction('scoreTable','readonly')
      if(list)
       list.innerHTML=`<li>Loading...</li>`
       tx.oncomplete=(ev)=>{
       }
       let store= tx.objectStore('scoreTable');
       let getReq= store.getAll();
       getReq.onsuccess=(ev)=>{
        if(list)
        list.innerHTML= getReq.result.map(player=>{
          return `
            <li>
             <img class="head-avatar" src="https://sun9-46.userapi.com/impg/oL-wKdkN4BZ6HPaMtOT-eMBrTAlm_M314zlG2w/JA5b8BbGK-w.jpg?size=8x14&quality=96&sign=782155d8ab1347b91208a14aa78e2c80&type=album">
             <div class="man-info">
               <div class="name-and-surname">
                 <p class="name">${player.firstName}</p>
                 <p class="surname">${player.lastName}</p>
               </div>
               <p class="email">${player.eMail}</p>
             </div>
             <p class="player-score">Score:100</p>
            </li>
          `
        }).join('\n')
       }
       getReq.onerror=(err)=>{
         console.warn(err);
       }
    }

    }

}

