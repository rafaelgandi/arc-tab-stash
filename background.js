

console.log(111122);

(async () => {

    console.log(chrome.runtime.id);
    console.log(await chrome.runtime.getPlatformInfo());

    const tabs = await chrome.tabs.query({});
    console.dir(tabs.map((t) => t.title));
})();
