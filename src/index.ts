import './style.css';
import { App } from './app';
import { Header } from './components/header/header';
import { Instruction } from './components/instruction/insrtuction';
import { Register } from './components/register/register';
import { DataBase } from './components/data-base/data-base';
import { uid } from './keygen';
import { GameSettings } from './components/game-settings/game-settngs';
import { Timer } from './components/timer/timer';
import { CardsField } from './components/card-field/cards-field';

function settingInit() {
  new Header().createHeader();
  new GameSettings().settingsMenu();
  workSpace();
}
function startAPP() {
  new Header().createHeader();
  new Instruction().startMain();
  workSpace();
}
function resultsWin() {
  new Header().createHeader();
  new DataBase().createScorePage();
  new DataBase().showTable();
  workSpace();
}
function resultsAfterGameCompleate() {
  new Header().createHeader();
  new DataBase().createScorePage();
  new DataBase().showTable();
  workSpace();
}
function workSpace() {
  const appElement = document.querySelector('main');
  if (!appElement) throw Error('App root element not found');

  document.querySelector('.head-register-but')?.addEventListener('click', () => {
    new Register().registerForm();
    const form = <HTMLFormElement>document.getElementById('form');

    (<HTMLInputElement>document.getElementById('reg-avatar-input')).addEventListener('change', () => {
      new Register().inputIMG();
    });
    document.querySelector('.register-form')?.addEventListener('click', () => {
      new Register().formValidate();
    });

    document.querySelector('.cancel')?.addEventListener('click', () => {
      new Register().closeForm();
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const vaildate = new Register().formValidate();

      if (vaildate !== 0) {
        console.log('Incorrect values');
      } else {
        const firstName:string = (<HTMLInputElement>document.getElementById('firstName')).value;
        const lastName:string = (<HTMLInputElement>document.getElementById('lastName')).value;
        const eMail:string = (<HTMLInputElement>document.getElementById('eMail')).value;
        const photo:string = (<HTMLImageElement>document.getElementById('registration-avatar')).src;

        const score = '0';

        const player = {
          id: uid(),
          firstName,
          lastName,
          eMail,
          photo,
          score,
        };
        new DataBase().init(player);
        new Header().addUserHeader(photo);

        document.querySelector('.head-start-but')?.addEventListener('click', () => {
          if (document.querySelector('.game-settings') == null) {
            new Instruction().removeInstr();
            new App(appElement).newGame();
            new Header().startedGame(photo);
            const startTime = new Timer().timer();

            document.querySelector('.card-field')?.addEventListener('click', () => {
              const flipChacker = new CardsField().flippedCheck();
              if (flipChacker === document.querySelectorAll('.card-container').length) {
                const endTime = new Timer().endCounter() - startTime - 4500;
                new DataBase().changeScore(player, endTime);
                new DataBase().showCongrat();
                document.querySelector('.congrat-ok')?.addEventListener('click', () => {
                  new DataBase().closeCongrat();
                  resultsAfterGameCompleate();
                });
                resultsAfterGameCompleate();
              }
            });

            document.querySelector('.head-stop-but')?.addEventListener('click', () => {
              startAPP();
            });

            document.querySelector('.about-game-head')?.addEventListener('click', () => {
              startAPP();
            });

            document.querySelector('.best-score-head')?.addEventListener('click', () => {
              resultsWin();
            });

            document.querySelector('.game-setting-head')?.addEventListener('click', () => {
              settingInit();
            });
          } else {
            const cardType = (<HTMLInputElement>document.getElementById('first-set'))?.value;
            const difficulty = (<HTMLInputElement>document.getElementById('thecond-set'))?.value;

            if (cardType && difficulty) {
              new Instruction().removeInstr();
              new App(appElement).newGameWithSet(cardType, difficulty);
              new Header().startedGame(photo);
              const startTime = new Timer().timer();

              document.querySelector('.card-field')?.addEventListener('click', () => {
                const flipChacker = new CardsField().flippedCheck();
                if (flipChacker === document.querySelectorAll('.card-container').length) {
                  const endTime = new Timer().endCounter() - startTime - 4500;
                  new DataBase().changeScore(player, endTime);
                  new DataBase().showCongrat();
                  document.querySelector('.congrat-ok')?.addEventListener('click', () => {
                    new DataBase().closeCongrat();
                    resultsAfterGameCompleate();
                  });
                }
              });

              document.querySelector('.head-stop-but')?.addEventListener('click', () => {
                startAPP();
              });

              document.querySelector('.about-game-head')?.addEventListener('click', () => {
                startAPP();
              });

              document.querySelector('.best-score-head')?.addEventListener('click', () => {
                resultsWin();
              });

              document.querySelector('.game-setting-head')?.addEventListener('click', () => {
                settingInit();
              });
            }
          }
        });

        new Register().closeForm();
      }
    });
  });

  document.querySelector('.best-score-head')?.addEventListener('click', (e) => {
    new DataBase().createScorePage();
    new DataBase().showTable();
  });

  document.querySelector('.about-game-head')?.addEventListener('click', () => {
    new Instruction().startMain();
  });

  document.querySelector('.game-setting-head')?.addEventListener('click', () => {
    new GameSettings().settingsMenu();
  });
}

window.onload = () => {
  startAPP();
};

/* document.querySelector('main')?.addEventListener('click', () => {
    const spis = document.querySelectorAll('li');
    console.log(spis[spis.length - 1].getAttribute('data-key'));
    new DataBase().changeScore();
  }); */
