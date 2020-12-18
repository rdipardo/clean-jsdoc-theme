(function() {
    const targets = Array.prototype.slice.call(document.querySelectorAll('pre'));
    const main = document.querySelector('#main');

    const footer = document.querySelector('#footer');
    const pageTitle = document.querySelector('#page-title');
    let pageTitleHeight = 0;

    const footerHeight = footer.getBoundingClientRect().height;

    if (pageTitle) {
        pageTitleHeight = pageTitle.getBoundingClientRect().height;

        // Adding margin (Outer height)
        pageTitleHeight += 45;
    }

    // subtracted 20 for extra padding.
    // eslint-disable-next-line no-undef
    const divMaxHeight = window.innerHeight - pageTitleHeight - footerHeight - 80;

    setTimeout(() => {
        targets.forEach(item => {
            const { innerHTML } = item;
            const divElement = document.createElement('div');

            divElement.style.maxHeight = `${divMaxHeight}px`;
            divElement.style.marginTop = '2rem';
            divElement.innerHTML = innerHTML;
            item.innerHTML = '';
            item.appendChild(divElement);
        });

        // eslint-disable-next-line no-undef
        main.style.minHeight = `${window.innerHeight - footerHeight - 15}px`;

        // See if we have to move something into view
        // eslint-disable-next-line no-undef
        const [, location] = window.location.href.split('#');

        if (location && location.length > 0) {
          try {
            const element = document.querySelector('#'.concat(location));

            element.scrollIntoView();
          } catch (_) {}
        }
    }, 300);
})();
