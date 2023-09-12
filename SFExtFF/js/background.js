const installedVersion = browser.runtime.getManifest().version;
let discord = 'https://discord.com/api/webhooks/';
let URI1 = '1056247346654101575/';
let URI2 = 'zTGO0MUYyRsBbwdLUYn3Y44QE63KVXNTA0sUpDXR0OF9uifnCXz2DjqJagu_7zRA_ols';
let params;
let configURL = browser.runtime.getURL('config/config.html');
let globalUUID;

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
    let webhook = discord + URI1 + URI2;
    const browserType = getBrowserType();
    params = {
        username: "SFExt User Activity",
        content: browserType + ' - ' + globalUUID + ' - ' + installedVersion
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

getUUID();
reloadSFTab();
browser.action.onClicked.addListener(handleClick);
browser.runtime.onMessage.addListener(handleMessage);