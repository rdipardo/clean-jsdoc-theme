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

function search(list, _, keys, searchKey) {
    const options = {
        'shouldSort': true,
        'threshold': 0.4,
        'location': 0,
        'distance': 100,
        'maxPatternLength': 32,
        'minMatchCharLength': 1,
        keys
    };

    // eslint-disable-next-line no-undef
    const searchIndex = Fuse.createIndex(options.keys, list);

    // eslint-disable-next-line no-undef
    const fuse = new Fuse(list, options, searchIndex);

    let result = fuse.search(searchKey);

    if (result.length > 20) {
        result = result.slice(0, 20);
    }

    const searchUL = document.getElementById('search-item-ul');

    searchUL.innerHTML = '';

    if (result.length === 0) {
        searchUL.innerHTML += '<li class="p-h-n"> No Result Found </li>';
    } else {
        result.forEach(obj => {
            searchUL.innerHTML += `<li>${obj.item.link}</li>`;
        });
    }
}

/* eslint-disable-next-line */
function setupSearch(list) {
    const inputBox = document.getElementById('search-box-input');
    const keys = ['title'];

    inputBox.addEventListener('keyup', () => {
        if (inputBox.value !== '') {
            showSearchList();
            search(list, null, keys, inputBox.value);
        }
        else { hideSearchList(); }
    });

    inputBox.addEventListener('focus', () => {
        showSearchList();
        if (inputBox.value !== '') {
            search(list, null, keys, inputBox.value);
        }

        /* eslint-disable-next-line */
        window.addEventListener('click', checkClick);
    });
}
