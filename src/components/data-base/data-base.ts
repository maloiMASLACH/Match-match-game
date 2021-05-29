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

  showTable = ():void => {
    let db:IDBDatabase;
    const crDb = indexedDB.open('maloiMASLACH', 2);
    crDb.onsuccess = ():void => {
      db = crDb.result;
      let tx = db.transaction('scoreTable', 'readwrite');
      tx.oncomplete = () => {
        const list = document.querySelector('.wlist');
        tx = db.transaction('scoreTable', 'readonly');
        const store = tx.objectStore('scoreTable');
        const getReq = store.getAll();
        getReq.onsuccess = () => {
          if (list) {
            list.innerHTML = getReq.result.map((player) => `
              <li data-key="${player.id}">
               <img class="head-avatar" src="https://sun9-46.userapi.com/impg/oL-wKdkN4BZ6HPaMtOT-eMBrTAlm_M314zlG2w/JA5b8BbGK-w.jpg?size=8x14&quality=96&sign=782155d8ab1347b91208a14aa78e2c80&type=album">
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

  init = (player: { [key: string]: string }):void => {
    let db:IDBDatabase;
    let dbObgect = null;
    const crDb = indexedDB.open('maloiMASLACH');
    function buildlist():void {
      const list = document.querySelector('.wlist');
      const tx = db.transaction('scoreTable', 'readonly');
      if (list) list.innerHTML = '<li>Loading...</li>';
      tx.oncomplete = () => {
      };
      const store = tx.objectStore('scoreTable');
      const getReq = store.getAll();
      getReq.onsuccess = () => {
        if (list) {
          list.innerHTML = getReq.result.map((qq) => `
            <li>
             <img class="head-avatar" src="https://sun9-46.userapi.com/impg/oL-wKdkN4BZ6HPaMtOT-eMBrTAlm_M314zlG2w/JA5b8BbGK-w.jpg?size=8x14&quality=96&sign=782155d8ab1347b91208a14aa78e2c80&type=album">
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
      const tx = db.transaction('scoreTable', 'readwrite');
      tx.oncomplete = () => {
        buildlist();
      };
      const store = tx.objectStore('scoreTable');
      const request = store.add(player);
    };
    crDb.onupgradeneeded = (ev) => {
      db = crDb.result;
      const oVersion = ev.oldVersion;
      const nVersion = ev.newVersion;
      console.log(`updated from ${oVersion} to ${nVersion} version`);
      if (!db.objectStoreNames.contains('scoreTable')) {
        dbObgect = db.createObjectStore('scoreTable', {
          keyPath: 'id',
        });
      }
    };
  };

  changeScore = ():void => {
    const spis = document.querySelectorAll('li');
    console.log(document.querySelector('li')?.querySelector('.player-score'));
    const last = spis[spis.length - 1].getAttribute('data-key');
    if (last) {
      let db:IDBDatabase;
      const crDb = indexedDB.open('maloiMASLACH', 1);
      crDb.onsuccess = function () {
        db = crDb.result;
        const tx = db.transaction('scoreTable', 'readwrite');
        tx.oncomplete = () => {
          const list = spis[spis.length - 1].querySelector('.player-score');
          const txn = db.transaction('scoreTable', 'readonly');
          const store = txn.objectStore('scoreTable');
          const getReq = store.getAll();
          getReq.onsuccess = () => {
            if (list) {
              list.innerHTML = `
                 <p class="player-score">Score:100</p>
              `;
            }
          };
        };
      };
    }
  };
}
