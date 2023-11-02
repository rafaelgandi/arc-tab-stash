import { transform } from '../lib/nested-css-to-flat.js'; // See: https://github.com/MatthiasKainer/nested-css-to-flat

const $head = document.querySelector('head');
const $body = document.querySelector('body');
const isNestedCssSupported = (() => {
    const style = document.createElement('style');
    style.setAttribute('id', 'nestcss-test');
    style.textContent = `#nestcss-cont-test { & div { content: 'hello-css-nesting'; }}`;
    style.setAttribute('type', 'text/css');
    const div = document.createElement('div');
    div.id = 'nestcss-cont-test';
    div.innerHTML = '<div></div>';
    $head.appendChild(style);
    $body.appendChild(div);
    const con = getComputedStyle(div.querySelector('div')).content;
    style.remove();
    div.remove();
    return con.includes('hello-css-nesting');
})();


export default function styled(strings, ...values) {
    const css = strings.reduce((result, string, index) => {
        return result + string + (values[index] || '');
    }, '');
    const cssStyles = (!isNestedCssSupported) ? transform(css) : css;
    const style = document.createElement('style');
    style.setAttribute('data-generated', 'true');
    style.textContent = cssStyles;
    style.setAttribute('type', 'text/css');
    $head.appendChild(style);
    return cssStyles;
}