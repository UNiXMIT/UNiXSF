const installedVersion = chrome.runtime.getManifest().version;
let wh = 'https://webhook.lewisakura.moe/api/webhooks/';
let URI1 = '1397855623919440003/';
let URIF = '8gZwN31NeN1CQdCD5uTm/';
let URI2 = 'lniBhrn8E0TV-lTkSDeFl5P6IHtS0syw_erXUsA6xz8flgSDtZ0Q0OwS1Kej8ylNM7AS';
let params;
let globalUUID;
let pattern = "*://*.force.com/*";
let globalGrab;
const handledUrls = new Set();

function reloadSFTab() {
    chrome.runtime.onInstalled.addListener(function(){
        chrome.tabs.query({url: "*://*.lightning.force.com/*"}, function(results) {
            for (const tab of results) {
                chrome.tabs.reload(tab.id);
            }
        });
    });
}

function tabUpdates() {
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (changeInfo.url && 
            changeInfo.url.includes('my.salesforce.com/servlet/servlet.su?') &&
            !handledUrls.has(changeInfo.url)) {
                handledUrls.add(changeInfo.url);
                chrome.tabs.create({ url: changeInfo.url }).then(() => {
                    return chrome.tabs.goBack(tabId);
                }).then(() => {
                    setTimeout(() => handledUrls.delete(changeInfo.url), 2000);
                }).catch(error => {
                    console.error("Error:", error);
                    handledUrls.delete(changeInfo.url);
                });
            }
    });
}

function dailyUsers() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const todaysDate = `${day}${month}${year}`;
    chrome.storage.sync.get(['savedDate'], (result) => {
        const savedDate = result.savedDate;
        if (savedDate) {
            if (todaysDate !== savedDate) {
                chrome.storage.sync.set({
                    savedDate: todaysDate
                });
                getUUID();
            }
        } else {
            chrome.storage.sync.set({
                savedDate: todaysDate
            });
            getUUID();
        }
    });
}

function getUUID() {
    chrome.storage.sync.get({
      savedUUID: ''
    }, function(result) {
      globalUUID = result.savedUUID;
      submitUser();
    });
}
  
function submitUser() {
    if (!globalUUID) {
      globalUUID = crypto.randomUUID();
        chrome.storage.sync.set({
        savedUUID: globalUUID
    });
    }
    let webhook = wh + URI1;
    const browserType = getBrowserType();
    params = {
      username: "SFExt User Activity",
      avatar_url: "https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/SFExt/icons/rocket128.png",
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
    const teamsWebhook = "https://*.webhook.office.com/webhookb2/";
    const slackWebhook = "https://hooks.slack.com/services/";
    const discordWebhook = "https://discord.com/api/webhooks/";
    const discordProxyWebhook = "https://webhook.lewisakura.moe/";
    if (request.action === "keepAlive") {
        return;
    }
    if (request.action === "updateCheck") {
      fetch('https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/updates/Chromium/latestVersion.json')
          .then(response => response.json()) 
          .then(data => sendResponse({ latestVer: data.latestVersion }) );
          return true;
    }
    if (request.url.includes(teamsWebhook)) {
        if (request.action === "newCase") {
            params = {
                title: "SFExt Queue Monitor",
                text: request.content
            };
        } 
    } else if (request.url.includes(slackWebhook)) {
        if (request.action === "newCase") {
            params = {
                text: "*SFExt Queue Monitor*\n" + request.content
            };
        } 
    } else if (request.url.includes(discordWebhook) || request.url.includes(discordProxyWebhook)) {
        if (request.action === "newCase") {
            params = {
                username: "SFExt Queue Monitor",
                avatar_url: "https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/SFExt/icons/rocket128.png",
                content: request.content
            };
        } 
    } else {
        console.log("SFExt: Unsupported Webhook!");
        return;
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    };
    fetch(request.url, requestOptions);
}

function getBrowserType() { 
    if (navigator.userAgent.includes('Edge')) {
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
  if (newTab.url.includes(".force.com/") && (newTab.url.includes("/download/") || newTab.url.includes("https://portal") || newTab.url.includes("/p") || newTab.url.includes(".force.com/servlet") || newTab.url.includes("/visualforce/") || newTab.url.includes("downloadRLinkAttachment") )) {
    return;
  }
  getGrab();
  if (globalGrab) {
    let currentSfTab = await sfTab();
    if (newTab.tabId !== currentSfTab.id) {
        if (newTab.url == currentSfTab.url) { return closeTab(newTab.tabId); }
        loadURL(currentSfTab.id, newTab.url);
        closeTab(newTab.tabId);
    } 
  } else {
      return;
  }
}

function getGrab() {
  chrome.storage.sync.get({
    savedGrab: true
  }, function(result) {
    globalGrab = result.savedGrab;
  });
}

chrome.webNavigation.onBeforeNavigate.addListener(
  redirect, { url: [{ hostContains: ".force.com" }] }
);

async function sfTab() {
  let tabs = await getTabs();
  for (let tab of tabs) {
      if (tab.url.includes(".force.com/")) {
          return tab
      }
  }
}

async function getTabs() {
  return new Promise(resolve => {
      chrome.tabs.query({ url: "*://*.force.com/*" }).then(resolve);
  });
}

function loadURL(tab, address) {
  chrome.scripting.executeScript({
    target: { tabId: tab },
    func: injectURL,
    args: [address],
    world: "MAIN"
  });
  chrome.tabs.update(tab, { active: true });
}

function injectURL(address) {
  const t = $A.getEvt("markup://force:navigateToURL");
  t.setParam("url", address);
  t.fire();
}

async function closeTab(tab) {
  return new Promise(resolve => {
      chrome.tabs.remove(tab).then(resolve);
  });
}

dailyUsers();
reloadSFTab();
tabUpdates();
chrome.runtime.onMessage.addListener(handleMessage);