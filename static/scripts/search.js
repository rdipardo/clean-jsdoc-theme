function hideSearchList() {
    document.getElementById('search-item-ul').style.display = 'none';
}

function showSearchList() {
    document.getElementById('search-item-ul').style.display = 'block';
}

function checkClick(e) {
    if (e.target.id !== 'search-box-input') {
        setTimeout(() => {
            hideSearchList();
        }, 60);

        /* eslint-disable-next-line */
        window.removeEventListener('click', checkClick);
    }
}

function search(list, options, keys, searchKey) {
    const defaultOptions = {
        'shouldSort': true,
        'threshold': 0.4,
        'location': 0,
        'distance': 100,
        'maxPatternLength': 32,
        'minMatchCharLength': 1,
        keys
    };

    const op = { ...defaultOptions,
...options };

    /* eslint-disable-next-line */
    var fuse = new Fuse(list, op);
    const result = fuse.search(searchKey);
    const searchUL = document.getElementById('search-item-ul');

    searchUL.innerHTML = '';

    if (result.length === 0) {
        searchUL.innerHTML += '<li class="p-h-n"> No Result Found </li>';
    } else {
        result.forEach(item => {
            searchUL.innerHTML += `<li>${item.link}</li>`;
        });
    }
}

/* eslint-disable-next-line */
function setupSearch(list, options) {
    const inputBox = document.getElementById('search-box-input');
    const keys = ['title'];

    inputBox.addEventListener('keyup', () => {
        if (inputBox.value !== '') {
            showSearchList();
            search(list, options, keys, inputBox.value);
        }
        else { hideSearchList(); }
    });

    inputBox.addEventListener('focus', () => {
        showSearchList();
        if (inputBox.value !== '') {
            search(list, options, keys, inputBox.value);
        }

        /* eslint-disable-next-line */
        window.addEventListener('click', checkClick);
    });
}
