function save_options() {
  let refreshTimeout = document.getElementById('timeout').value;
  let products = document.getElementById('products').value;
  let pendingCust = document.getElementById('pendingCust').checked;
  let quixy = document.getElementById('quixy').value;
  let queue = document.getElementById('queue').value;
  let qnotify = document.getElementById('qnotify').checked;
  let qnotifyweb = document.getElementById('qnotifyweb').checked;
  let webhook = document.getElementById('webhook').value;
  let translation = document.getElementById('translation').value;
  let refEmail = document.getElementById('refemail').value;
  let protocol = document.getElementById('protocol').value;
  let ftsurl = document.getElementById('ftsurl').value;
  let customurls = document.getElementById('customurls').value;
  let caseStatus = document.getElementById('caseStatus').checked;
  chrome.storage.sync.set({
      savedTimeout: refreshTimeout,
      savedProducts: products,
      savedPenCust: pendingCust,
      savedQuixy: quixy,
      savedQueue: queue,
      savedQNotify: qnotify,
      savedQNotifyWeb: qnotifyweb,
      savedWebhook: webhook,
      savedTranslation: translation,
      savedRefEmail: refEmail,
      savedProtocol: protocol,
      savedFTSURL: ftsurl,
      savedURLS: customurls,
      savedStatus: caseStatus
  }, function() {
      let status = document.getElementById('status');
      status.textContent = 'Options Saved';
      setTimeout(function() {
          status.textContent = '';
      }, 750);
  });
}

function reset_options() {
  chrome.storage.sync.remove(["savedTimeout", "savedProducts", "savedPenCust", "savedQuixy", "savedQueue", "savedQNotify", "savedQNotifyWeb", "savedWebhook", "savedTranslation", "savedRefEmail", "savedProtocol", "savedFTSURL", "savedURLS", "savedStatus"], function() {
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
      savedPenCust: false,
      savedQuixy: '',
      savedQueue: 'NOTIFY',
      savedQNotify: false,
      savedQNotifyWeb: false,
      savedWebhook: '',
      savedTranslation: '',
      savedRefEmail: '',
      savedProtocol: 'sftp://',
      savedFTSURL: '',
      savedURLS: '{"SFExt":"https://unixmit.github.io/UNiXSF"}',
      savedStatus: false
  }, function(result) {
      document.getElementById('timeout').value = result.savedTimeout;
      document.getElementById('products').value = result.savedProducts;
      document.getElementById('pendingCust').checked = result.savedPenCust;
      document.getElementById('quixy').value = result.savedQuixy;
      document.getElementById('queue').value = result.savedQueue;
      document.getElementById('qnotify').checked = result.savedQNotify;
      document.getElementById('qnotifyweb').checked = result.savedQNotifyWeb;
      document.getElementById('webhook').value = result.savedWebhook;
      document.getElementById('translation').value = result.savedTranslation;
      document.getElementById('refemail').value = result.savedRefEmail;
      document.getElementById('protocol').value = result.savedProtocol;
      document.getElementById('ftsurl').value = result.savedFTSURL;
      document.getElementById('customurls').value = result.savedURLS;
      document.getElementById('caseStatus').checked = result.savedStatus;
  });
}

function export_options() {
    chrome.storage.sync.get({
        savedTimeout: 60,
        savedProducts: '{"ACUCOBOL-GT (Extend)":"extend-acucobol","Enterprise Developer / Server / Test Server":"enterprise-developer","Visual COBOL":"visual-cobol","COBOL Server":"cobol","Net Express / Server Express":"net-express","Enterprise Analyzer":"enterprise-analyzer","COBOL Analyzer":"cobol-analyzer","COBOL-IT":"cobol-it-ds","RM/COBOL":"rm-cobol","Relativity":"relativity","Data Express":"dataexpress"}',
        savedPenCust: false,
        savedQuixy: '',
        savedQueue: 'NOTIFY',
        savedQNotify: false,
        savedQNotifyWeb: false,
        savedWebhook: '',
        savedTranslation: '',
        savedRefEmail: '',
        savedProtocol: 'sftp://',
        savedFTSURL: '',
        savedURLS: '{"SFExt":"https://unixmit.github.io/UNiXSF"}',
        savedStatus: false
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
            savedProducts: json.savedProducts,
            savedPenCust: json.savedPenCust,
            savedQuixy: json.savedQuixy,
            savedQueue: json.savedQueue,
            savedQNotify: json.savedQNotify,
            savedQNotifyWeb: json.savedQNotifyWeb,
            savedWebhook: json.savedWebhook,
            savedTranslation: json.savedTranslation,
            savedRefEmail: json.savedRefEmail,
            savedProtocol: json.savedProtocol,
            savedFTSURL: json.savedFTSURL,
            savedURLS: json.savedURLS,
            savedStatus: json.savedStatus
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