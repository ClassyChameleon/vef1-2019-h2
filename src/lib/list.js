import { empty } from './helpers';

export default function load() {
  const htmlb = document.querySelector('.bhtml');
  const cssb = document.querySelector('.bcss');
  const javab = document.querySelector('.bjava');
  htmlb.addEventListener('click',(e) => {
    fyrirlestrar('bhtml');
});
cssb.addEventListener('click',(e) => {
  fyrirlestrar('bcss');
});
  javab.addEventListener('click',(e) => {
    fyrirlestrar('bjava');
});
  fyrirlestrar('start');
  console.log('loaded');
}
export function fyrirlestrar(type) {
  const htmlb = document.querySelector('.bhtml');
  const cssb = document.querySelector('.bcss');
  const javab = document.querySelector('.bjava');
  console.log(type);
  toggle(type);
  const lectures = fetch('../lectures.json');
  if (type == 'start' || htmlb.classList.contains('button__clicked') && cssb.classList.contains('button__clicked') && javab.classList.contains('button__clicked')){
    console.log(lectures);
  }
}
export function toggle(item) {
  let button;
  if (item == 'bhtml') {
    button = document.querySelector('.bhtml');
  } else if (item == 'bcss') {
    button = document.querySelector('.bcss');
  } else  if (item == 'bjava') {
    button = document.querySelector('.bjava');
  } else {
    return;
  }
  if (button.classList.contains('button__clicked')){
    button.classList.remove('button__clicked');
  } else {
    button.classList.add('button__clicked');
  }
}
export function lestur(type) {
  const htmlb = document.querySelector('.bhtml');
  const cssb = document.querySelector('.bcss');
  const javab = document.querySelector('.bjava');
  const lectures = fetch('../lectures.json');
  if (type == 'start' || htmlb.classList.contains('button__clicked') && cssb.classList.contains('button__clicked') && javab.classList.contains('button__clicked')){
    console.log(lectures);
  }
}
// pfft. þarf engan constructor.
  /*constructor() {
    this.container = document.querySelector('.list');
    
  }*/