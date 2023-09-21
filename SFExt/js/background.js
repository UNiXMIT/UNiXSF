const installedVersion = chrome.runtime.getManifest().version;
let discord = 'https://discord.com/api/webhooks/';
let URI1 = '1056247346654101575/';
let URI2 = 'zTGO0MUYyRsBbwdLUYn3Y44QE63KVXNTA0sUpDXR0OF9uifnCXz2DjqJagu_7zRA_ols';
let params;
let globalUUID;
let pattern = "*://*.force.com/*";

function reloadSFTab() {
    chrome.runtime.onInstalled.addListener(function(){
        chrome.tabs.query({url: "*://*.lightning.force.com/*"}, function(results) {
            for (const tab of results) {
                chrome.tabs.reload(tab.id);
            }
        });
    });
}

function getUUID() {
    chrome.storage.sync.get({
      savedUUID: ''
    }, function(result) {
      globalUUID = result.savedUUID;
      dailyUsers();
    });
  }
  
function dailyUsers() {
    if (!globalUUID) {
      globalUUID = crypto.randomUUID();
        chrome.storage.sync.set({
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
    if (request.action === "updateCheck") {
      fetch('https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/updates/Chromium/latestVersion.json')
          .then(response => response.json()) 
          .then(data => sendResponse({ latestVer: data.latestVersion }) );
          return true;
    } else {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        };
        fetch(request.url, requestOptions);
    }
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

chrome.webNavigation.onBeforeNavigate.addListener(
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
      chrome.tabs.query({ url: "*://*.force.com/*" }).then(resolve);
  });
}

async function loadURL(tab, address) {
  console.log("loadURL(tab, address): " + tab.url);

  return new Promise(resolve => {
      chrome.tabs.update(tab, { url: address, active: true }).then(resolve);
  });
}

async function closeTab(tab) {
  console.log("closeTab(tab): " + tab.url);

  return new Promise(resolve => {
      chrome.tabs.remove(tab).then(resolve);
  });
}

getUUID();
reloadSFTab();
chrome.runtime.onMessage.addListener(handleMessage);