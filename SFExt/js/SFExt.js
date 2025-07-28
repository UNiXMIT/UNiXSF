const installedVersion = chrome.runtime.getManifest().version;
let globalInit = 0;
let navInit = 1;
let initDropDown = 1;
let globalTimeout;
let globalQueue;
let globalQNotify;
let globalQNotifyWeb;
let globalWebhook;
let globalURLS;
let globalDefectURL;
let globalPP;
let globalEDU;
let globalRefEmail;
let globalSig;
let globalWide;
let globalArial = 1;
let iconURL= chrome.runtime.getURL('icons/rocket128.png');
let intervalID;
let qObserver;
let oldCaseArray = [];
let newCaseArray = [];
let configURL = chrome.runtime.getURL('config/config.html');

function initSyncData() {
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
        savedSig: '',
        savedURLS: `{"SFExt":"${configURL}"}`,
        savedWide: false
    }, function(result) {
        globalTimeout = result.savedTimeout;
        globalDefectURL = result.savedDefect;
        globalPP = result.savedPP;
        globalEDU = result.savedEDU;
        globalQueue = result.savedQueue;
        globalQNotify = result.savedQNotify;
        globalQNotifyWeb = result.savedQNotifyWeb;
        globalWebhook = result.savedWebhook;
        globalRefEmail = result.savedRefEmail;
        globalSig = result.savedSig;
        globalURLS = result.savedURLS;
        globalWide = result.savedWide;
        globalInit = 1;
    });
}

function getSyncData() {
    chrome.storage.onChanged.addListener((changes, area) => {
        if (area === 'sync') {
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
                savedSig: '',
                savedURLS: `{"SFExt":"${configURL}"}`,
                savedWide: false
            }, function(result) {
                if (globalTimeout != result.savedTimeout) {
                    globalTimeout = result.savedTimeout;
                    if (intervalID) {
                        clearInterval(intervalID);
                    }
                    queueRefresh();
                }
                globalDefectURL = result.savedDefect;
                globalPP = result.savedPP;
                globalEDU = result.savedEDU;
                if (globalQueue != result.savedQueue) {
                    globalQueue = result.savedQueue;
                    if (qObserver) {
                        qObserver.disconnect();
                    }
                    oldCaseArray = [];
                    newCaseArray = [];
                    initQMonitor();
                }
                globalQNotify = result.savedQNotify;
                globalQNotifyWeb = result.savedQNotifyWeb;
                globalWebhook = result.savedWebhook;
                globalRefEmail = result.savedRefEmail;
                globalSig = result.savedSig;
                if (globalURLS != result.savedURLS) {
                    globalURLS = result.savedURLS;
                    updateCustomURLs();
                }
                globalWide = result.savedWide;
            });
        }
    });
}

function queueRefresh() {
    if (globalTimeout >= 30) {
        refreshInterval = globalTimeout * 1000;
        intervalID = setInterval(function() {
            let refreshButton = document.querySelector('#split-left').querySelector('button[name="refreshButton"]');
            if (refreshButton) {
                refreshButton.click();
            }
        }, refreshInterval);
    }
}

function mfNav() {
    let observer = new MutationObserver(mutations => {
        let mfButton = document.querySelector('#oneHeader')?.querySelector('ul.slds-global-actions');
        let liDetect = mfButton?.querySelectorAll('li.slds-global-actions__item');
        if ( (mfButton) && (navInit) && (liDetect.length == 7) && (liDetect[2]) && (liDetect[3]) && (liDetect[4]) ) {
            observer.disconnect();
            (async ()=>{
                navInit = 0;
                let removeButton = mfButton.querySelectorAll('li.slds-global-actions__item');
                for (let i = 2; i < 5 ; ++i) {
                    removeButton[i].remove();
                }
                mfDropDown();
                mfSup();
                mfDefect();
                mfDocumentation();
                thirdLineRef();
                addReminder();
                mfPP();
                mfEDU();
                customURLs();
            })();
        }
    });
    observer.observe(document.body, {childList: true, subtree: true});
}

function mfDropDown() {
    let mfButton = document.querySelector('#oneHeader').querySelector('ul.slds-global-actions');
    do {
        if (mfButton) {
            let divOuter = document.createElement('div');
            divOuter.classList.add('mfdropdown', 'mfdropmain');
            let button = divOuter.appendChild(document.createElement('button'));
            button.classList.add('dropbtn');
            let i = divOuter.appendChild(document.createElement('i'));
            i.classList.add('fa-solid', 'fa-caret-down', 'fa-lg');
            let divInner = divOuter.appendChild(document.createElement('div'));
            divInner.classList.add('dropdown-content');
            let ul = divInner.appendChild(document.createElement('ul'));
            ul.classList.add('mflist');
            mfButton.insertBefore(divOuter, mfButton.children[3]);
            initDropDown = 0;
        }
    } while (initDropDown);
}

function createMFMenu(liClass, faClass, liText) {
    let ul = document.querySelector('.mflist');
    let li = ul.appendChild(document.createElement('li'));
    li.classList.add(liClass);
    let fa = li.appendChild(document.createElement('i'));
    fa.classList.add('fa-solid', 'fa-xl');
    fa.classList.add(faClass);
    li.appendChild(document.createTextNode(liText));
}

function mfSup() {
    createMFMenu('mfsup', 'fa-headset', 'Support Portal');
    let mfButtonNew = document.querySelector('#oneHeader').querySelector('.mfsup');
    mfButtonNew.addEventListener('click', mfSupEvent, false);
}

function mfSupEvent() {
    window.open('https://my.rocketsoftware.com/RocketCommunity', '_blank');
}

function mfDefect() {
    createMFMenu('mfde', 'fa-code', 'Jira');
    let mfButtonNew = document.querySelector('#oneHeader').querySelector('.mfde');
    mfButtonNew.addEventListener('click', mfDefectEvent, false);
}

function mfDefectEvent() {
    window.open(globalDefectURL.replace(/\/$/, ""), '_blank');
}

function mfDocumentation() {
    createMFMenu('mfdocs', 'fa-book', 'Documentation');
    let mfButtonNew = document.querySelector('#oneHeader').querySelector('.mfdocs');
    mfButtonNew.addEventListener('click', mfDocumentationEvent, false);
}

function mfDocumentationEvent() {
    window.open('https://docs.rocketsoftware.com/', '_blank');
}

function mfDocumentationURL(products, mfProduct) {
    let documentationURL = "https://docs.rocketsoftware.com/bundle?labelkey=";
    let productURI = products[mfProduct];
    if (productURI) {
        let finalURL = documentationURL + productURI;
        window.open(finalURL, '_blank');
    } else {
        window.open(documentationURL, '_blank');
    }
}

function thirdLineRef() {
    createMFMenu('thirdLineRef', 'fa-paper-plane', '3rd Line Referral');
    let mfButtonNew = document.querySelector('#oneHeader').querySelector('.thirdLineRef');
    mfButtonNew.addEventListener('click', thirdLineRefEvent, false);
}

function thirdLineRefEvent() {
    refEmail();
}

function refEmail() {
    let caseURL;
    let caseNumber;
    let caseSubject;
    let caseName;
    let caseAccount;
    let caseProduct;
    let userQuery;
    let caseCheck = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab');
    if (caseCheck) {
        caseNumber = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab').querySelector('[field-label="Case Number"] [name="outputField"]').innerText;
        caseSubject = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab').querySelector('[field-label="Subject"] [name="outputField"]').innerText;
        caseName = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab').querySelector('[field-label="Contact Name"] [name="outputField"] a').innerText;
        caseAccount = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab').querySelector('[field-label="Account Name"] [name="outputField"] a').innerText;
        caseProduct = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab').querySelector('[field-label="Product"] [name="outputField"] a').innerText;
        caseURL = document.querySelector('a.tabHeader[aria-selected="true"]').href;
    }
    if ((caseNumber) && (caseSubject) && (caseName) && (caseAccount) && (caseURL) && (caseProduct)) {
        userQuery = {
        "to" : globalRefEmail,
        "subject" : caseAccount + " - 3rd Line assistance request for Case - " + caseNumber,
        "body" : "**When sending a request to 3rd Line for additional support, please fill in the information below where relevant**\n\n"
            + "PRODUCT: " + caseProduct + "\n\n"
            + "CUSTOMER: " + caseName + " - " + caseAccount + "\n\n"
            + "CASE SUMMARY: \n\n"
            + "• Summary of the issue\n" 
            + caseNumber + " - " + caseSubject + "\n" 
            + caseURL + "\n\n"
            + "• Summary of diagnostics\n\n"
            + "• Hypothesis and other details\n\n"
            + "• List Relevant Case Attachments\n\n"
        };
    } else {
        userQuery = {
        "to" : globalRefEmail,
        "subject" : "[Account Name]" + " - 3rd Line assistance request for Case - " + "[Case Number]",
        "body" : "**When sending a request to 3rd Line for additional support, please fill in the information below where relevant**\n\n"
            + "PRODUCT: \n\n"
            + "CUSTOMER: " + "[Customer Name]" + " - " + "[Account Name]" + "\n\n"
            + "CASE SUMMARY: \n\n"
            + "• Summary of the issue\n\n" 
            + "• Summary of diagnostics\n\n"
            + "• Hypothesis and other details\n\n"
            + "• List FTS Attachments\n\n"
        };
    }
    let outlookURL = "https://outlook.office.com/mail/deeplink/compose";
    let finalQuery = [];
    Object.entries(userQuery).forEach(([key, value]) => {
        finalQuery.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    });
    let finalURL = outlookURL + (finalQuery.length ? '?' + finalQuery.join('&') : '');
    window.open(finalURL, '3rd Line Referral', 'width=1600,height=900');
}

function addReminder() {
    createMFMenu('mfreminder', 'fa-calendar', 'Add Reminder');
    let mfButtonNew = document.querySelector('#oneHeader').querySelector('.mfreminder');
    mfButtonNew.addEventListener('click', addReminderEvent, false);
}

function addReminderEvent() {
    let querySubject;
    let caseURL;
    let caseLink;
    let caseNumber;
    let caseSubject;
    let today = new Date();
    let future = today.setDate(today.getDate() + 3);
    let reminderDate = new Date(future).toJSON();
    let caseCheck = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab');
    if (caseCheck) {
        caseNumber = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab').querySelector('[field-label="Case Number"] [name="outputField"]').innerText;
        caseSubject = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab').querySelector('[field-label="Subject"] [name="outputField"]').innerText;
    }
    if ((caseNumber) && (caseSubject)) {
        querySubject = caseNumber + " - " + caseSubject;
        caseURL = document.querySelector('a.tabHeader[aria-selected="true"]').href;
        caseLink = `<a title="${caseNumber}" href="${caseURL}">${querySubject}</a>`;
    } else {
        if ((caseNumber) && !(caseSubject)) {
            querySubject = caseNumber;
            caseURL = document.querySelector('a.tabHeader[aria-selected="true"]').href;
            caseLink = `<a title="${caseNumber}" href="${caseURL}">${querySubject}</a>`;
        } else {
            querySubject = "";
            caseLink = "";
        }
    }
    let userQuery = {
        "rru" : "addevent",
        "startdt" : reminderDate,
        "subject" : querySubject,
        "body" : caseLink
    };
    let calendarURL = "https://outlook.office.com/calendar/deeplink/compose";
    let finalQuery = [];
    Object.entries(userQuery).forEach(([key, value]) => {
        finalQuery.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    });
    let finalURL = calendarURL + (finalQuery.length ? '?' + finalQuery.join('&') : '');
    window.open(finalURL, 'Add Reminder', 'width=1200,height=700');
}

function mfPP() {
    createMFMenu('mfpp', 'fa-circle-plus', 'Huddle');
    let mfButtonNew = document.querySelector('#oneHeader').querySelector('.mfpp');
    mfButtonNew.addEventListener('click', mfPPEvent, false);
}

function mfPPEvent() {
    window.open(globalPP, '_blank');
}

function mfEDU() {
    createMFMenu('mfedu', 'fa-book-open-reader', 'Education System');
    let mfButtonNew = document.querySelector('#oneHeader').querySelector('.mfedu');
    mfButtonNew.addEventListener('click', mfEDUEvent, false);
}

function mfEDUEvent() {
    window.open(globalEDU, '_blank');
}

function customURLs() {
    try {
        let URLS = JSON.parse(globalURLS);
        let countURLs = 1;
        Object.entries(URLS).forEach(([key, value]) => {
            let urlClass = `custom${countURLs}`;
            createMFMenu(urlClass, 'fa-bolt', key);
            let urlElement = document.getElementsByClassName(urlClass);
            urlElement[0].addEventListener('click', function(){window.open(value, '_blank');}, false);
            countURLs = countURLs + 1;
        });
    } catch (err) {
        window.alert("Custom URL list JSON format is not correct!");
    }
}

function updateCustomURLs() {
    let customCount = document.querySelectorAll('.fa-bolt').length;
    for (let i = 0; i < customCount; ++i) {
        let customCount = i + 1;
        let urlClass = `custom${customCount}`;
        let removeURL = document.getElementsByClassName(urlClass);
        removeURL[0].parentNode.removeChild(removeURL[0]);
    }
    try {
        let URLS = JSON.parse(globalURLS);
        let countURLs = 1;
        Object.entries(URLS).forEach(([key, value]) => {
            let urlClass = `custom${countURLs}`;
            createMFMenu(urlClass, 'fa-bolt', key);
            let urlElement = document.getElementsByClassName(urlClass);
            urlElement[0].addEventListener('click', function(){window.open(value, '_blank');}, false);
            countURLs = countURLs + 1;
        });
    } catch (err) {
        window.alert("Custom URL list JSON format is not correct!");
    }
}

function initQMonitor() {
    let caseQueue = document.querySelector('#split-left').querySelector(`table[aria-label*="${globalQueue}"]`);
    let caseTable = document.querySelector('#split-left').querySelectorAll(`table[aria-label*="${globalQueue}"] tbody tr`);
    if ( (caseQueue) && (caseTable) ) {
        caseTable.forEach(caseRow => {
            let caseNumber = caseRow.querySelector('th').innerText;
            oldCaseArray.push(caseNumber);
        });
        qMonitor();
    } else if (caseQueue) {
        qMonitor();
    } else {
        let observer = new MutationObserver(mutations => {
            setTimeout(function() {
                let caseQueue = document.querySelector('#split-left').querySelector(`table[aria-label*="${globalQueue}"]`);
                let caseTable = document.querySelector('#split-left').querySelectorAll(`table[aria-label*="${globalQueue}"] tbody tr`);
                if ( (caseQueue) && (caseTable) ) {
                    caseTable.forEach(caseRow => {
                        let caseNumber = caseRow.querySelector('th').innerText;
                        oldCaseArray.push(caseNumber);
                    });
                }
                if (caseQueue) {
                    qMonitor();
                    observer.disconnect();
                }
            }, 5000);
        });
        observer.observe(document.body, {childList: true, subtree: true});
    }
}

function qMonitor() {
    let caseQueue = document.querySelector('#split-left').querySelector(`table[aria-label*="${globalQueue}"]`);
    qObserver = new MutationObserver(mutations => {
        if (caseQueue) {
            setTimeout(function() {
                qNotify();
            }, 2000);
        }
    });
    qObserver.observe(caseQueue, {childList: true, subtree: true});
}

function qNotify() {
    let caseQueue = document.querySelector('#split-left').querySelector(`table[aria-label*="${globalQueue}"]`);
    let caseTable = document.querySelector('#split-left').querySelectorAll(`table[aria-label*="${globalQueue}"] tbody tr`);
    if (caseTable) {
        caseTable.forEach(caseRow => {
            let caseNumber = caseRow.querySelector('th').innerText;
            let caseSubject = caseRow.querySelector('[data-label="Subject"]').innerText.split('\n')[0];
            let caseURL = 'https://rocketsoftware.lightning.force.com/lightning/r/' + caseRow.getAttribute('data-row-key-value') + '/view';
            let notifyBody;
            if ( !(caseSubject) ) {
                notifyBody = caseNumber;
            } else {
                notifyBody = caseNumber + ' - ' + caseSubject;
            }
            if (oldCaseArray.indexOf(caseNumber) == -1) {
                if (globalQNotify) {
                    (async() => {
                        if (!window.Notification) {
                            console.log('Browser does not support notifications.');
                        } else {
                            if (Notification.permission === 'granted') {
                                const qNotification = new Notification('SFExtension Queue Monitor', {
                                    body: notifyBody,
                                    icon: iconURL
                                });
                                qNotification.addEventListener('click', () => {
                                    window.open(caseURL, '_blank');
                                });
                            } else {
                                Notification.requestPermission()
                                    .then(function(p) {
                                        if (p === 'granted') {
                                            const qNotification = new Notification('SFExtension Queue Monitor', {
                                                body: notifyBody,
                                                icon: iconURL
                                            });
                                            qNotification.addEventListener('click', () => {
                                                window.open(caseURL, '_blank');
                                            });
                                        } else {
                                            console.log('User blocked notifications.');
                                        }
                                    })
                                    .catch(function(err) {
                                        console.error(err);
                                    });
                            }
                        }
                    })();
                    if (globalQNotifyWeb) {
                        chrome.runtime.sendMessage({
                            action: "newCase",
                            url: globalWebhook,
                            content: notifyBody + ' ' + caseURL
                        });
                    }
                }
            }
            newCaseArray.push(caseNumber);
        });
        if ( (caseQueue) && (caseTable) ) {
            oldCaseArray = [];
            oldCaseArray = newCaseArray;
            newCaseArray = [];
        }
    } else {
        if ( (caseQueue) && !(caseTable) ) {
            setTimeout(function() {
                emptyArrays();
            }, 2000);
        }
    }
}

function emptyArrays() {
    let caseQueue = document.querySelector('#split-left').querySelector(`table[aria-label*="${globalQueue}"]`);
    let caseTable = caseQueue.querySelectorAll("tbody tr");
    if ( (caseQueue) && !(caseTable) ) {
        oldCaseArray = [];
        newCaseArray = [];
    }
}

function addCopyButton() {
    let observer = new MutationObserver(mutations => {
        let activeTab = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab');
        if (activeTab) {
            let caseButtonCheck = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab').querySelector('.highlights-icon-container.slds-avatar.slds-m-right_small.icon.copyButton');
            if (caseButtonCheck === null) {
                let field  = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab').querySelector('.highlights-icon-container.slds-avatar.slds-m-right_small.icon');
                (async ()=>{
                    if (field) {
                        field.className = 'highlights-icon-container slds-avatar slds-m-right_small icon copyButton';
                        field.style.cursor = 'pointer';
                        let fieldTitle = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab').querySelector('.highlights-icon-container.slds-avatar.slds-m-right_small.icon > img');
                        fieldTitle.title = 'Copy Case Number & Subject';
                        field.addEventListener('click', async () => {
                            let caseNumber = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab').querySelector('[field-label="Case Number"] [name="outputField"]');
                            let caseSubject  = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab').querySelector('[field-label="Subject"] [name="outputField"]');
                            selectedText = caseNumber.innerText + ' - ' + caseSubject.innerText;
                            let caseURL = document.querySelector('a.tabHeader[aria-selected="true"]').href;
                            const clipboardItem = new ClipboardItem({
                                "text/plain": new Blob(
                                    [selectedText],
                                    { type: "text/plain" }
                                ),
                                "text/html": new Blob(
                                    [`<a href="${caseURL}">${selectedText}</a>`],
                                    { type: "text/html" }
                                ),
                            });
                            await navigator.clipboard.write([clipboardItem]);
                        });
                    }
                    await sleep(500);
                })();
            }
        }
    });
    observer.observe(document.body, {childList: true, subtree: true});
}

function addCaseTitle() {
    let observer = new MutationObserver(mutations => {
        let activeCase = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab');
        if (activeCase) {
            let headerTitle = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab').querySelector('h1');
            if (headerTitle) {
                let caseNumber = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab').querySelector('[field-label="Case Number"] [name="outputField"]')?.innerText;
                let caseSubject = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab').querySelector('[field-label="Subject"] [name="outputField"]')?.innerText;
                let oldSubject = headerTitle.querySelector('[name="primaryField"]')?.innerText;
                let tempSubject = oldSubject?.replace(`${caseNumber} - `, '');
                if ((tempSubject != caseSubject) && (caseNumber && caseSubject)) {
                    headerTitle.querySelector('[name="primaryField"]').innerText = caseNumber + ' - ' + caseSubject;
                }
            }
        } 
        (async ()=>{
            observer.disconnect();
            await sleep(1000);
            observer.observe(document.body, {childList: true, subtree: true});
        })();
    });
    observer.observe(document.body, {childList: true, subtree: true});
}

function KCSURL() {
    let observer = new MutationObserver(mutations => {
        let headerCell = document.querySelector('[title="URL Name"]');
        if (headerCell) {
            let headerCellIndex = headerCell.cellIndex;
            let KCSRows = document.querySelectorAll("tbody tr:not([title='KCSURL'])");
            KCSRows.forEach(row => {
                let KCSCell = row.cells[headerCellIndex];
                let KCSURL = KCSCell?.innerText;
                if (KCSURL) {
                    let finalURL = `<span class="slds-grid slds-grid--align-spread"><a class="slds-truncate slds-truncate" target="_blank" href="https://my.rocketsoftware.com/RocketCommunity/s/article/${KCSURL}">${KCSURL}</a></span>`;
                    KCSCell.innerHTML = finalURL;
                    row.title = "KCSURL";
                }
            });
        }
        let ActiveURLField = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab');
        if (ActiveURLField) {
            let URLField = ActiveURLField.querySelector('[field-label="URL Name"] lightning-formatted-text');
            if (URLField) {
                let KCSCheck = URLField?.querySelector("a");
                if (URLField && !KCSCheck) {
                    let KCSURL = URLField.innerText;
                    let finalURL = `<a target="_blank" href="https://my.rocketsoftware.com/RocketCommunity/s/article/${KCSURL}">${KCSURL}</a>`;
                    URLField.innerHTML = finalURL;
                }
            }
        }       
    });
    observer.observe(document.body, {childList: true, subtree: true});
}

function fullWidthCase() {
    let observer = new MutationObserver(mutations => {
        let caseView = document.querySelector('div.split-right')?.querySelector('div.template-workspace-contents.slds-grid');
        if (caseView && globalWide) {
            caseView.classList.remove("slds-grid");
        }
    });
    observer.observe(document.body, {childList: true, subtree: true});
}

function signatureButton() {
    let observer = new MutationObserver(mutations => {
        let mfSigCheck = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab')?.querySelector('.mfSig');
        if (!mfSigCheck) {
            let buttons = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab')?.querySelector('.publisherInputContainer [aria-label="Insert content"]');
            if (buttons) {
                let sigButton = document.createElement('li');
                sigButton.addEventListener('click', sigEvent, false);
                sigButton.innerHTML = `<button class="slds-button slds-button_icon slds-button_icon-border-filled fa-solid fa-signature mfSig" title="Insert Signature" aria-label="Insert Signature">`;
                buttons.appendChild(sigButton);
            }
        }
    });
    observer.observe(document.body, {childList: true, subtree: true});
}

function sigEvent() {
    document.querySelector('div.split-right > .tabContent.active.oneConsoleTab').querySelector('.ql-editor').innerHTML = convertSigToHTML(globalSig);
    document.querySelector('div.split-right > .tabContent.active.oneConsoleTab')?.querySelector('.publisherVisibilityValue span')?.click();
    document.querySelector('div.split-right > .tabContent.active.oneConsoleTab')?.querySelector('[title="All with access"]')?.click();
}

function convertSigToHTML(input) {
  let lines = input.split('\n').map(line => line.trim());
  let html = '<p><br></p><p><br></p>';
  lines.forEach(line => {
    if (line !== '') {
        html += `<p>${line}<br></p>`;
    }
  });
  html = html.replace(/<p>([^<]*)<br><\/p>$/, '<p>$1</p>');
  return html;
}

function extLoaded() {
    let observer = new MutationObserver(mutations => {
        let initial = document.querySelector('.oneUtilityBar');
        if (initial) {
            let footer = initial.querySelector('.utilitybar');
            if (footer) {
                let footera = document.createElement("a");
                footera.className = "ExtLoaded";
                footera.innerText = `SFExt ${installedVersion}`;
                footera.href = configURL;
                footera.setAttribute('target', '_blank');
                footer.appendChild(footera);
                observer.disconnect();
            }
        }
    });
    observer.observe(document.body, {childList: true, subtree: true});
}

function extLoaded() {
    let observer = new MutationObserver(mutations => {
        let initial = document.querySelector('.oneUtilityBar');
        if (initial) {
            let footer = initial.querySelector('.utilitybar');
            if (footer) {
                let footera = document.createElement("a");
                footera.className = "ExtLoaded";
                footera.innerText = `SFExt ${installedVersion}`;
                footera.href = configURL;
                footera.setAttribute('target', '_blank');
                footer.appendChild(footera);
                observer.disconnect();
            }
        }
    });
    observer.observe(document.body, {childList: true, subtree: true});
}

function keepAlive() {
    chrome.runtime.sendMessage({
        action: "keepAlive"
    });
}

function moveMouse(){
	var evt = new MouseEvent("mousemove", {
        view: window,
        bubbles: true,
        cancelable: true
    });
    document.dispatchEvent(evt);
}

function fixMouse() {
    document.addEventListener('mouseup', e => {
        if (typeof e === 'object' && [3, 4].includes(e.button)) {
            e.preventDefault();
        }
    });
}

function EE() {
    window.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.shiftKey && event.code === 'F1') {
            if (intervalID) {
                clearInterval(intervalID);
            }
            let img = document.createElement('img');
            img.src = 'https://i.giphy.com/12FOQ3mPLElLHy.webp';
            img.style.position = 'absolute';
            img.style.zIndex = 9999;
            img.style.width = '125px';
            document.body.appendChild(img);
            let elements = document.querySelectorAll("*");
            elements.forEach(function(element) {
                element.classList.add("explode");
            });
            let x = 200;
            let y = 200;
            let dx = 1;
            let dy = 1;
            setInterval(function() {
                x += dx;
                y += dy;
                if (x >= window.innerWidth - 150 || x <= 0) dx = -dx;
                if (y >= window.innerHeight - 150 || y <= 0) dy = -dy;
                img.style.top = y + 'px';
                img.style.left = x + 'px';
                img.style.transform = dx > 0 ? 'scaleX(1)' : 'scaleX(-1)';
                let elements = document.querySelectorAll('table.slds-table *');
                if ( (elements.length < 10) ) {
                    return;
                }
                let randomIndex = Math.floor(Math.random() * elements.length);
                let element = elements[randomIndex];
                let explosion = document.createElement("img");
                explosion.src = "https://i.gifer.com/origin/d7/d7ac4f38b77abe73165d85edf2cbdb9e_w200.gif";
                explosion.classList.add("explosion-graphic");
                explosion.style.zIndex = 9998;
                if (element) {
                    element.style.display = "none";
                    let parentExplosion = element.parentNode;
                    if (element.class != "explosion-graphic") {
                        parentExplosion.appendChild(explosion);
                    }
                }
            }, 1);
        }
    });
}

function updateCheck() {
    chrome.runtime.sendMessage({
        action: "updateCheck"
    }, function(response) {
        let latestVersion = response.latestVer;
        if (latestVersion) {
            let newVersion = compareVersions(installedVersion, latestVersion.toString());
            if ( (newVersion == 1) ) {
                const updateURL = `https://github.com/UNiXMIT/UNiXSF/raw/main/updates/Chromium/${latestVersion}/SFExt-${latestVersion}.zip`;
                (async() => {
                    let updateMessage = `Version ${latestVersion}`;
                    if (!window.Notification) {
                        console.log('Browser does not support notifications.');
                    } else {
                        if (Notification.permission === 'granted') {
                            const UpdateNofity = new Notification('SFExtension Update Available', {
                                body: updateMessage,
                                icon: iconURL
                            });
                            UpdateNofity.addEventListener('click', () => {
                                window.open(updateURL, '_blank');
                            });
                        } else {
                            Notification.requestPermission()
                                .then(function(p) {
                                    if (p === 'granted') {
                                        const UpdateNofity = new Notification('SFExtension Update Available', {
                                            body: updateMessage,
                                            icon: iconURL
                                        });
                                        UpdateNofity.addEventListener('click', () => {
                                            window.open(updateURL, '_blank');
                                        });
                                    } else {
                                        console.log('User blocked notifications.');
                                    }
                                })
                                .catch(function(err) {
                                    console.error(err);
                                });
                        }
                    }
                })();
                if ( !(initDropDown) ) {
                    let ul = document.querySelector('.mflist');
                    let li = ul.appendChild(document.createElement('li'));
                    li.classList.add('mfupdate');
                    let fa = li.appendChild(document.createElement('i'));
                    fa.classList.add('fa-solid', 'fa-xl');
                    fa.classList.add('fa-arrows-rotate');
                    fa.classList.add('fa-spin');
                    li.appendChild(document.createTextNode(`SFExt Update ${latestVersion}`));
                    let mfButtonNew = document.querySelector('#oneHeader').querySelector('.mfupdate');
                    mfButtonNew.addEventListener('click', () => {window.open(updateURL, '_blank');});
                }
            }
        }
    });
}

function compareVersions(v1, v2) {
    const v1Parts = v1.split('.');
    const v2Parts = v2.split('.');
    for (let i = 0; i < v1Parts.length || i < v2Parts.length; i++) {
        if (i >= v1Parts.length) {
            return 1;
        } else if (i >= v2Parts.length) {
            return -1;
        }
        if (parseInt(v1Parts[i]) > parseInt(v2Parts[i])) {
            return -1;
        } else if (parseInt(v1Parts[i]) < parseInt(v2Parts[i])) {
            return 1;
        }
    }
    return 0;
}  

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};

// (async ()=>{
//     console.log('foo');
//     await sleep(2000);
//     console.log('bar');
// })();

function contains(selector, text) {
    let elements = document.querySelectorAll(selector);
    return Array.prototype.filter.call(elements, function(element){
      return RegExp(text).test(element.innerText);
    });
}

function activeQueueContains(selector, text) {
    let activeQueue = document.querySelector('table.uiVirtualDataTable');
    if (activeQueue) {
        let elements = activeQueue.querySelectorAll(selector);
        return Array.prototype.filter.call(elements, function(element){
        return RegExp(text).test(element.innerText);
        });
    } else {
        return[];
    }
}

function monitoredQueueContains(caseRow, selector, text) {
    let elements = caseRow.querySelectorAll(selector);
    return Array.prototype.filter.call(elements, function(element){
    return RegExp(text).test(element.innerText);
    });
}

function activeCaseContains(selector, text) {
    let activeCase = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab');
    if (activeCase) {
        let elements = activeCase.querySelectorAll(selector);
        return Array.prototype.filter.call(elements, function(element){
        return RegExp(text).test(element.innerText);
        });
    } else {
        return[];
    }
}

// contains('div', 'sometext');     find "div" that contain "sometext"
// contains('div', /^sometext/);    find "div" that start with "sometext"
// contains('div', /sometext$/i);   find "div" that end with "sometext", case-insensitive

function waitActiveElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

initSyncData();
let initInterval = setInterval(function() {
    if (globalInit) {
        getSyncData();
        queueRefresh();
        mfNav();
        setTimeout(function() {
            initQMonitor();
        }, 10000);
        addCopyButton();
        addCaseTitle();
        KCSURL();
        fullWidthCase();
        signatureButton();
        extLoaded();
        setInterval(keepAlive, 60000);
        setInterval(moveMouse, 60000);
        fixMouse();
        EE();
        setTimeout(function() {
            updateCheck();
        }, 20000);
        clearTimeout(initInterval);
    }
}, 500);