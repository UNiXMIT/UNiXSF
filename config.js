function save_options() {
    var refreshTimeout = document.getElementById('timeout').value;
    var products = document.getElementById('products').value;
    chrome.storage.sync.set({
      savedTimeout: refreshTimeout,
      savedProducts: products
    }, function() {
      var status = document.getElementById('status');
      status.textContent = 'Options Saved';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }

  function reset_options() {
    chrome.storage.sync.remove(["savedTimeout","savedProducts"],function(){
      var error = chrome.runtime.lastError;
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
    }, function(result) {
      document.getElementById('timeout').value = result.savedTimeout;
      document.getElementById('products').value = result.savedProducts;
    });
  }
  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click', save_options);
  document.getElementById('reset').addEventListener('click', reset_options);