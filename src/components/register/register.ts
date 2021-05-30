import { BaseComponent } from '../base-component';
import './register.css';

export class Register extends BaseComponent {
  constructor() {
    super('div', ['register-lay']);
  }

  registerForm = ():void => {
    const reg = document.querySelector('main');
    if (reg) {
      reg.innerHTML += `
      <div class="register-lay" id="register-lay">
    <div class="register-content">
      <h3>Register new Player</h3>
      <form class="register-form" id="form">
        <div class="form-left">
          <input class="invalid" type="text" id="firstName" placeholder="First Name" required>
          <input class="invalid" type="text" id="lastName" placeholder="Last Name" required>
          <input class="invalid" type="text" id="eMail" placeholder="E-mail" required>
        </div>
        <div class="form-right">
          <button class="add-user" type="submit" id="add-user"></button>
          <input type="file" id="reg-avatar-input" class="registration-avatar" name="registration-avatar">
          <img src="" class="avatar-on-reg" id="registration-avatar">
        </div>
      </form>
      <div class="register-form-butt">
        <label  for="add-user">
          add user
        </label>
        <button class="cancel" type="button">
          cancel
        </button>
      </div>
    </div>
  </div>
      `;
    }
  };

  closeForm = ():void => {
    const reg = document.querySelector('.register-lay');
    if (reg) {
      reg.remove();
    }
  };

  formValidate = ():number => {
    let noFit = 0;
    const check:boolean = /^[A-Za-zА-яа-я]+$/.test((<HTMLInputElement>document.getElementById('firstName')).value);
    document.getElementById('firstName')?.classList.remove('invalid');
    if (!check) {
      document.getElementById('firstName')?.classList.add('invalid');
      noFit++;
    }
    const check1:boolean = /^[A-Za-zА-яа-я]+$/.test((<HTMLInputElement>document.getElementById('lastName')).value);
    document.getElementById('lastName')?.classList.remove('invalid');
    if (!check1) {
      document.getElementById('lastName')?.classList.add('invalid');
      noFit++;
    }
    const check2:boolean = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i.test((<HTMLInputElement>document.getElementById('eMail')).value);
    document.getElementById('eMail')?.classList.remove('invalid');
    if (!check2) {
      document.getElementById('eMail')?.classList.add('invalid');
      noFit++;
    }
    return noFit;
  };

  inputIMG = ():void => {
    const imgPreviuInpt = <HTMLInputElement>document.getElementById('reg-avatar-input');
    const imgPreviu = <HTMLImageElement>document.getElementById('registration-avatar');
    if (!imgPreviuInpt.files?.length) {
      return;
    }
    const files = Array.from(imgPreviuInpt.files);
    files.forEach((file) => {
      if (!file.type.match('image')) {
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        imgPreviu?.setAttribute('src', `${event.target?.result}`);
      };
      reader.readAsDataURL(file);
    });
  };
}
