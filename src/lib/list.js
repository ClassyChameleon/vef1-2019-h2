import { empty } from './helpers';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
    console.log(this);
    console.log(this.container);
  }

  load() {
    const button = document.querySelectorAll('button');
    const lectures = fetch('../lectures.json')
    console.log(button);
  }

}
