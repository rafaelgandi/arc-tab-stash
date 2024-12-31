// See: https://simplecrypto.js.org/docs/
import './encrypt.min.js';
import { isValidJson, encrypt, decrypt, storageGet, storageSet, logThis, sendErrorToast, handleError } from './helpers.js';


export const STASH_GIST_FILENAME = 'dev-stash.json';

function gitHubHeaders(token) {
    return {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": '2022-11-28'
    };
}

export async function getGitCredsSaved() {
    const gitToken = await storageGet('gitToken');
    const gistLink = await storageGet('gistLink');
    if (!gitToken.trim()) { return undefined; }
    if (!gistLink?.id) { return undefined; }
    return {
        token: gitToken,
        gist: gistLink
    }
}


// See: https://dev.to/rikurouvila/how-to-use-a-github-gist-as-a-free-database-20np
export async function getGistContents() {
    const gitCreds = await getGitCredsSaved();
    try {
        const req = await fetch(`https://api.github.com/gists/${gitCreds.gist.id}`, {
            method: "GET",
            headers: gitHubHeaders(gitCreds.token)
        });
        const gist = await req.json();
        let content = gist.files[STASH_GIST_FILENAME].content;
        if (content.trim() === '0') {
            content = {
                gistLastUpdated: 0,
                stash: []
            };
        }
        else {
            // LM: 2023-03-14 09:15:22 [Teach stash to read json format from gist.]
            if (!isValidJson(content.trim())) {
                content = await decrypt(content.trim());
                if (!content?.gistLastUpdated) {
                    throw new Error('Invalid JSON from gist.');
                }
            }
            else {
                const stashJsonData = JSON.parse(content.trim());
                if (!stashJsonData?.data) {
                    throw new Error('Invalid  stash JSON data from gist.');
                }
                content = await decrypt(stashJsonData.data.trim());
                if (!content?.gistLastUpdated) {
                    throw new Error('Invalid  JSON from gist.');
                }
            }
        }
        // logThis(['Contents from gist', content]);
        return content;
    }
    catch (err) {
        // logThis(['foo', err.message]);
        const errMsg = err.message.toLowerCase();
        // LM: 2023-02-23 06:55:36 [ If Encrypted data is malformed we replace it with the one on the local stash] //
        if (errMsg.indexOf('invalid') !== -1 && errMsg.indexOf('encrypted') !== -1) {
            const STASH = await storageGet('stash');
            await setGistContents(STASH);
            return await getGistContents();
        }
        handleError(err.message, 'Red alert captain! Unable to get your stash data. Please check your Github Access Token.');
        return undefined;
    }
}

// See: https://dev.to/rikurouvila/how-to-use-a-github-gist-as-a-free-database-20np
export async function setGistContents(data) {
    const gitCreds = await getGitCredsSaved();
    if (!gitCreds) { return; }
    try {
        const payload = {
            gistLastUpdated: (new Date()).getTime().toString(),
            stash: data
        }
        const dataToSend = await encrypt(JSON.stringify(payload));
        const req = await fetch(`https://api.github.com/gists/${gitCreds.gist.id}`, {
            method: "PATCH",
            headers: gitHubHeaders(gitCreds.token),
            body: JSON.stringify({
                files: {
                    [STASH_GIST_FILENAME]: {
                        // LM: 2023-03-14 09:36:12 [Added a json object wrapper.]
                        content: JSON.stringify({
                            name: 'Stash',
                            version: '0.0.0.6',
                            modified: (new Date()).toString(),
                            data: dataToSend
                        }),
                    },
                },
            })
        });
        await storageSet('stash', data);
        logThis(['[Stash] 🫡 Gist stash has been updated.']);
        return await req.json();
    }
    catch (err) {
        handleError(err.message);
        return;
    }
}

export async function makeStashGistWithToken(gitToken) {
    const stashGist = await getStashGist(gitToken);
    let gistId = null;
    try {
        if (stashGist) { // If the stash gist file is already in the users server then use it.
            if (!stashGist?.id) {
                throw new Error(`Unable to make ${STASH_GIST_FILENAME} gist.`);
            }
            gistId = stashGist.id;
        }
        else {
            // Make the stash gist from scratch.
            // See: https://docs.github.com/en/rest/gists/gists?apiVersion=2022-11-28#create-a-gist
            const req = await fetch(`https://api.github.com/gists`, {
                method: "POST",
                headers: gitHubHeaders(gitToken),
                body: JSON.stringify({
                    "description": "Your Stash data is saved.",
                    "public": false,
                    "files": {
                        [STASH_GIST_FILENAME]: {
                            "content": '0'
                        }
                    }
                })
            });
            const res = await req.json();
            if (!res?.id) {
                throw new Error(`Unable to make ${STASH_GIST_FILENAME} gist.`);
            }
            gistId = res.id;
        }
        // Save the gist details in storage.
        await storageSet('gistLink', {
            link: 'As of 2023-07-26 this property is not being used',
            id: gistId
        });
        return gistId;
    }
    catch (err) {
        sendErrorToast('Something went wrong. Please check your Github access token.');
        handleError(err.message)
        return;
    }
}

export async function getListOfGist(gitToken) {
    // See: https://docs.github.com/en/rest/gists/gists?apiVersion=2022-11-28#list-gists-for-the-authenticated-user
    try {
        const req = await fetch(`https://api.github.com/gists?per_page=100`, {
            method: "GET",
            headers: gitHubHeaders(gitToken)
        });
        const res = await req.json();
        // logThis(['List of gists', res]);
        return res;
    }
    catch (err) {
        // sendErrorToast('Something went wrong. Please check your Github access token.');
        handleError(err.message);
        return [];
    }
}

export async function getStashGist(gitToken) {
    const gists = await getListOfGist(gitToken);
    if (!gists.length) { return undefined; }
    for (let i = 0; i < gists.length; i++) {
        if (Object.keys(gists[i].files).includes(STASH_GIST_FILENAME)) {
            return gists[i];
        }
    }
    return;
}