import { BaseComponent } from '../base-component';
import './register.css'

export class Register extends BaseComponent{
  constructor(){
    super('div',['register-lay']);
  }

  registerForm(){
    const reg = document.querySelector('main');
    if(reg){
      reg.innerHTML+=`
      <div class="register-lay" id="register-lay">
    <div class="register-content">
      <h3>Register new Player</h3>
      <form class="register-form" id="form">
        <div class="form-left">
          <input type="text" id="firstName" placeholder="First Name" required>
          <input type="text" id="lastName" placeholder="Last Name" required>
          <input type="text" id="eMail" placeholder="E-mail" required>
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
      `
    }



}
  closeForm(){
    const reg = document.querySelector('.register-lay');
    if(reg){
      reg.remove();
    }
  }

}
