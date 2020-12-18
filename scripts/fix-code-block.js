"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

(function () {
  var targets = Array.prototype.slice.call(document.querySelectorAll('pre'));
  var main = document.querySelector('#main');
  var footer = document.querySelector('#footer');
  var pageTitle = document.querySelector('#page-title');
  var pageTitleHeight = 0;
  var footerHeight = footer.getBoundingClientRect().height;

  if (pageTitle) {
    pageTitleHeight = pageTitle.getBoundingClientRect().height; // Adding margin (Outer height)

    pageTitleHeight += 45;
  } // subtracted 20 for extra padding.
  // eslint-disable-next-line no-undef


  var divMaxHeight = window.innerHeight - pageTitleHeight - footerHeight - 80;
  setTimeout(function () {
    targets.forEach(function (item) {
      var innerHTML = item.innerHTML;
      var divElement = document.createElement('div');
      divElement.style.maxHeight = "".concat(divMaxHeight, "px");
      divElement.style.marginTop = '2rem';
      divElement.innerHTML = innerHTML;
      item.innerHTML = '';
      item.appendChild(divElement);
    }); // eslint-disable-next-line no-undef

    main.style.minHeight = "".concat(window.innerHeight - footerHeight - 15, "px"); // See if we have to move something into view
    // eslint-disable-next-line no-undef

    var _window$location$href = window.location.href.split('#'),
        _window$location$href2 = _slicedToArray(_window$location$href, 2),
        location = _window$location$href2[1];

    if (location && location.length > 0) {
      try {
        var element = document.querySelector('#'.concat(location));
        element.scrollIntoView();
      } catch (_) {}
    }
  }, 300);
})();