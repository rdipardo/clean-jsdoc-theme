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
    let code = document.getElementById(id);

    // Selecting the code element of that pre element
    code = code.childNodes[0].childNodes[0].innerText;

    // Copy
    copy(code);

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
        const copyToClipboard = `<div class="code-copy-icon-container" onclick="copyFunction('${id}')"><div><svg class="sm-icon" alt="click to copy"><use xlink:href="#copy-icon"></use></svg>${tooltip}<div></div>`;

        // Extract the code language
        const langName = classList && classList.length ?
            classList[classList.length - 1].split('-')[1] || 'javascript' :
            '';

        const langNameDiv =
              `<div class="code-lang-name-container"><div class="code-lang-name">${langName.toLocaleUpperCase()}</div></div>`;

        // Appending everything to the current pre element
        allPre[i].innerHTML += langNameDiv + (langName.length ? copyToClipboard : '');
        allPre[i].setAttribute('id', id);
    }
})();
