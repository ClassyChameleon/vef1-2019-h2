import { empty } from './helpers';

export function toggle(item) {
  let button;
  if (item === 'bhtml') {
    button = document.querySelector('.bhtml');
  } else if (item === 'bcss') {
    button = document.querySelector('.bcss');
  } else if (item === 'bjavascript') {
    button = document.querySelector('.bjavascript');
  } else {
    return;
  }
  if (button.classList.contains('button__clicked')) {
    button.classList.remove('button__clicked');
  } else {
    button.classList.add('button__clicked');
  }
}

function mainDisplay(array) {
  const finished = window.localStorage.getItem('finished');
  console.log(finished);
  empty(document.querySelector('.list'));
  const number = document.querySelectorAll('.button__clicked');
  for (let stuff of array.lectures) { /* eslint-disable-line */
    if (number.length === 0 || number.length === 3 || document.querySelector(`.b${stuff.category}`).classList.contains('button__clicked')) {
      const colDiv = document.createElement('div');
      colDiv.setAttribute('class', 'lectures__col');
      const section = document.createElement('section');
      const imgDiv = document.createElement('div');
      imgDiv.setAttribute('class', 'lecture__image');
      if (stuff.thumbnail !== undefined) {
        const img = document.createElement('img');
        img.setAttribute('src', stuff.thumbnail);
        imgDiv.appendChild(img);
      }
      const contDiv = document.createElement('div');
      contDiv.setAttribute('class', 'lecture__content');
      const txtDiv = document.createElement('div');
      txtDiv.setAttribute('class', 'lecture__text');
      const category = document.createElement('h3');
      category.setAttribute('class', 'lecture__category');
      category.append(document.createTextNode(stuff.category));
      const title = document.createElement('h2');
      title.setAttribute('class', 'lecture__title');
      title.append(document.createTextNode(stuff.title));
      section.setAttribute('class', 'lecture');
      if (finished == null) {
      } else if (finished == stuff.title) {
          section.setAttribute('class', 'finished');
      } else {
        for (let finish of finished) { /* eslint-disable-line */
          console.log(finish);
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
      colDiv.addEventListener('click', (e) => { // eslint segir að e sé ekki notað
        localStorage.setItem('fyrirlestur', JSON.stringify(stuff));
        window.location = 'fyrirlestur.html';
      });
    }
  }
}

export function fyrirlestrar(type) {
  console.log(type);
  //toggle(type);
  fetch('../lectures.json')
    .then((result) => {
      if (!result.ok) {
        throw new Error('Non 200 status');
      }
      return result.json();
    })
    .then((result) => {
      mainDisplay(result);
    })
    .catch((error) => { console.log(`Villa með gögn ${error}`); });
}

export function load() {
  const isLecturePage = document.body.classList.contains('lecture-page');
  if (!isLecturePage) {
    console.log('load ran');
    localStorage.removeItem('fyrirlestur');
    const htmlb = document.querySelector('.bhtml');
    const cssb = document.querySelector('.bcss');
    const javab = document.querySelector('.bjavascript');
    htmlb.addEventListener('click', (e) => { // eslint segir að e sé ekki notað
      fyrirlestrar('bhtml');
    });
    cssb.addEventListener('click', (e) => { // eslint segir að e sé ekki notað
      fyrirlestrar('bcss');
    });
    javab.addEventListener('click', (e) => { // eslint segir að e sé ekki notað
      fyrirlestrar('bjavascript');
    });
    fyrirlestrar('start');
  }
}

export function lestur() {
  console.log('lestur keyrist');
  const bigStuff = localStorage.getItem('fyrirlestur');
  const stuff = JSON.parse(bigStuff);
  document.querySelector('.header__image').setAttribute('src', stuff.thumbnail);
  document.querySelector('.markFinish').addEventListener('click', (e) => { // eslint segir að e sé ekki notað
    localStorage.setItem('finished', stuff.title);
    window.location = 'index.html';
  });
}
