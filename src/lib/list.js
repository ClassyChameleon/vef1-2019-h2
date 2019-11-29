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
  let done = false;
  const finished = window.localStorage.getItem('finished');
  if (finished.includes('&&&')) {
    done = finished.split('&&&');
  }
  empty(document.querySelector('.list'));
  const number = document.querySelectorAll('.button__clicked');

  for (let stuff of array.lectures) {
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
      txtDiv.appendChild(category);
      txtDiv.appendChild(title);
      contDiv.appendChild(txtDiv);
      if (finished == null) {
      } else if (finished == stuff.slug) {
          const completion = document.createElement('div');
          completion.setAttribute('class','lecture__sign');
          completion.append(document.createTextNode('✓'));
          contDiv.appendChild(completion);
      } else if (done) {
        for (let finish of done) {
          if (finish == stuff.slug) {
            const completion = document.createElement('div');
            completion.setAttribute('class','lecture__sign');
            completion.append(document.createTextNode('✓'));
            contDiv.appendChild(completion);
          }
        }
      }
      section.appendChild(imgDiv);
      section.appendChild(contDiv);
      colDiv.appendChild(section);
      document.querySelector('.list').appendChild(colDiv);
      colDiv.addEventListener('click', () => {
        localStorage.setItem('fyrirlestur', JSON.stringify(stuff));
        window.location = 'fyrirlestur.html';
      });
    }
  }
}

export function fyrirlestrar(type) {
  toggle(type);
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
    localStorage.removeItem('fyrirlestur');
    const htmlb = document.querySelector('.bhtml');
    const cssb = document.querySelector('.bcss');
    const javab = document.querySelector('.bjavascript');
    htmlb.addEventListener('click', () => {
      fyrirlestrar('bhtml');
    });
    cssb.addEventListener('click', () => {
      fyrirlestrar('bcss');
    });
    javab.addEventListener('click', () => {
      fyrirlestrar('bjavascript');
    });
    fyrirlestrar('start');
  }
}

export function lestur() {
  const bigStuff = localStorage.getItem('fyrirlestur');
  const stuff = JSON.parse(bigStuff);
  document.querySelector('.header__image').setAttribute('src', stuff.image);
  document.querySelector('.markFinish').addEventListener('click', () => {
    localStorage.setItem('finished', localStorage.getItem('finished').concat('&&&', stuff.slug));
    window.location = 'index.html';
  });
  const parent = document.querySelector('.readLectureType');
  for (let item of stuff.content) {
    if (item.type == 'youtube') {
      const video = document.createElement('iframe');
      video.setAttribute('class','readLectureType__youtube');
      video.setAttribute('src', item.data);
      video.setAttribute('frameborder','0');
      video.setAttribute('allowfullscreen','0');
      parent.appendChild(video);
    }
    if (item.type == 'text') {
      const text = document.createElement('section');
      text.setAttribute('class','readLectureType__text');
      const textData = item.data.split('\n')
      for (let ptext of textData) {
        const para = document.createElement('p');
        para.setAttribute('class','readLectureType__text--paragraph');
        para.append(document.createTextNode(ptext));
        text.appendChild(para);
      }
      parent.appendChild(text);
    }
    if (item.type == 'quote') {
      const quote = document.createElement('blockquote');
      quote.setAttribute('class','readLectureType__quote');
      const para = document.createElement('p');
      para.setAttribute('class','readLectureType__quote--text');
      para.append(document.createTextNode(item.data));
      quote.appendChild(para);
      const attribute = document.createElement('p');
      attribute.setAttribute('class','readLectureType__quote--attribute');
      attribute.append(document.createTextNode(item.attribute));
      quote.appendChild(attribute);
      parent.appendChild(quote);
    }
    if (item.type == 'image') {
      const img = document.createElement('section');
      img.setAttribute('class','readLectureType__image');
      const image = document.createElement('img');
      image.setAttribute('src',item.data);
      img.appendChild(image);
      const para = document.createElement('p');
      para.setAttribute('class','readLectureType__image--caption');
      para.append(document.createTextNode(item.caption));
      img.appendChild(para);
      parent.appendChild(img);
    }
    if (item.type == 'heading') {
      const header = document.createElement('h2');
      header.setAttribute('class','readLectureType__heading');
      header.append(document.createTextNode(item.data));
      parent.appendChild(header);
    }
    if (item.type == 'list') {
      const united = document.createElement('ul');
      united.setAttribute('class','readLectureType__list');
      for (let thingy of item.data) {
        const listy = document.createElement('li');
        listy.setAttribute('class','readLectureType__list--item');
        listy.append(document.createTextNode(thingy));
        united.appendChild(listy);
      }
      parent.appendChild(united);
    }
    if (item.type == 'code') {
      const code = document.createElement('code');
      code.setAttribute('class','readLectureType__code');
      const split = item.data.split('\n\n');
      for (let mini of split) {
        const bit = mini.split('\n');
        if (bit.length == 1) {
          const codestuff = document.createElement('p');
          codestuff.setAttribute('class','readLectureType__code--line--margin');
          codestuff.append(document.createTextNode(mini ));
          code.appendChild(codestuff);
        } else {
          for (let i = 0; i < bit.length; i++) {
            if (i + 1 == bit.length) {
              const codestuff = document.createElement('p');
              codestuff.setAttribute('class','readLectureType__code--line--margin');
              codestuff.append(document.createTextNode(bit[i]));
              code.appendChild(codestuff);
            } else {
              const codestuff = document.createElement('p');
              codestuff.setAttribute('class','readLectureType__code--line');
              codestuff.append(document.createTextNode(bit[i]));
              code.appendChild(codestuff);
            }
          }
        }
      }
      parent.appendChild(code);
    }
  }
}
