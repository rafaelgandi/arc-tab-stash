import { transform } from '../lib/nested-css-to-flat.js';


export default function styled(strings, ...values) {
    const css = strings.reduce((result, string, index) => {
        return result + string + (values[index] || '');
    }, '');
    const cssStyles = transform(css);
    const style = document.createElement('style');
    style.setAttribute('data-generated', 'true');
    style.textContent = cssStyles;
    style.setAttribute('type', 'text/css');
    document.querySelector('head').appendChild(style);
    return cssStyles;
}