function reloadSFTab() {
    chrome.runtime.onInstalled.addListener(function(){
        chrome.tabs.query({url: "*://*.lightning.force.com/*"}, function(results) {
            for (const tab of results) {
                chrome.tabs.reload(tab.id);
            }
        });
    });
}
reloadSFTab();