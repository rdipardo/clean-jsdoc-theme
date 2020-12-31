"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function hideSearchList() {
  document.getElementById('search-item-ul').style.display = 'none';
}

function showSearchList() {
  document.getElementById('search-item-ul').style.display = 'block';
}

function checkClick(e) {
  if (e.target.id !== 'search-box') {
    setTimeout(function () {
      hideSearchList();
    }, 60);
    /* eslint-disable-next-line */

    window.removeEventListener('click', checkClick);
  }
}

function search(list, options, keys, searchKey) {
  var defaultOptions = {
    'shouldSort': true,
    'threshold': 0.4,
    'location': 0,
    'distance': 100,
    'maxPatternLength': 32,
    'minMatchCharLength': 1,
    keys: keys
  };

  var op = _objectSpread(_objectSpread({}, defaultOptions), options);
  /* eslint-disable-next-line */


  var fuse = new Fuse(list, op);
  var result = fuse.search(searchKey);
  var searchUL = document.getElementById('search-item-ul');
  searchUL.innerHTML = '';

  if (result.length === 0) {
    searchUL.innerHTML += '<li> No Result Found </li>';
  } else {
    result.forEach(function (item) {
      searchUL.innerHTML += "<li>".concat(item.link, "</li>");
    });
  }
}
/* eslint-disable-next-line */


function setupSearch(list, options) {
  var inputBox = document.getElementById('search-box');
  var keys = ['title'];
  inputBox.addEventListener('keyup', function () {
    if (inputBox.value !== '') {
      showSearchList();
      search(list, options, keys, inputBox.value);
    } else {
      hideSearchList();
    }
  });
  inputBox.addEventListener('focus', function () {
    showSearchList();

    if (inputBox.value !== '') {
      search(list, options, keys, inputBox.value);
    }
    /* eslint-disable-next-line */


    window.addEventListener('click', checkClick);
  });
}