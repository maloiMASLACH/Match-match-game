import { BaseComponent } from '../base-component';
import './data-base.css';

export class DataBase extends BaseComponent {
  constructor() {
    super('main', ['data-base']);
  }

  createScorePage = ():void => {
    const head = document.querySelectorAll('.head-menu div');
    head.forEach((div) => {
      div.classList.remove('active');
    });
    head[1].classList.add('active');
    const block = document.querySelector('main');
    if (block) {
      block.innerHTML = `
    <div class="best-score">
      <ul class="wlist">
      </ul>
    </div>
    `;
    }
    this.showTable();
  };

  init = (player: { [key: string]: string }):void => {
    let db:IDBDatabase;
    let dbObgect = null;
    const crDb = indexedDB.open('maloiMASLACH', 7);
    function buildlist():void {
      const list = document.querySelector('.wlist');
      const tx = db.transaction('bestScoreTable', 'readonly');
      tx.oncomplete = () => {
      };
      const store = tx.objectStore('bestScoreTable');
      const getReq = store.getAll();
      getReq.onsuccess = () => {
        if (list) {
          list.innerHTML = getReq.result.map((qq) => `
            <li>
             <img class="head-avatar" src="${qq.photo}">
             <div class="man-info">
               <div class="name-and-surname">
                 <p class="name">${qq.firstName}</p>
                 <p class="surname">${qq.lastName}</p>
               </div>
               <p class="email">${qq.eMail}</p>
             </div>
             <p class="player-score">Score:${qq.score}</p>
            </li>
          `).join('\n');
        }
      };
      getReq.onerror = (err) => {
        console.warn(err);
      };
    }
    crDb.onerror = function ():void {
      console.log('err1');
    };
    crDb.onsuccess = function ():void {
      db = crDb.result;
      const tx = db.transaction('bestScoreTable', 'readwrite');
      tx.oncomplete = () => {
        buildlist();
      };
      const store = tx.objectStore('bestScoreTable');
      const request = store.add(player);
    };
    crDb.onupgradeneeded = (ev) => {
      db = crDb.result;
      const oVersion = ev.oldVersion;
      const nVersion = ev.newVersion;
      console.log(`updated from ${oVersion} to ${nVersion} version`);
      if (!db.objectStoreNames.contains('bestScoreTable')) {
        dbObgect = db.createObjectStore('bestScoreTable', {
          keyPath: 'id',
        });
      }
    };
  };

  showTable = ():void => {
    let db:IDBDatabase;
    const crDb = indexedDB.open('maloiMASLACH', 7);
    crDb.onsuccess = ():void => {
      db = crDb.result;
      let tx = db.transaction('bestScoreTable', 'readwrite');
      tx.oncomplete = () => {
        const list = document.querySelector('.wlist');
        tx = db.transaction('bestScoreTable', 'readonly');
        const store = tx.objectStore('bestScoreTable');
        const getReq = store.getAll();
        getReq.onsuccess = () => {
          if (list) {
            list.innerHTML = getReq.result.map((player) => `
              <li data-key="${player.id}">
               <img class="head-avatar" src="${player.photo}">
               <div class="man-info">
                 <div class="name-and-surname">
                   <p class="name">${player.firstName}</p>
                   <p class="surname">${player.lastName}</p>
                 </div>
                 <p class="email">${player.eMail}</p>
               </div>
               <p class="player-score">Score:${player.score}</p>
              </li>
            `).join('\n');
          }
        };
      };
    };
  };

  showCongrat = ():void => {
    const win = document.querySelector('main');
    if (win) {
      win.innerHTML += `
      <div class="congrat-lay" id="congrat-lay">
        <div class="congrat-content">
        <h3>Congratulations</h3>
        <button class="congrat-ok" type="button">OK</button>
        </div>
    </div>
      `;
    }
  };

  closeCongrat = ():void => {
    const reg = document.querySelector('.congrat-lay');
    if (reg) {
      reg.remove();
    }
  };

  changeScore = (player: { [key: string]: string }, time:number):void => {
    let db:IDBDatabase;
    const crDb = indexedDB.open('maloiMASLACH', 7);
    crDb.onsuccess = function ():void {
      db = crDb.result;
      const tx = db.transaction('bestScoreTable', 'readwrite');
      const store = tx.objectStore('bestScoreTable');
      const getReq = store.getAll();
      getReq.onsuccess = () => {
        const del = store.delete(getReq.result[getReq.result.length - 1].id);
        player.score = `${Math.floor(3000 / (time / 1000))}`;
        const request = store.add(player);
      };
    };
  };
}
