let globalDefect;

chrome.storage.sync.get("savedDefect").then((result) => {
  globalDefect = result.savedDefect || null;
  updateJiraMenu();
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes.savedDefect) {
    globalDefect = changes.savedDefect.newValue;
    updateJiraMenu();
  }
});

function createMenus() {
  chrome.contextMenus.removeAll();
  chrome.contextMenus.create({
    id: "SFExt",
    title: "SFExtension",
    contexts: ["selection"],
  });
  chrome.contextMenus.create({
    id: "SFExtSearch",
    parentId: "SFExt",
    title: "Search Salesforce",
    contexts: ["selection"],
  });
  chrome.contextMenus.create({
    id: "SFExtJira",
    parentId: "SFExt",
    title: "Search Jira",
    contexts: ["selection"],
    enabled: !!globalDefect
  });
  // chrome.contextMenus.create({
  //   id: "SFExtDocs",
  //   parentId: "SFExt",
  //   title: "Search Documentation",
  //   contexts: ["selection"],
  // });
  // chrome.contextMenus.create({
  //   id: "SFExtCommunity",
  //   parentId: "SFExt",
  //   title: "Search Community",
  //   contexts: ["selection"],
  // });
  // chrome.contextMenus.create({
  //   id: "ALLDocs",
  //   parentId: "SFExtDocs",
  //   title: "All Documentation",
  //   contexts: ["selection"],
  // });
  // chrome.contextMenus.create({
  //   id: "EDDocs",
  //   parentId: "SFExtDocs",
  //   title: "Enterprise Developer",
  //   contexts: ["selection"],
  // });
  // chrome.contextMenus.create({
  //   id: "EADocs",
  //   parentId: "SFExtDocs",
  //   title: "Enterprise Analyzer",
  //   contexts: ["selection"],
  // });
  // chrome.contextMenus.create({
  //   id: "VCDocs",
  //   parentId: "SFExtDocs",
  //   title: "Visual COBOL",
  //   contexts: ["selection"],
  // });
  // chrome.contextMenus.create({
  //   id: "ACUDocs",
  //   parentId: "SFExtDocs",
  //   title: "AcuCOBOL",
  //   contexts: ["selection"],
  // });
  // chrome.contextMenus.create({
  //   id: "ALLCommunity",
  //   parentId: "SFExtCommunity",
  //   title: "All Community",
  //   contexts: ["selection"],
  // });
  // chrome.contextMenus.create({
  //   id: "ECommunity",
  //   parentId: "SFExtCommunity",
  //   title: "Enterprise",
  //   contexts: ["selection"],
  // });
  // chrome.contextMenus.create({
  //   id: "ESSCommunity",
  //   parentId: "SFExtCommunity",
  //   title: "Enterprise Suite Spot",
  //   contexts: ["selection"],
  // });
  // chrome.contextMenus.create({
  //   id: "VCCommunity",
  //   parentId: "SFExtCommunity",
  //   title: "Visual COBOL",
  //   contexts: ["selection"],
  // });
  // chrome.contextMenus.create({
  //   id: "ACUCommunity",
  //   parentId: "SFExtCommunity",
  //   title: "AcuCOBOL",
  //   contexts: ["selection"],
  // });
}

function updateJiraMenu() {
  chrome.contextMenus.update("SFExtJira", {
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
  chrome.tabs.create({ url: searchUrl });
}

chrome.runtime.onStartup.addListener(createMenus);
chrome.runtime.onInstalled.addListener(createMenus);

chrome.contextMenus.onClicked.addListener((info, tab) => {
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
    chrome.tabs.create({
      url: url,
    });
  }
});