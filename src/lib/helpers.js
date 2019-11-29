export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

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
