import { BaseComponent } from '../base-component';
import {ID} from './data-baseID'

export class DataBase extends BaseComponent{
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly eMail: string;
  constructor(firstName: string,lastName: string,eMail: string){
    super('div',['data-base']);
    this.id = ID.getNewId();
    this.firstName =firstName;
    this.lastName =lastName;
    this.eMail =eMail;
  }


}
