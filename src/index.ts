import './style.css';
import { App } from './app';
import { Header } from './components/header/header';
import { Instruction } from './components/instruction/insrtuction';
import { Register } from './components/register/register';
import { DataBase } from './components/data-base/data-base';
import { uid } from './keygen';
import { GameSettings } from './components/game-settings/game-settngs';
import { Timer } from './components/timer/timer';

window.onload = () => {
  new Header().createHeader();

  const appElement = document.querySelector('main');
  if (!appElement) throw Error('App root element not found');

  new Instruction().startMain();

  document.querySelector('.head-register-but')?.addEventListener('click', () => {
    new Register().registerForm();
    const form = <HTMLFormElement>document.getElementById('form');
    document.querySelector('.cancel')?.addEventListener('click', () => {
      new Register().closeForm();
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const firstName:string = (<HTMLInputElement>document.getElementById('firstName')).value;
      const lastName:string = (<HTMLInputElement>document.getElementById('lastName')).value;
      const eMail:string = (<HTMLInputElement>document.getElementById('eMail')).value;
      const score = '0';

      const player = {
        id: uid(),
        firstName,
        lastName,
        eMail,
        score,
      };
      /* function init() {
        let db:IDBDatabase;
        let dbObgect = null;
        const crDb = indexedDB.open('maloiMASLACH', 2);
        function makeTX(storeName:string, mode:IDBTransactionMode):IDBTransaction {
          const tx = db.transaction(storeName, mode);
          return tx;
        }
        crDb.onerror = function ():void {
          console.log('err1');
        };
        crDb.onsuccess = function ():void {
          console.log('success', db);
          db = crDb.result;
          const tx = makeTX('scoreTable', 'readwrite');
          tx.oncomplete = () => {
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
      }

      init(); */

      new DataBase().init(player);
      new Header().addUserHeader();

      document.querySelector('.head-start-but')?.addEventListener('click', () => {
        if (document.querySelector('.game-settings') == null) {
          new Instruction().removeInstr();
          new App(appElement).newGame();
          new Timer().timer();
        } else {
          const cardType = (<HTMLInputElement>document.getElementById('first-set'))?.value;
          const difficulty = (<HTMLInputElement>document.getElementById('thecond-set'))?.value;
          if (cardType && difficulty) {
            new Instruction().removeInstr();
            new App(appElement).newGameWithSet(cardType, difficulty);
            new Timer().timer();
          }
        }
      });

      new Register().closeForm();
    });
  });
  document.querySelector('.best-score-head')?.addEventListener('click', (e) => {
    new DataBase().createScorePage();
    new DataBase().showTable();

    /* document.querySelector('main')?.addEventListener('click', () => {
      const spis = document.querySelectorAll('li');
      console.log(spis[spis.length - 1].getAttribute('data-key'));
      new DataBase().changeScore();
    }); */
  });
  document.querySelector('.about-game-head')?.addEventListener('click', () => {
    new Instruction().startMain();
  });
  document.querySelector('.game-setting-head')?.addEventListener('click', () => {
    new GameSettings().settingsMenu();
    document.querySelector('.head-start-but')?.addEventListener('click', () => {
      const cardType = (<HTMLInputElement>document.getElementById('first-set'))?.value;
      const difficulty = (<HTMLInputElement>document.getElementById('thecond-set'))?.value;
      if (cardType && difficulty) {
        new Instruction().removeInstr();
        new App(appElement).newGameWithSet(cardType, difficulty);
        new Timer().timer();
      }
    });
  });
};
