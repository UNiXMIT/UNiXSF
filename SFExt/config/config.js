const installedVersion = chrome.runtime.getManifest().version;
const configURL = chrome.runtime.getURL('config.html');

function save_options() {
  let refreshTimeout = document.getElementById('timeout').value;
  let defect = document.getElementById('defect').value;
  let pp = document.getElementById('pp').value;
  let edu = document.getElementById('edu').value;
  let queue = document.getElementById('queue').value;
  let qnotify = document.getElementById('qnotify').checked;
  let qnotifyweb = document.getElementById('qnotifyweb').checked;
  let webhook = document.getElementById('webhook').value;
  let refEmail = document.getElementById('refemail').value;
  let customurls = document.getElementById('customurls').value;
  let grabLink = document.getElementById('grabLink').checked;
  let wideCase = document.getElementById('wideCase').checked;
  chrome.storage.sync.set({
      savedTimeout: refreshTimeout,
      savedDefect: defect,
      savedPP: pp,
      savedEDU: edu,
      savedQueue: queue,
      savedQNotify: qnotify,
      savedQNotifyWeb: qnotifyweb,
      savedWebhook: webhook,
      savedRefEmail: refEmail,
      savedURLS: customurls,
      savedGrab: grabLink,
      savedWide: wideCase
  }, function() {
      let status = document.getElementById('status');
      status.textContent = 'Options Saved';
      setTimeout(function() {
          status.textContent = '';
      }, 750);
  });
}

function reset_options() {
  chrome.storage.sync.remove(["savedTimeout", "savedDefect", "savedPP", "savedEDU", "savedQueue", "savedQNotify", "savedQNotifyWeb", "savedWebhook", "savedRefEmail", "savedURLS", "savedGrab", "savedWide"], function() {
      let error = chrome.runtime.lastError;
      if (error) {
          console.error(error);
      }
  });
  window.location.reload();
}

function restore_options() {
  chrome.storage.sync.get({
      savedTimeout: 60,
      savedDefect: '',
      savedPP: '',
      savedEDU: '',
      savedQueue: 'NOTIFY',
      savedQNotify: false,
      savedQNotifyWeb: false,
      savedWebhook: '',
      savedRefEmail: '',
      savedURLS: `{"SFExt":"${configURL}"}`,
      savedUUID: '',
      savedGrab: false,
      savedWide: false
  }, function(result) {
      document.getElementById('timeout').value = result.savedTimeout;
      document.getElementById('defect').value = result.savedDefect;
      document.getElementById('pp').value = result.savedPP;
      document.getElementById('edu').value = result.savedEDU;
      document.getElementById('queue').value = result.savedQueue;
      document.getElementById('qnotify').checked = result.savedQNotify;
      document.getElementById('qnotifyweb').checked = result.savedQNotifyWeb;
      document.getElementById('webhook').value = result.savedWebhook;
      document.getElementById('refemail').value = result.savedRefEmail;
      document.getElementById('customurls').value = result.savedURLS;
      document.getElementById('grabLink').checked = result.savedGrab;
      document.getElementById('wideCase').checked = result.savedWide;
      if (!result.savedUUID) {
        let globalUUID = crypto.randomUUID();
        chrome.storage.sync.set({
        savedUUID: globalUUID
        });
      }
      document.getElementById('uuid').textContent = result.savedUUID;
  });
}

function export_options() {
    chrome.storage.sync.get({
        savedTimeout: 60,
        savedDefect: '',
        savedPP: '',
        savedEDU: '',
        savedQueue: 'NOTIFY',
        savedQNotify: false,
        savedQNotifyWeb: false,
        savedWebhook: '',
        savedRefEmail: '',
        savedURLS: `{"SFExt":"${configURL}"}`,
        savedUUID: '',
        savedGrab: false,
        savedWide: false
    }, function(result) {
        chrome.downloads.onChanged.addListener(function(downloadDelta) {
            if (downloadDelta.state && downloadDelta.state.current === "complete") {
                let status = document.getElementById('status');
                status.textContent = 'Options Exported';
                setTimeout(function() {
                    status.textContent = '';
                }, 750);
            } else {
                if (downloadDelta.state && downloadDelta.state.current === "interrupted") {
                    let status = document.getElementById('status');
                    status.textContent = 'Export Failed!';
                    setTimeout(function() {
                        status.textContent = '';
                    }, 750);
                }
            }
        });
        let items = JSON.stringify(result, null, 2);
        let url = 'data:application/json;base64,' + btoa(items);
        chrome.downloads.download({
            url: url,
            filename: 'sfext.json',
            saveAs: true 
        }); 
    });
}

function import_options() {    
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", (event) => {
        const contents = event.target.result;
        const json = JSON.parse(contents);
        chrome.storage.sync.set({
            savedTimeout: json.savedTimeout,
            savedDefect: json.savedDefect,
            savedPP: json.savedPP,
            savedEDU: json.savedEDU,
            savedQueue: json.savedQueue,
            savedQNotify: json.savedQNotify,
            savedQNotifyWeb: json.savedQNotifyWeb,
            savedWebhook: json.savedWebhook,
            savedRefEmail: json.savedRefEmail,
            savedURLS: json.savedURLS,
            savedUUID: json.savedUUID,
            savedGrab: json.savedGrab,
            savedWide: json.wideCase
        }, function() {
            try {
                let status = document.getElementById('status');
                status.textContent = 'Options Imported';
                setTimeout(function() {
                    status.textContent = '';
                    window.location.reload();
                }, 750);
            } catch (error) {
                let status = document.getElementById('status');
                status.textContent = 'Import Failed!';
                setTimeout(function() {
                    status.textContent = '';
                    window.location.reload();
                }, 750);
            }
        }) 
      });
      reader.readAsText(file);
    });
    fileInput.click();
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('reset').addEventListener('click', reset_options);
document.getElementById('export').addEventListener('click', export_options);
document.getElementById('import').addEventListener('click', import_options);
document.getElementById('version').textContent = installedVersion;