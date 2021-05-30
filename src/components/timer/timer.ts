import { BaseComponent } from '../base-component';
import './timer.css';

export class Timer extends BaseComponent {
  timer = ():number => {
    const main = document.querySelector('main');
    main?.insertAdjacentHTML('afterbegin', `
  <div class="canvas-conteiner">
    <canvas id="canvas"></canvas>
    <p>Get ready<p>
  </div>
  `);
    let timerValue = 0;
    const canvas = <HTMLCanvasElement>document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const start = new Date().getTime();
    if (ctx) {
      ctx.font = '500 48px roboto,sans-serif';

      setTimeout(() => {
        setInterval(() => {
          timerValue += 1000;
          const date = new Date(timerValue);
          ctx.fillStyle = 'rgb(236, 209, 255)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = 'indigo';
          ctx.fillText(`${date.getUTCMinutes()}:${date.getUTCSeconds()}`, 120, 85);
          console.log(timerValue);
        }, 1000);
        console.log(timerValue);
      }, 4500);
    }
    return (start);
  };

  endCounter = ():number => (new Date().getTime());
}
