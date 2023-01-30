// LM: 2023-01-30 10:07:47 [Used so that I can write nested css without installing any complicated libraries.]
const { watch, readFileSync, writeFileSync, readdirSync, lstatSync} = require('fs');
const path = require('path');

// See: https://github.com/multiprocessio/cssplus
// See: https://datastation.multiprocess.io/blog/2021-10-31-building-a-nested-css-rule-expander.html
var d=Object.defineProperty;var W=r=>d(r,"__esModule",{value:!0});var D=(r,e)=>{W(r);for(var o in e)d(r,o,{get:e[o],enumerable:!0})};D(exports,{SETTINGS:()=>i,transform:()=>S});var i={DEBUG:!1};function t(r,e){for(;/\s/.test(r[e]);)e++;if(r[e]==="/"&&r[e+1]==="*"){for(e+=2;!(r[e]==="*"&&r[e+1]==="/");)e++;e+=2}for(;/\s/.test(r[e]);)e++;return e}function h(r,...e){i.DEBUG&&console.log("[Debug] "+r,...e)}function c(r,e,o){if(h(o),r[e]===void 0)throw new Error(o+" failed")}function w(r,e,o){let n="";for(e=t(r,e);!o.includes(r[e]);){if(c(r,e,"Waiting for "+JSON.stringify(o)),r[e]==="'")for(n+=r[e],e++;r[e]!=="'";)c(r,e,"Waiting for closing single quote"),n+=r[e],e++;else if(r[e]==='"')for(n+=r[e],e++;r[e]!=='"';)c(r,e,"Waiting for closing double quote"),n+=r[e],e++;else if(r[e]==="[")for(n+=r[e],e++;r[e]!=="]";)c(r,e,"Waiting for closing bracket"),n+=r[e],e++;n+=r[e],e++}return[n.trim(),e]}function y(r,e){let o="",n={selectors:[],declarations:[],type:"rule"};c(r,e,"Waiting for EOL"),e=t(r,e);let l=",";for(;c(r,e,"Waiting for comma"),[o,e]=w(r,e,["{",","]),n.selectors.push(o),e=t(r,e),l=r[e],l!=="{";)e++;for(e++;r[e]!=="}";){c(r,e,"Waiting for closing brace");let s={type:"declaration",property:"",value:""};e=t(r,e);let g=e;o="";let a=!1;for(;r[e]!==":";)if(c(r,e,"Waiting for colon "+(n.declarations.length>0?"after "+JSON.stringify(n.declarations[n.declarations.length-1],null,2):"after first declaration")),r[e]==="{"){let[u,f]=y(r,g);n.declarations.push(u),e=f,a=!0;break}else o+=r[e],e++;if(a){e=t(r,e);continue}e++,s.property=o.trim(),e=t(r,e),[o,e]=w(r,e,[";"]),e++,s.value=o.trim(),n.declarations.push(s),h("Found declaration",s),e=t(r,e)}return e++,h("Found rule",n),[n,e]}function E(r,e=0){let o=[];for(;e<r.length;){e=t(r,e);let[n,l]=y(r,e);o.push(n),e=t(r,l)}return o}function I(...r){return r.reduce((e,o)=>e.map(n=>o.map(l=>n.concat(l))).reduce((n,l)=>n.concat(l),[]),[[]])}function b(r){let e=[];for(let o=0;o<r.length;o++){let n=r[o],l={...n,declarations:[]};e.push(l);for(let s=0;s<n.declarations.length;s++){let g=n.declarations[s];g.type==="rule"?b([g]).forEach(function(f){n.selectors[0].startsWith("@")?l.declarations.push(f):e.push({...f,selectors:I(n.selectors,f.selectors).map(R=>R.join(" "))})}):l.declarations.push(g)}}return e}function m(r,e=""){let o=[];return r.forEach(function(l){if(l.declarations.length===0)return;let s=[e+l.selectors.join(`,
`)+" {"];l.declarations.forEach(function(a,u){if(a.type==="rule"){let f=m([a],e+"  ");s.push(f),u<=l.declarations.length-2&&s.push("")}else s.push(e+"  "+a.property+": "+a.value+";")}),s.push(e+"}"),o.push(s.join(`
`))}),o.join(`

`)}function S(r){let e=E(r),o=b(e);return m(o)}0&&(module.exports={SETTINGS,transform});

// console.dir(module.exports.transform);

let debounce;
const srcDir = './';
console.log('🤩 Watching your scss files...');
watch(srcDir,(eventType, filename) => { 
    clearTimeout(debounce);
    debounce = setTimeout(() => {
        if (!filename.endsWith('.scss')) { return; }
        if (eventType === 'change' || eventType === 'rename') {
            const files = readdirSync(srcDir);
            files.forEach((file) => {
                if (!file.endsWith('.scss')) { return; }
                const filePath = path.join(srcDir, file);
                const fileStat = lstatSync(filePath);
                console.log(`Found: ${filePath}`);
                if (fileStat.isFile()) {
                    console.log('transpiling...');
                    const nestedCss = readFileSync(filePath).toString();  
                    try {                                              
                        // const transpiledCss = cssplus.transform(nestedCss);
                        const transpiledCss = module.exports.transform(removeComments(nestedCss));
                        const cssFile = file.replace('.scss', '') + '.css';
                        console.log(fixPseudoSelectors(transpiledCss));
                        writeFileSync(cssFile, fixPseudoSelectors(transpiledCss));
                        console.log('Nested CSS transpiled ✨');
                    }
                    catch (err) {   
                        // throw err;                      
                        console.log('🫠 There is an error with your css!');
                        console.log(err.message);
                    }                   
                }
            });
        }
    }, 300);
});



function fixPseudoSelectors(css) {
    const oneColonRegExp = /(\[\-)/gm;
    const twoColonRegExp = /(\:\-)/gm;  
    const pseuRegExp = /(\s+)(\[)(.+)(\])/gm;
    const selfRegExp = /(\s+\[SELF\])/gm;
    return css
    .replace(selfRegExp, '')
    .replace(oneColonRegExp, '[:')
    .replace(twoColonRegExp, '::')
    .replace(pseuRegExp, "$3");
}

function removeComments(css) {
    // See: https://www.regextester.com/94246
    return css
    .replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '')
}

