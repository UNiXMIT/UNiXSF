const installedVersion = browser.runtime.getManifest().version;
let wh = 'https://opentextcorporation.webhook.office.com/webhookb2/';
let URI1 = 'ef649ecd-3a44-4c35-bb6d-0038f8e06e6f@10a18477-d533-4ecd-a78d-916dbd849d7c/IncomingWebhook/';
let URI2 = '784865adfbea4ce2853eaccfdd785453/f16de0dc-a49a-4507-b213-aba6ee6fba48';
let params;
let configURL = browser.runtime.getURL('config/config.html');
let globalUUID;
let pattern = "*://*.force.com/*";

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

function getUUID() {
  browser.storage.sync.get({
    savedUUID: ''
  }, function(result) {
    globalUUID = result.savedUUID;
    dailyUsers();
  });
}

function dailyUsers() {
    if (!globalUUID) {
        globalUUID = crypto.randomUUID();
        browser.storage.sync.set({
          savedUUID: globalUUID
        });
    }
    let webhook = wh + URI1 + URI2;
    const browserType = getBrowserType();
    params = {
        title: "SFExt User Activity",
        text: browserType + ' - ' + globalUUID + ' - ' + installedVersion
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
            title: "SFExt Queue Monitor",
            text: request.content
        };
    } else if (request.action === "newActivity") {
        params = {
            title: "SFExt New Activity",
            text: request.content
        };
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    };
    fetch(request.url, requestOptions);
}

function getBrowserType() {
  if (navigator.userAgent.includes('Edg')) {
    return 'Edge';
  } else if (navigator.userAgent.includes('Chrome')) {
    return 'Chrome';
  } else if (navigator.userAgent.includes('Firefox')) {
    return 'Firefox';
  } else {
    return 'Unknown Browser';
  }
}

async function redirect(newTab) {
    console.log("redirect(newTab): " + newTab.url);

    // Check for download URLs that contain ".force.com"
    // and "/download/", because these end up in an HTTP
    // redirect, and would thus lead to navigating away
    // from the SF console, which is not what we want,
    // instead we want the normal behavior, where the
    // downloaded item is handled in a new/separate
    // browser tab:
    if (newTab.url.includes(".force.com/") && newTab.url.includes("/download/")) {
        console.log("redirect(newTab): Ignoring, because download link on .force.com (*.force.com/*/download/*)");
        return;
    }

    let currentSfTab = await sfTab();
    //console.log(currentSfTab);
    //console.log("Redirecting: " + newTab.tabId + "  :  " + newTab.url);


    if (newTab.tabId !== currentSfTab.id) {
        if (newTab.url == currentSfTab.url) { return closeTab(newTab.tabId); }
        loadURL(currentSfTab.id, newTab.url);
        closeTab(newTab.tabId);
    }
}

browser.webNavigation.onBeforeNavigate.addListener(
    redirect, { url: [{ hostContains: ".force.com" }] }
);

async function sfTab() {
    console.log("sfTab()");

    let tabs = await getTabs();

    for (let tab of tabs) {
        if (tab.url.includes(".force.com/")) {
            return tab
        }
    }
}

async function getTabs() {
    console.log("getTabs()");

    return new Promise(resolve => {
        browser.tabs.query({ url: "*://*.force.com/*" }).then(resolve);
    });
}

async function loadURL(tab, address) {
    console.log("loadURL(tab, address): " + tab.url);

    return new Promise(resolve => {
        browser.tabs.update(tab, { url: address, active: true }).then(resolve);
    });
}

async function closeTab(tab) {
    console.log("closeTab(tab): " + tab.url);

    return new Promise(resolve => {
        browser.tabs.remove(tab).then(resolve);
    });
}

getUUID();
reloadSFTab();
browser.action.onClicked.addListener(handleClick);
browser.runtime.onMessage.addListener(handleMessage);