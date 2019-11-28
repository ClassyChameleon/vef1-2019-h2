import { empty } from './helpers';

export default function load() {
  const isLecturePage = document.body.classList.contains('lecture-page');
  if (!isLecturePage){
    console.log('load ran');
    localStorage.removeItem('fyrirlestur');
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
}
export function mainDisplay(array){
  const finished = window.localStorage('finished');
  empty(document.querySelector('.list'));
  const number = document.querySelectorAll('.button__clicked');
  for (let stuff of array.lectures){
    if (number.length == 0 || number.length == 3 || document.querySelector(`.b${stuff.category}`).classList.contains('button__clicked')){
      let colDiv = document.createElement('div');
      colDiv.setAttribute('class','lectures__col');
      let section = document.createElement('section');
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
      section.setAttribute('class','lecture');
      if (finished.length > 0){
        for (let finish of finished){
          if (finish == stuff.title){
            section.setAttribute('class','finished');
          }
        }
      }
      txtDiv.appendChild(category);
      txtDiv.appendChild(title);
      contDiv.appendChild(txtDiv);
      section.appendChild(imgDiv);
      section.appendChild(contDiv);
      colDiv.appendChild(section);
      document.querySelector('.list').appendChild(colDiv);
      colDiv.addEventListener('click',(e) => {
        localStorage.setItem('fyrirlestur', JSON.stringify(stuff));
        window.location = "fyrirlestur.html";
      });
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
export function lestur() {
  console.log('lestur keyrist');
  const bigStuff = localStorage.getItem('fyrirlestur');
  const stuff = JSON.parse(bigStuff);
  document.querySelector('.header__image').setAttribute('src',stuff.thumbnail);
  document.querySelector('.markFinish').addEventListener('click',(e) => {
    localStorage.setItem('finished', stuff.title);
    window.location = "index.html";
  });

}
// pfft. þarf engan constructor.
  /*constructor() {
    this.container = document.querySelector('.list');
    
  }*/