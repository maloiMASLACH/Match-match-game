import { BaseComponent } from '../base-component';
import './timer.css';

export class Timer extends BaseComponent {
  timer = ():void => {
    const main = document.querySelector('main');
    main?.insertAdjacentHTML('afterbegin', `
  <div class="canvas-conteiner">
    <canvas id="canvas"></canvas>
    <p>Get ready<p>
  </div>
  `);
    const canvas = <HTMLCanvasElement>document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    if (ctx) {
      console.log('');
      ctx.font = '500 48px roboto,sans-serif';
      let timerValue = 0;
      setTimeout(() => {
        setInterval(() => {
          timerValue += 1000;
          const date = new Date(timerValue);
          ctx.fillStyle = 'rgb(236, 209, 255)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = 'indigo';
          ctx.fillText(`${date.getUTCMinutes()}:${date.getUTCSeconds()}`, 120, 85);
        }, 1000);
      }, 4500);
    }

    /* return {

    }; */
  };
}
