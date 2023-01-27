/* This runs after a web page loads */


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message, 'hohoho');
});


chrome.runtime.sendMessage({message: "get-user-tab-stash-from-notion"}, (response) => {
    console.log(response);
});

