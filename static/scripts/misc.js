const accordionLocalStorageKey = 'accordion-id';

function copy(value) {
    const el = document.createElement('textarea');

    el.value = value;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

function showTooltip(id) {
    const tooltip = document.getElementById(id);

    tooltip.classList.add('show-tooltip');
    setTimeout(() => {
        tooltip.classList.remove('show-tooltip');
    }, 3000);
}

/* eslint-disable-next-line */
function copyFunction (id) {
    // Selecting the pre element
    const code = document.getElementById(id);
    let element = code.querySelector('.linenums');

    if (!element) {
        // selecting the code block
        element = code.querySelector('code');
    }

    // copy
    copy(element.innerText);

    // Show tooltip
    showTooltip(`tooltip-${id}`);
}

(function() {
    // Capturing all pre element on the page
    const allPre = document.getElementsByTagName('pre');

    for (let i = 0; i < allPre.length; i++) {
        // Get the list of class in current pre element
        const { classList } = allPre[i];
        const id = `pre-id-${i}`;

        // Tooltip
        const tooltip = `<div class="tooltip" id="tooltip-${id}">Copied!</div>`;

        // Template of copy to clipboard icon container
        const copyToClipboard =
            `<div class="code-copy-icon-container" onclick="copyFunction('${id}')">` +
            '<div><svg class="sm-icon" alt="Click to copy"><use xlink:href="#copy-icon"></use></svg>' +
            `${tooltip}<div></div>`;

        // Extract the code language
        const langName = classList && classList.length ?
            classList[classList.length - 1].split('-')[1] || 'javascript' :
            '';

        const langNameDiv =
            '<div class="code-lang-name-container"><div class="code-lang-name">' +
            `${langName.toLocaleUpperCase()}</div></div>`;

        // appending everything to the current pre element
        allPre[i].innerHTML +=
            '<div class="pre-top-bar-container">' +
            `${langNameDiv}${langName.length ? copyToClipboard : ''}</div>`;
        allPre[i].setAttribute('id', id);
    }
})();


/**
 * Function to set accordion id to localStorage.
 * @param {string} id Accordion id
 */
function setAccordionIdToLocalStorage(id) {

    /**
     * @type {object}
     */
    const ids = JSON.parse(localStorage.getItem(accordionLocalStorageKey));

    ids[id] = id;
    localStorage.setItem(accordionLocalStorageKey, JSON.stringify(ids));
}

/**
 * Function to remove accordion id from localStorage.
 * @param {string} id Accordion id
 */
function removeAccordionIdFromLocalStorage(id) {

    /**
     * @type {object}
     */
    const ids = JSON.parse(localStorage.getItem(accordionLocalStorageKey));

    delete ids[id];
    localStorage.setItem(accordionLocalStorageKey, JSON.stringify(ids));
}

/**
 * Function to get all accordion ids from localStorage.
 *
 * @returns {object}
 */
function getAccordionIdsFromLocalStorage() {

    /**
     * @type {object}
     */
    const ids = JSON.parse(localStorage.getItem(accordionLocalStorageKey));

    return ids || {};
}


function toggleAccordion(element) {
    const currentNode = element;
    const isCollapsed = currentNode.classList.contains('collapsed');
    const currentNodeUL = currentNode.querySelector('ul');

    if (isCollapsed) {
        const { scrollHeight } = currentNodeUL;

        currentNodeUL.style.height = `${scrollHeight + 20}px`;
        currentNode.classList.remove('collapsed');
        setAccordionIdToLocalStorage(currentNode.id);
    } else {
        currentNodeUL.style.height = '0px';
        currentNode.classList.add('collapsed');
        removeAccordionIdFromLocalStorage(currentNode.id);
    }
}

(function() {
    if (localStorage.getItem(accordionLocalStorageKey) === undefined ||
    localStorage.getItem(accordionLocalStorageKey) === null) {
        localStorage.setItem(accordionLocalStorageKey, '{}');
    }
    const getAllAccordion = Array.prototype.slice.call(document.querySelectorAll('.accordion'));
    const ids = getAccordionIdsFromLocalStorage();

    getAllAccordion.forEach(item => {
        const clickElement = item.querySelector('.accordion-title');

        clickElement.addEventListener('click', () => toggleAccordion(item));
        if (item.id in ids) {
            toggleAccordion(item);
        }
    });
})();
