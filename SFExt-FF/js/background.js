function reloadSFTab() {
    browser.runtime.onInstalled.addListener(function(){
        browser.tabs.query({url: "*://*.lightning.force.com/*"}, function(results) {
            for (const tab of results) {
                browser.tabs.reload(tab.id);
            }
        });
    });
}
reloadSFTab();