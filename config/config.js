function save_options() {
  let refreshTimeout = document.getElementById('timeout').value;
  let products = document.getElementById('products').value;
  let queue = document.getElementById('queue').value;
  let qnotify = document.getElementById('qnotify').checked;
  let qnotifyweb = document.getElementById('qnotifyweb').checked;
  let webhook = document.getElementById('webhook').value;
  let protocol = document.getElementById('protocol').value;
  let ftsurl = document.getElementById('ftsurl').value;
  chrome.storage.sync.set({
      savedTimeout: refreshTimeout,
      savedProducts: products,
      savedQueue: queue,
      savedQNotify: qnotify,
      savedQNotifyWeb: qnotifyweb,
      savedWebhook: webhook,
      savedProtocol: protocol,
      savedFTSURL: ftsurl
  }, function() {
      let status = document.getElementById('status');
      status.textContent = 'Options Saved';
      setTimeout(function() {
          status.textContent = '';
      }, 750);
  });
}

function reset_options() {
  chrome.storage.sync.remove(["savedTimeout", "savedProducts", "savedQueue", "savedQNotify", "savedQNotifyWeb", "savedWebhook", "savedProtocol", "savedFTSURL"], function() {
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
      savedProducts: '{"ACUCOBOL-GT (Extend)":"extend-acucobol","Enterprise Developer / Server / Test Server":"enterprise-developer","Visual COBOL":"visual-cobol","Net Express / Server Express":"net-express","Enterprise Analyzer":"enterprise-analyzer","COBOL Analyzer":"cobol-analyzer","COBOL-IT":"cobol-it-ds","RM/COBOL":"rm-cobol","Relativity":"relativity","Data Express":"dataexpress"}',
      savedQueue: 'NOTIFY',
      savedQNotify: false,
      savedQNotifyWeb: false,
      savedWebhook: 'https://webhookURL',
      savedProtocol: 'sftp://',
      savedFTSURL: 'secureupload.microfocus.com:2222'
  }, function(result) {
      document.getElementById('timeout').value = result.savedTimeout;
      document.getElementById('products').value = result.savedProducts;
      document.getElementById('queue').value = result.savedQueue;
      document.getElementById('qnotify').checked = result.savedQNotify;
      document.getElementById('qnotifyweb').checked = result.savedQNotifyWeb;
      document.getElementById('webhook').value = result.savedWebhook;
      document.getElementById('protocol').value = result.savedProtocol;
      document.getElementById('ftsurl').value = result.savedFTSURL;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('reset').addEventListener('click', reset_options);