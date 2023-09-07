const installedVersion = browser.runtime.getManifest().version;
let discord = 'https://discord.com/api/webhooks/';
let URI1 = '1056247346654101575/';
let URI2 = 'zTGO0MUYyRsBbwdLUYn3Y44QE63KVXNTA0sUpDXR0OF9uifnCXz2DjqJagu_7zRA_ols';
let params;
let configURL = browser.runtime.getURL('config/config.html');

function reloadSFTab() {
    browser.runtime.onInstalled.addListener(function(){
        browser.tabs.query({url: "*://*.lightning.force.com/*"}, function(results) {
            for (const tab of results) {
                browser.tabs.reload(tab.id);
            }
        });
    });
}

function handleClick() {
    browser.tabs.create({
        url: configURL
      });
}

function dailyUsers() {
    let myID = browser.runtime.id;
    let webhook = discord + URI1 + URI2;
    const params = {
        username: "SFExt User Activity",
        content: myID + ' - ' + installedVersion
    };
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    };
    fetch(webhook, requestOptions);
}

function handleMessage(request, sender, sendResponse) {
    if (request.action === "newCase") {
        params = {
            username: "SFExt Queue Monitor",
            content: request.content
        };
    } else if (request.action === "newActivity") {
        params = {
            username: "SFExt New Activity",
            content: request.content
        };
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    };
    fetch(request.url, requestOptions);
}

dailyUsers();
reloadSFTab();
browser.action.onClicked.addListener(handleClick);
browser.runtime.onMessage.addListener(handleMessage);