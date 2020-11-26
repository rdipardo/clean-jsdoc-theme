(function() {
    const targets = Array.prototype.slice.call(document.querySelectorAll('pre'));

    setTimeout(() => {
        targets.forEach(item => {
            const { innerHTML } = item;
            const divElement = document.createElement('div');

            divElement.innerHTML = innerHTML;
            item.innerHTML = '';
            item.appendChild(divElement);
        });
    }, 300);
})();
