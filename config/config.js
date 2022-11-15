function save_options() {
  let refreshTimeout = document.getElementById('timeout').value;
  let products = document.getElementById('products').value;
  let queue = document.getElementById('queue').value;
  let qnotify = document.getElementById('qnotify').checked;
  let qnotifyweb = document.getElementById('qnotifyweb').checked;
  let webhook = document.getElementById('webhook').value;
  let protocol = document.getElementById('protocol').value;
  let ftsurl = document.getElementById('ftsurl').value;
  let customurls = document.getElementById('customurls').value;
  chrome.storage.sync.set({
      savedTimeout: refreshTimeout,
      savedProducts: products,
      savedQueue: queue,
      savedQNotify: qnotify,
      savedQNotifyWeb: qnotifyweb,
      savedWebhook: webhook,
      savedProtocol: protocol,
      savedFTSURL: ftsurl,
      savedURLS: customurls
  }, function() {
      let status = document.getElementById('status');
      status.textContent = 'Options Saved';
      setTimeout(function() {
          status.textContent = '';
      }, 750);
  });
}

function reset_options() {
  chrome.storage.sync.remove(["savedTimeout", "savedProducts", "savedQueue", "savedQNotify", "savedQNotifyWeb", "savedWebhook", "savedProtocol", "savedFTSURL", "savedURLS"], function() {
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
      savedProducts: '{"ACUCOBOL-GT (Extend)":"extend-acucobol","Enterprise Developer / Server / Test Server":"enterprise-developer","Visual COBOL":"visual-cobol","COBOL Server":"cobol","Net Express / Server Express":"net-express","Enterprise Analyzer":"enterprise-analyzer","COBOL Analyzer":"cobol-analyzer","COBOL-IT":"cobol-it-ds","RM/COBOL":"rm-cobol","Relativity":"relativity","Data Express":"dataexpress"}',
      savedQueue: 'NOTIFY',
      savedQNotify: false,
      savedQNotifyWeb: false,
      savedWebhook: 'https://webhookURL',
      savedProtocol: 'sftp://',
      savedFTSURL: 'secureupload.microfocus.com:2222',
      savedURLS: '{"SFExt":"https://unixmit.github.io/UNiXSF"}'
  }, function(result) {
      document.getElementById('timeout').value = result.savedTimeout;
      document.getElementById('products').value = result.savedProducts;
      document.getElementById('queue').value = result.savedQueue;
      document.getElementById('qnotify').checked = result.savedQNotify;
      document.getElementById('qnotifyweb').checked = result.savedQNotifyWeb;
      document.getElementById('webhook').value = result.savedWebhook;
      document.getElementById('protocol').value = result.savedProtocol;
      document.getElementById('ftsurl').value = result.savedFTSURL;
      document.getElementById('customurls').value = result.savedURLS;
  });
}

function export_options() {
    chrome.storage.sync.get({
        savedTimeout: 60,
        savedProducts: '{"ACUCOBOL-GT (Extend)":"extend-acucobol","Enterprise Developer / Server / Test Server":"enterprise-developer","Visual COBOL":"visual-cobol","COBOL Server":"cobol","Net Express / Server Express":"net-express","Enterprise Analyzer":"enterprise-analyzer","COBOL Analyzer":"cobol-analyzer","COBOL-IT":"cobol-it-ds","RM/COBOL":"rm-cobol","Relativity":"relativity","Data Express":"dataexpress"}',
        savedQueue: 'NOTIFY',
        savedQNotify: false,
        savedQNotifyWeb: false,
        savedWebhook: 'https://webhookURL',
        savedProtocol: 'sftp://',
        savedFTSURL: 'secureupload.microfocus.com:2222',
        savedURLS: '{"SFExt":"https://unixmit.github.io/UNiXSF"}'
    }, function(result) {
        var items = JSON.stringify(result, null, 2);
        var url = 'data:application/json;base64,' + btoa(items);
        chrome.downloads.download({
            url: url,
            filename: './config/sfext.json'   
        }); 
        let status = document.getElementById('status');
        status.textContent = 'Exporting Options';
        setTimeout(function() {
            status.textContent = '';
        }, 750);   
    });
}

function import_options() {    
    const url = chrome.runtime.getURL('config/sfext.json');
    fetch(url)
        .then((response) => response.json())
        .then((json) => 
            chrome.storage.sync.set({
                savedTimeout: json.savedTimeout,
                savedProducts: json.savedProducts,
                savedQueue: json.savedQueue,
                savedQNotify: json.savedQNotify,
                savedQNotifyWeb: json.savedQNotifyWeb,
                savedWebhook: json.savedWebhook,
                savedProtocol: json.savedProtocol,
                savedFTSURL: json.savedFTSURL,
                savedURLS: json.savedURLS
            }, function() {
                let status = document.getElementById('status');
                status.textContent = 'Importing Options';
                setTimeout(function() {
                    status.textContent = '';
                    window.location.reload();
                }, 750);
            }) 
        );
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('reset').addEventListener('click', reset_options);
document.getElementById('export').addEventListener('click', export_options);
document.getElementById('import').addEventListener('click', import_options);