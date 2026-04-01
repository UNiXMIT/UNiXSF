let globalDefect;

browser.storage.sync.get("savedDefect").then((result) => {
  globalDefect = result.savedDefect || null;
  updateJiraMenu();
});

browser.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes.savedDefect) {
    globalDefect = changes.savedDefect.newValue;
    updateJiraMenu();
  }
});

function createMenus() {
  browser.contextMenus.removeAll();
  browser.contextMenus.create({
    id: "SFExt",
    title: "SFExtension",
    contexts: ["selection"],
  });
  browser.contextMenus.create({
    id: "SFExtSearch",
    parentId: "SFExt",
    title: "Search Salesforce",
    contexts: ["selection"],
  });
  browser.contextMenus.create({
    id: "SFExtJira",
    parentId: "SFExt",
    title: "Search Jira",
    contexts: ["selection"],
    enabled: !!globalDefect
  });
  browser.contextMenus.create({
    id: "SFExtDocs",
    parentId: "SFExt",
    title: "Search Documentation",
    contexts: ["selection"],
  });
  browser.contextMenus.create({
    id: "SFExtCommunity",
    parentId: "SFExt",
    title: "Search Community",
    contexts: ["selection"],
  });
  browser.contextMenus.create({
    id: "ALLDocs",
    parentId: "SFExtDocs",
    title: "All Documentation",
    contexts: ["selection"],
  });
  browser.contextMenus.create({
    id: "EDDocs",
    parentId: "SFExtDocs",
    title: "Enterprise Developer",
    contexts: ["selection"],
  });
  browser.contextMenus.create({
    id: "EADocs",
    parentId: "SFExtDocs",
    title: "Enterprise Analyzer",
    contexts: ["selection"],
  });
  browser.contextMenus.create({
    id: "VCDocs",
    parentId: "SFExtDocs",
    title: "Visual COBOL",
    contexts: ["selection"],
  });
  browser.contextMenus.create({
    id: "ACUDocs",
    parentId: "SFExtDocs",
    title: "AcuCOBOL",
    contexts: ["selection"],
  });
  browser.contextMenus.create({
    id: "ALLCommunity",
    parentId: "SFExtCommunity",
    title: "All Community",
    contexts: ["selection"],
  });
  browser.contextMenus.create({
    id: "ECommunity",
    parentId: "SFExtCommunity",
    title: "Enterprise",
    contexts: ["selection"],
  });
  browser.contextMenus.create({
    id: "ESSCommunity",
    parentId: "SFExtCommunity",
    title: "Enterprise Suite Spot",
    contexts: ["selection"],
  });
  browser.contextMenus.create({
    id: "VCCommunity",
    parentId: "SFExtCommunity",
    title: "Visual COBOL",
    contexts: ["selection"],
  });
  browser.contextMenus.create({
    id: "ACUCommunity",
    parentId: "SFExtCommunity",
    title: "AcuCOBOL",
    contexts: ["selection"],
  });
}

function updateJiraMenu() {
  browser.contextMenus.update("SFExtJira", {
    enabled: !!globalDefect,
  }, () => {
    void chrome.runtime.lastError;
  });
}

function SFSearch(query, tab) {
  const url = new URL(tab.url);
  const sfBaseUrl = `${url.protocol}//${url.hostname}`;

  const payload = {
    componentDef: "forceSearch:searchPageDesktop",
    attributes: {
      term: query,
      scopeMap: { type: "TOP_RESULTS" },
      context: {
        FILTERS: {},
        searchSource: "ASSISTANT_DIALOG",
        disableIntentQuery: false,
        disableSpellCorrection: false,
      },
      groupId: "DEFAULT",
    },
    state: {},
  };

  const encoded = btoa(JSON.stringify(payload));
  const searchUrl = `${sfBaseUrl}/one/one.app#${encoded}`;
  browser.tabs.create({ url: searchUrl });
}

browser.runtime.onStartup.addListener(createMenus);
browser.runtime.onInstalled.addListener(createMenus);

browser.contextMenus.onClicked.addListener((info, tab) => {
  const encodedText = encodeURIComponent(info.selectionText);
  let url;
  switch (info.menuItemId) {
    case "SFExtSearch":
      SFSearch(info.selectionText, tab);
      break
    case "ALLDocs":
      url = `https://docs.rocketsoftware.com/search?q=${encodedText}`;
      break;
    case "EDDocs":
      url = `https://docs.rocketsoftware.com/search?labelkey=prod_enterprise_developer&q=${encodedText}`;
      break;
    case "EADocs":
      url = `https://docs.rocketsoftware.com/search?labelkey=prod_enterprise_analyzer&q=${encodedText}`;
      break;
    case "VCDocs":
      url = `https://docs.rocketsoftware.com/search?labelkey=prod_visual_cobol&q=${encodedText}`;
      break;
    case "ACUDocs":
      url = `https://docs.rocketsoftware.com/search?labelkey=prod_acucobol_gt&q=${encodedText}`;
      break;
    case "ALLCommunity":
      url = `https://community.rocketsoftware.com/search?q=${encodedText}`;
      break;
    case "ECommunity":
      url = `https://community.rocketsoftware.com/search?category=Product+Forums+%3E+Rocket%C2%AE+Enterprise+Suite&q=${encodedText}`;
      break;
    case "ESSCommunity":
      url = `https://community.rocketsoftware.com/search?category=Other+Forums+%3E+Enterprise+Suite+Spot&q=${encodedText}`;
      break;
    case "VCCommunity":
      url = `https://community.rocketsoftware.com/search?category=Product+Forums+%3E+Rocket%C2%AE+COBOL+%3E+Rocket%C2%AE+Visual+COBOL%C2%AE&q=${encodedText}`;
      break;
    case "ACUCommunity":
      url = `https://community.rocketsoftware.com/search?category=Product+Forums+%3E+Rocket%C2%AE+COBOL+%3E+Rocket%C2%AE+ACUCOBOL%C2%AE&q=${encodedText}`;
      break;
    case "SFExtJira":
      url = `${globalDefect}/secure/QuickSearch.jspa?searchString=${encodedText}`;
      break;
  }
  if (url) {
    browser.tabs.create({
      url: url,
    });
  }
});