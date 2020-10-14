window.Chat = ((d, ns) => {

    const createElement = (tagName, classes = [], textContent) => {
        const $el = d.createElement(tagName);
        $el.classList.add(...classes);
        $el.textContent = textContent;
        return $el;
    };

    ns.createElement = createElement;

    return ns;

})(document, window.Chat || {});