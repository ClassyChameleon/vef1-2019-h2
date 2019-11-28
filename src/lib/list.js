import { empty } from './helpers';

export default function load() {
  const htmlb = document.querySelector('.bhtml');
  const cssb = document.querySelector('.bcss');
  const javab = document.querySelector('.bjavascript');
  htmlb.addEventListener('click',(e) => {
    fyrirlestrar('bhtml');
});
cssb.addEventListener('click',(e) => {
  fyrirlestrar('bcss');
});
  javab.addEventListener('click',(e) => {
    fyrirlestrar('bjavascript');
});
  fyrirlestrar('start');
}
export function fyrirlestrar(type) {
  const htmlb = document.querySelector('.bhtml');
  const cssb = document.querySelector('.bcss');
  const javab = document.querySelector('.bjavascript');
  toggle(type);
  const lectures = fetch('../lectures.json');
  fetch('../lectures.json')
    .then((result) => {
        if (!result.ok) {
            throw new Error('Non 200 status');
        }
        return result.json();
    })
    .then(result => {
        mainDisplay(result);
    })
    .catch(error => {console.log(`Villa með gögn ${error}`)})
  if (type == 'start' || htmlb.classList.contains('button__clicked') && cssb.classList.contains('button__clicked') && javab.classList.contains('button__clicked')){
    console.log(lectures);
  }
}
export function mainDisplay(array){
  empty(document.querySelector('.list'));
  const number = document.querySelectorAll('.button__clicked');
  for (let stuff of array.lectures){
    if (number.length == 0 || number.length == 3 || document.querySelector(`.b${stuff.category}`).classList.contains('button__clicked')){
      let colDiv = document.createElement('div');
      colDiv.setAttribute('class','lectures__col');
      let section = document.createElement('section');
      section.setAttribute('class','lecture');
      let imgDiv = document.createElement('div');
      imgDiv.setAttribute('class','lecture__image');
      if (stuff.thumbnail != undefined){
        let img = document.createElement('img');
        img.setAttribute('src', stuff.thumbnail);
        imgDiv.appendChild(img);
      }
      let contDiv = document.createElement('div');
      contDiv.setAttribute('class','lecture__content');
      let txtDiv = document.createElement('div');
      txtDiv.setAttribute('class','lecture__text');
      let category = document.createElement('h3');
      category.setAttribute('class','lecture__category');
      category.append(document.createTextNode(stuff.category));
      let title = document.createElement('h2');
      title.setAttribute('class','lecture__title');
      title.append(document.createTextNode(stuff.title));
      txtDiv.appendChild(category);
      txtDiv.appendChild(title);
      contDiv.appendChild(txtDiv);
      section.appendChild(imgDiv);
      section.appendChild(contDiv);
      colDiv.appendChild(section);
      document.querySelector('.list').appendChild(colDiv);
    }
  }
}
export function toggle(item) {
  let button;
  if (item == 'bhtml') {
    button = document.querySelector('.bhtml');
  } else if (item == 'bcss') {
    button = document.querySelector('.bcss');
  } else  if (item == 'bjavascript') {
    button = document.querySelector('.bjavascript');
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
  const javab = document.querySelector('.bjavascript');
  const lectures = fetch('../lectures.json');
  if (type == 'start' || htmlb.classList.contains('button__clicked') && cssb.classList.contains('button__clicked') && javab.classList.contains('button__clicked')){
    console.log(lectures);
  }
}
// pfft. þarf engan constructor.
  /*constructor() {
    this.container = document.querySelector('.list');
    
  }*/