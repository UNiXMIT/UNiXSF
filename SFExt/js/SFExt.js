const installedVersion = chrome.runtime.getManifest().version;
let globalInit = 0;
let navInit = 1;
let initDropDown = 1;
let globalTimeout;
let globalProducts;
let globalQueue;
let globalQNotify;
let globalQNotifyWeb;
let globalWebhook;
let globalProtocol;
let globalFTSURL;
let globalURLS;
let globalStatus;
let intervalID;
let qObserver;
let oldCaseArray = [];
let newCaseArray = [];
let oldActivityArray = [];
let newActivityArray = [];
let discord = 'https://discord.com/api/webhooks/';
let URI1 = '1056247346654101575/';
let URI2 = 'zTGO0MUYyRsBbwdLUYn3Y44QE63KVXNTA0sUpDXR0OF9uifnCXz2DjqJagu_7zRA_ols';

function initSyncData() {
    chrome.storage.sync.get({
        savedTimeout: 60,
        savedProducts: '{"ACUCOBOL-GT (Extend)":"extend-acucobol","Enterprise Developer / Server / Test Server":"enterprise-developer","Visual COBOL":"visual-cobol","COBOL Server":"cobol","Net Express / Server Express":"net-express","Enterprise Analyzer":"enterprise-analyzer","COBOL Analyzer":"cobol-analyzer","COBOL-IT":"cobol-it-ds","RM/COBOL":"rm-cobol","Relativity":"relativity","Data Express":"dataexpress"}',
        savedQueue: 'NOTIFY',
        savedQNotify: false,
        savedQNotifyWeb: false,
        savedWebhook: 'https://webhookURL',
        savedProtocol: 'sftp://',
        savedFTSURL: 'secureupload.microfocus.com:2222',
        savedURLS: '{"SFExt":"https://unixmit.github.io/UNiXSF"}',
        savedStatus: false
    }, function(result) {
        globalTimeout = result.savedTimeout;
        globalProducts = result.savedProducts;
        globalQueue = result.savedQueue;
        globalQNotify = result.savedQNotify;
        globalQNotifyWeb = result.savedQNotifyWeb;
        globalWebhook = result.savedWebhook;
        globalProtocol = result.savedProtocol;
        globalFTSURL = result.savedFTSURL;
        globalURLS = result.savedURLS;
        globalStatus = result.savedStatus;
        globalInit = 1;
    });
}

function getSyncData() {
    chrome.storage.onChanged.addListener((changes, area) => {
        if (area === 'sync') {
            chrome.storage.sync.get({
                savedTimeout: 60,
                savedProducts: '{"ACUCOBOL-GT (Extend)":"extend-acucobol","Enterprise Developer / Server / Test Server":"enterprise-developer","Visual COBOL":"visual-cobol","COBOL Server":"cobol","Net Express / Server Express":"net-express","Enterprise Analyzer":"enterprise-analyzer","COBOL Analyzer":"cobol-analyzer","COBOL-IT":"cobol-it-ds","RM/COBOL":"rm-cobol","Relativity":"relativity","Data Express":"dataexpress"}',
                savedQueue: 'NOTIFY',
                savedQNotify: false,
                savedQNotifyWeb: false,
                savedWebhook: 'https://webhookURL',
                savedProtocol: 'sftp://',
                savedFTSURL: 'secureupload.microfocus.com:2222',
                savedURLS: '{"SFExt":"https://unixmit.github.io/UNiXSF"}',
                savedStatus: false
            }, function(result) {
                if (globalTimeout != result.savedTimeout) {
                    globalTimeout = result.savedTimeout;
                    if (intervalID) {
                        clearInterval(intervalID);
                    }
                    queueRefresh();
                }
                globalProducts = result.savedProducts;
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
                globalProtocol = result.savedProtocol;
                globalFTSURL = result.savedFTSURL;
                if (globalURLS != result.savedURLS) {
                    globalURLS = result.savedURLS;
                    updateCustomURLs();
                }
                globalStatus = result.savedStatus;
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
            window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'f15'}));
        }, refreshInterval);
    }
}

function createStatusModal() {
    const caseStatusJSON = '{"suspended":"Suspended","closed":"Closed","internal":"Pending Internal","solution":"Solution Suggested","support":"Pending Support","development":"Pending Development","release":"Pending Release"}';
    let myDialog = document.createElement("dialog");
    myDialog.className = 'statusDialog';
    document.body.appendChild(myDialog);
    let statusDiv = document.createElement("div");
    statusDiv.className = "caseStatus";
    let statusTitle = statusDiv.appendChild(document.createElement('h3'));
    statusTitle.innerText = "Case Status";
    myDialog.appendChild(statusDiv);
    let caseStatusParse = JSON.parse(caseStatusJSON);
    Object.entries(caseStatusParse).forEach(([key, value]) => {
        let statusGroup = document.createElement("div");
        statusGroup.className = "statusGroup";
        let input = statusGroup.appendChild(document.createElement('input'));
        input.type = "radio";
        input.id = key;
        input.name = "status";
        input.value = value;
        input.className = 'statusRadioMF';
        let label = statusGroup.appendChild(document.createElement('label'));
        label.className = "statusLabel";
        label.setAttribute("for", key);
        label.innerText = value;
        statusDiv.appendChild(statusGroup);
    });
    let cancelStatus = statusDiv.appendChild(document.createElement('button'));
    cancelStatus.textContent = "Cancel";
    cancelStatus.className = "statusButton";
    cancelStatus.addEventListener('click', function(){myDialog.close();}, false);
    let saveStatus = statusDiv.appendChild(document.createElement('button'));
    saveStatus.textContent = "Save";
    saveStatus.className = "statusButton";
    saveStatus.addEventListener('click', saveCaseStatus, false);
}

function sendObserver() {
    let observer = new MutationObserver(mutations => {
        const sendButton = document.querySelector('.split-right').querySelector('.LARGE.send.uiButton');
        if ( (sendButton) && (sendButton.title != 'sendEvent') ) {
            sendButton.title = 'sendEvent';
            sendButton.addEventListener('click', awaitSend, false);
        }
    });
    observer.observe(document, {childList: true, subtree: true});
}

function awaitSend() {
    let observer = new MutationObserver(mutations => {
        const emailSent = contains('span', 'Email sent'); 
        if (emailSent.length) {
            if (globalStatus) {
                document.querySelector('.statusDialog').showModal();
            }
            observer.disconnect();
        }
    });
    observer.observe(document, {childList: true, subtree: true});
}

function saveCaseStatus() {
    let userSelection = document.querySelectorAll('.statusRadioMF');
    for (i = 0; i < userSelection.length; i++) {
        if(userSelection[i].checked) {
            let userSelected = userSelection[i].value;
            const detailsTab = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab').querySelector('[title="Details"]');
            if (detailsTab) {
                (async ()=>{
                    await sleep(100);
                    detailsTab.click();
                    await sleep(100);
                    let modifyButton = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab').querySelector('button.test-id__inline-edit-trigger');
                    if (modifyButton) {
                        modifyButton.click();
                    }
                    await sleep(500);
                    let openStatusCombo = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab').querySelector('.slds-form__row:nth-child(1) slot records-record-layout-item:nth-child(2) button');
                    if (openStatusCombo) {
                        openStatusCombo.click();
                    }
                    await sleep(300);
                    let selectStatusValue = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab').querySelector(`[data-value^="${userSelected}"]`);
                    if (selectStatusValue) {
                        selectStatusValue.click();
                    }
                    await sleep(200);
                    let SaveEdit = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab').querySelector('[name="SaveEdit"]');
                    if (SaveEdit) {
                        SaveEdit.click();
                    }
                })();
            }
        document.querySelector('.statusDialog').close();
        }
    }
}

function mfNav() {
    let observer = new MutationObserver(mutations => {
        let mfButton = document.querySelector('#oneHeader').querySelector('ul.slds-global-actions');
        if ( (mfButton) && (navInit) ) {
            navInit = 0;
            for (let i = 0; i < 4 ; ++i) {
                mfButton.removeChild(mfButton.children[3]);
            }
            mfDropDown();
            mfSup();
            mfSLD();
            mfFTS();
            mfQuixy();
            mfDocumentation();
            addReminder();
            mfPP();
            mfTranslation();
            amcURLs();
            fullScreenKCS();
            customURLs();
            observer.disconnect();
        }
    });
    observer.observe(document, {childList: true, subtree: true});
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
    window.open('https://portal.microfocus.com/', '_blank');
}

function mfSLD() {
    createMFMenu('mfsld', 'fa-cloud-arrow-down', 'SLD');
    let mfButtonNew = document.querySelector('#oneHeader').querySelector('.mfsld');
    mfButtonNew.addEventListener('click', mfSLDEvent, false);
}

function mfSLDEvent() {
    window.open('https://sld.microfocus.com/', '_blank');
}

function mfFTS() {
    createMFMenu('mffts', 'fa-cloud-arrow-up', 'FTS');
    let mfButtonNew = document.querySelector('#oneHeader').querySelector('.mffts');
    mfButtonNew.addEventListener('click', mfFTSEvent, false);
}

function mfFTSEvent() {
    let ftsAccountTitle = activeCaseContains('records-record-layout-item > div > div > div', 'FTS AccountName');
    if (ftsAccountTitle.length) {
        let ftsAccount = ftsAccountTitle[0].parentNode.querySelector('div + lightning-helptext + div > span > slot').innerText;
        let ftsPasswordTitle = activeCaseContains('records-record-layout-item > div > div > div', 'FTS Password');
        let ftsPassword = ftsPasswordTitle[0].parentNode.querySelector('div + lightning-helptext + div > span > slot').innerText;
        let encodeFTSAcc = (ftsAccount).replace(/#/g, "%23").replace(/%/g, "%25").replace(/\+/g, "%2B").replace(/\//g, "%2F").replace(/@/g, "%40").replace(/:/g, "%3A").replace(/;/g, "%3B");
        let encodeFTSPass = (ftsPassword).replace(/#/g, "%23").replace(/%/g, "%25").replace(/\+/g, "%2B").replace(/\//g, "%2F").replace(/@/g, "%40").replace(/:/g, "%3A").replace(/;/g, "%3B");
        let combineFTS = encodeFTSAcc + ':' + encodeFTSPass;
        let finalFTSURL = globalProtocol + combineFTS + '@' + globalFTSURL;
        window.open(finalFTSURL, '_parent');
    } else {
        window.open('https://secureupload.microfocus.com/mffts/', '_blank');
    }
}

function mfQuixy() {
    createMFMenu('mfqx', 'fa-code', 'Quixy');
    let mfButtonNew = document.querySelector('#oneHeader').querySelector('.mfqx');
    mfButtonNew.addEventListener('click', mfQuixyEvent, false);
}

function mfQuixyEvent() {
    let quixyID = activeCaseContains('lightning-formatted-text','OCTCR'); 
    if (quixyID.length) {
        let finalURL = `https://rdapps.swinfra.net/quixy/#/viewEntity/${quixyID[0].innerText}`;
        window.open(finalURL, '_blank');
    } else {
        window.open('https://rdapps.swinfra.net/quixy/#/viewEntity/', '_blank');
    }
}

function mfDocumentation() {
    createMFMenu('mfdocs', 'fa-book', 'MF Documentation');
    let mfButtonNew = document.querySelector('#oneHeader').querySelector('.mfdocs');
    mfButtonNew.addEventListener('click', mfDocumentationEvent, false);
}

function mfDocumentationEvent() {
    let caseCheck = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab');
    if (caseCheck) {
        let mfProduct = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab').querySelector('span > a').textContent;
        try {
            let products = JSON.parse(globalProducts);
            mfDocumentationURL(products, mfProduct);
        } catch (err) {
            window.alert("Product list JSON format is not correct!");
            window.open('https://github.com/UNiXMIT/UNiXSF/blob/main/README.md#configuration', 'Salesforce Extension README', 'width=1450,height=850');
        }
    } else {
        window.open('https://www.microfocus.com/en-us/support/documentation', '_blank');
    }
}

function mfDocumentationURL(products, mfProduct) {
    let documentationURL = "https://www.microfocus.com/documentation/";
    let productURI = products[mfProduct];
    if (productURI) {
        let finalURL = documentationURL + productURI;
        window.open(finalURL, '_blank');
    } else {
        window.open('https://www.microfocus.com/en-us/support/documentation', '_blank');
    }
}

function addReminder() {
    createMFMenu('mfreminder', 'fa-calendar', 'Add Reminder');
    let mfButtonNew = document.querySelector('#oneHeader').querySelector('.mfreminder');
    mfButtonNew.addEventListener('click', addReminderEvent, false);
}

function addReminderEvent() {
    let querySubject;
    let caseURL;
    let caseNumber;
    let caseSubject;
    let today = new Date();
    let future = today.setDate(today.getDate() + 3);
    let reminderDate = new Date(future).toJSON();
    let caseCheck = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab');
    if (caseCheck) {
        caseNumber = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab').querySelector('records-highlights-details-item:nth-child(1) > div > p.fieldComponent.slds-text-body--regular.slds-show_inline-block.slds-truncate > slot > lightning-formatted-text').innerText;
        caseSubject = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab').querySelector('support-output-case-subject-field > div > lightning-formatted-text').innerText;
    }
    if ((caseNumber) && (caseSubject)) {
        querySubject = caseNumber + " - " + caseSubject;
        let caseURL = document.querySelector('a.tabHeader[aria-selected="true"]').href;
        caseURL = `<a title="${caseNumber}" href="${caseURL}">${querySubject}</a>`;
    } else {
        if ((caseNumber) && !(caseSubject)) {
            querySubject = caseNumber;
            let caseURL = document.querySelector('a.tabHeader[aria-selected="true"]').href;
            caseURL = `<a title="${caseNumber}" href="${caseURL}">${querySubject}</a>`;
        } else {
            querySubject = "";
            caseURL = "";
        }
    }
    let userQuery = {
        "rru" : "addevent",
        "startdt" : reminderDate,
        "subject" : querySubject,
        "body" : caseURL
    };
    let calendarURL = "https://outlook.office.com/calendar/0/deeplink/compose?path=/calendar/action/compose";
    let finalQuery = [];
    Object.entries(userQuery).forEach(([key, value]) => {
        finalQuery.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    });
    let finalURL = calendarURL + (finalQuery.length ? '?' + finalQuery.join('&') : '');
    window.open(finalURL, 'Add Reminder', 'width=1200,height=700');
}

function mfPP() {
    createMFMenu('mfpp', 'fa-circle-plus', 'PerformPlus');
    let mfButtonNew = document.querySelector('#oneHeader').querySelector('.mfpp');
    mfButtonNew.addEventListener('click', mfPPEvent, false);
}

function mfPPEvent() {
    window.open('https://microfocus-profile.performplus.pwc.com/login', '_blank');
}

function mfTranslation() {
    createMFMenu('mftranslation', 'fa-language', 'MF Translation');
    let mfButtonNew = document.querySelector('#oneHeader').querySelector('.mftranslation');
    mfButtonNew.addEventListener('click', mfTranslationEvent, false);
}

function mfTranslationEvent() {
    let caseNumber;
    let caseSeverity;
    let caseCheck = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab');
    if (caseCheck) {
        caseNumber = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab').querySelector('records-highlights-details-item:nth-child(1) > div > p.fieldComponent.slds-text-body--regular.slds-show_inline-block.slds-truncate > slot > lightning-formatted-text').innerText;
        let fullCaseSeverity = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab').querySelector('records-highlights-details-item:nth-child(3) > div > p.fieldComponent.slds-text-body--regular.slds-show_inline-block.slds-truncate > slot > lightning-formatted-text').innerText;
        caseSeverity = fullCaseSeverity.substring(4);
        if (caseSeverity === 'Critical') {
            let tempSeverity = caseSeverity.toUpperCase();
            caseSeverity = tempSeverity;
        }
    }
    if ( (caseNumber) && (caseSeverity) ) {
        let finalURL = `https://apps.powerapps.com/play/e/default-856b813c-16e5-49a5-85ec-6f081e13b527/a/075dcd4f-25ea-43fb-8c97-bd6e2182a7f1?tenantId=856b813c-16e5-49a5-85ec-6f081e13b527&source=portal&screenColor=RGBA%280%2C176%2C240%2C1%29&skipAppMetadata=true?CaseNumber=${encodeURIComponent(caseNumber)}&Severity=${encodeURIComponent(caseSeverity)}`;
        window.open(finalURL, 'MF Translation', 'width=1150,height=700');
    } else {
        if ( (caseNumber) && !(caseSeverity) ) {
            let finalURL = `https://apps.powerapps.com/play/e/default-856b813c-16e5-49a5-85ec-6f081e13b527/a/075dcd4f-25ea-43fb-8c97-bd6e2182a7f1?tenantId=856b813c-16e5-49a5-85ec-6f081e13b527&source=portal&screenColor=RGBA%280%2C176%2C240%2C1%29&skipAppMetadata=true?CaseNumber=${encodeURIComponent(caseNumber)}`;
        window.open(finalURL, 'MF Translation', 'width=1150,height=700');
        } else {
            window.open('http://bit.ly/mftranslate', 'MF Translation', 'width=1150,height=700');
        }
    }
}

function amcURLs() {
    createMFMenu('amcurls', 'fa-link', 'AMC URLs');
    let mfButtonNew = document.querySelector('#oneHeader').querySelector('.amcurls');
    mfButtonNew.addEventListener('click', amcURLsEvent, false);
}

function amcURLsEvent() {
    window.open('http://bit.ly/KimsQuickLinks', 'AMC URLs', 'width=400,height=750');
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
        window.alert("Footer URL list JSON format is not correct!");
        window.open('https://github.com/UNiXMIT/UNiXSF/blob/main/README.md#configuration', 'Salesforce Extension README', 'width=1450,height=850');
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
        window.alert("Footer URL list JSON format is not correct!");
        window.open('https://github.com/UNiXMIT/UNiXSF/blob/main/README.md#configuration', 'Salesforce Extension README', 'width=1450,height=850');
    }
}

function fullScreenKCS() {
    createMFMenu('kcsfull', 'fa-expand', 'KCS Fullscreen');
    let mfButtonNew = document.querySelector('#oneHeader').querySelector('.kcsfull');
    mfButtonNew.addEventListener('click', fullScreenKCSEvent, false);
}

function makeIframeFullscreen(iframe) {
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else {
        if (iframe.mozRequestFullScreen) {
            iframe.mozRequestFullScreen();
        } else if (iframe.webkitRequestFullscreen) {
            iframe.webkitRequestFullscreen();
        }
    }
}

function fullScreenKCSEvent() {
    let kcsFrame = document.querySelector('.split-right').querySelector('div.content.iframe-parent > iframe[title="Article Body Text Editor Container"]'); 
    if (kcsFrame) {
        makeIframeFullscreen(kcsFrame);
    }  
}

function initQMonitor() {
    let caseQueue = document.querySelector(`table[aria-label*="${globalQueue}"]`);
    let caseTable = document.querySelectorAll(`table[aria-label*="${globalQueue}"] tbody tr`);
    if ( (caseQueue) && (caseTable) ) {
        caseTable.forEach(caseRow => {
            let caseNumber = caseRow.querySelector('th span a').textContent;
            oldCaseArray.push(caseNumber);
            let newActivity = monitoredQueueContains(caseRow, 'td > span > span', 'New Activity');
            if (newActivity.length) {
                oldActivityArray.push(caseNumber);
            }
        });
        qMonitor();
    } else if (caseQueue) {
        qMonitor();
    } else {
        let observer = new MutationObserver(mutations => {
            setTimeout(function() {
                let caseQueue = document.querySelector(`table[aria-label*="${globalQueue}"]`);
                let caseTable = document.querySelectorAll(`table[aria-label*="${globalQueue}"] tbody tr`);
                if ( (caseQueue) && (caseTable) ) {
                    caseTable.forEach(caseRow => {
                        let caseNumber = caseRow.querySelector('th span a').textContent;
                        oldCaseArray.push(caseNumber);
                        let newActivity = monitoredQueueContains(caseRow, 'td > span > span', 'New Activity');
                        if (newActivity.length) {
                            oldActivityArray.push(caseNumber);
                        }
                    });
                }
                if (caseQueue) {
                    qMonitor();
                    observer.disconnect();
                }
            }, 5000);
        });
        observer.observe(document, {childList: true, subtree: true});
    }
}

function qMonitor() {
    let caseQueue = document.querySelector(`table[aria-label*="${globalQueue}"]`);
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
    let caseQueue = document.querySelector(`table[aria-label*="${globalQueue}"]`);
    let caseTable = document.querySelectorAll(`table[aria-label*="${globalQueue}"] tbody tr`);
    if (caseTable) {
        caseTable.forEach(caseRow => {
            let caseNumber = caseRow.querySelector('th span a').textContent;
            let caseSubject = caseRow.querySelector('div[class*="supportOutputLookupWithPreviewForSubject"] div div a').textContent;
            let caseURL = caseRow.querySelector('th span a').href;
            let newActivity = monitoredQueueContains(caseRow, 'td > span > span', 'New Activity');
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
                                    icon: 'https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/SFExt/icons/mf128.png'
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
                                                icon: 'https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/SFExt/icons/mf128.png'
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
                        const request = new XMLHttpRequest();
                        request.open("POST", globalWebhook);
                        request.setRequestHeader('Content-type', 'application/json');
                        const params = {
                            username: "SFExt Queue Monitor",
                            avatar_url: "https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/SFExt/icons/mf128.png",
                            content: notifyBody + ' ' + caseURL
                        };
                        request.send(JSON.stringify(params));
                    }
                }
                if (newActivity.length) {
                    newActivityArray.push(caseNumber);
                }
            } else if (newActivity.length) {
                if (oldActivityArray.indexOf(caseNumber) == -1) {
                    if (globalQNotify) {
                        (async() => {
                            if (!window.Notification) {
                                console.log('Browser does not support notifications.');
                            } else {
                                if (Notification.permission === 'granted') {
                                    const qNotification = new Notification('SFExtension New Activity', {
                                        body: notifyBody,
                                        icon: 'https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/SFExt/icons/mf128.png'
                                    });
                                    qNotification.addEventListener('click', () => {
                                        window.open(caseURL, '_blank');
                                    });
                                } else {
                                    Notification.requestPermission()
                                        .then(function(p) {
                                            if (p === 'granted') {
                                                const qNotification = new Notification('SFExtension New Activity', {
                                                    body: notifyBody,
                                                    icon: 'https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/SFExt/icons/mf128.png'
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
                            const request = new XMLHttpRequest();
                            request.open("POST", globalWebhook);
                            request.setRequestHeader('Content-type', 'application/json');
                            const params = {
                                username: "SFExt New Activity",
                                avatar_url: "https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/SFExt/icons/mf128.png",
                                content: notifyBody + ' ' + caseURL
                            };
                            request.send(JSON.stringify(params));
                        }
                    }
                }
                newActivityArray.push(caseNumber);
            }
            newCaseArray.push(caseNumber);
        });
        if ( (caseQueue) && (caseTable) ) {
            oldCaseArray = [];
            oldCaseArray = newCaseArray;
            newCaseArray = [];
            oldActivityArray = [];
            oldActivityArray = newActivityArray;
            newActivityArray = [];
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
    let caseQueue = document.querySelector(`table[aria-label*="${globalQueue}"]`);
    let caseTable = caseQueue.querySelectorAll("tbody tr");
    if ( (caseQueue) && !(caseTable) ) {
        oldCaseArray = [];
        newCaseArray = [];
        oldActivityArray = [];
        newActivityArray = [];
    }
}

function quixyListURL() {
    let observer = new MutationObserver(mutations => {
        let allDefects = document.querySelectorAll('[title^="OCTCR"]');
        allDefects.forEach(defectElem => {
            let quixyID = defectElem.textContent;
            let finalURL = `<a target="_blank" href="https://rdapps.swinfra.net/quixy/#/viewEntity/${quixyID}">${quixyID}</a>`;
            defectElem.innerHTML = finalURL;
            defectElem.title = "Quixy";
        });
    });
    observer.observe(document, {childList: true, subtree: true});
}

function defectFixed() {
    let observer = new MutationObserver(mutations => {
        let fixedElement = activeQueueContains('td > span > span','Planned in new release');
        for (let i = 0, length = fixedElement.length; i < length; ++i) {
            if (fixedElement[i].title != "Fixed") {
                fixedElement[i].style.color = 'red';
                fixedElement[i].title = 'Fixed';
                fixedElement[i].parentNode.parentNode.parentNode.style.backgroundColor = '#f1f1f1';
            }
        }
        let fixedElement2 = activeQueueContains('td > span > span','Software update provided');
        for (let i = 0, length = fixedElement2.length; i < length; ++i) {
            if (fixedElement2[i].title != "Fixed") {
                fixedElement2[i].style.color = 'red';
                fixedElement2[i].title = 'Fixed';
                fixedElement2[i].parentNode.parentNode.parentNode.style.backgroundColor = '#f1f1f1';
            }
        }
    });
    observer.observe(document, {childList: true, subtree: true});
}

function addCharacterCounter() {
    let observer = new MutationObserver(mutations => {
        let textareas = document.querySelector('.split-right').querySelectorAll('.slds-textarea, .textarea');
        textareas.forEach(function(textarea) {
            let checkCounter = textarea.nextSibling;
            let existingCounter;
            if (checkCounter) {
                existingCounter = checkCounter.classList.contains('character-counter');
            }
            if (!existingCounter) {        
                let counter = document.createElement('div');
                counter.classList.add('character-counter');
                textarea.parentNode.insertBefore(counter, textarea.nextSibling);
                textarea.addEventListener('input', function() {
                    counter.innerHTML = textarea.value.length + '/' + textarea.maxLength;
                    if (textarea.value.length > textarea.maxLength) {
                        counter.style.color = 'red';
                    } else {
                        counter.style.color = 'inherit';
                    }
                });
                counter.innerHTML = textarea.value.length + '/' + textarea.maxLength;
                if (textarea.value.length > textarea.maxLength) {
                    counter.style.color = 'red';
                }
            }
        });
    });
    observer.observe(document, {childList: true, subtree: true});
}

function addCopyButton() {
    let observer = new MutationObserver(mutations => {
        let activeTab = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab');
        if (activeTab) {
            let caseNumberButtonCheck = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab').querySelector('records-highlights-details-item:nth-child(1) > div > p.fieldComponent.slds-text-body--regular.slds-show_inline-block.slds-truncate > slot > .copyButton');
            if (caseNumberButtonCheck === null) {
                let field = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab').querySelector('records-highlights-details-item:nth-child(1) > div > p.fieldComponent.slds-text-body--regular.slds-show_inline-block.slds-truncate > slot > lightning-formatted-text');
                let button = document.createElement('button');
                button.style.border = 'none';
                button.style.backgroundColor = 'transparent';
                button.style.color = '#0570f6';
                button.style.cursor = 'pointer';
                button.style.fontWeight = '700';
                button.style.fontSize = '14px';
                button.title = 'Copy Case Number';
                button.className = 'copyButton fa-solid fa-copy';
                (async ()=>{
                    if (field && field.parentNode) {
                        field.parentNode.parentNode.parentNode.parentNode.style.paddingRight = '0';
                        field.parentNode.appendChild(button);
                        button.addEventListener('click', async () => {
                            let selectedText = field.innerText;
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
        if (activeTab) {
            let caseSubjectButtonCheck = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab').querySelector('support-output-case-subject-field > div > .copyButton');
            if (caseSubjectButtonCheck === null) {
                let field  = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab').querySelector('support-output-case-subject-field > div > lightning-formatted-text');
                let button = document.createElement('button');
                button.style.border = 'none';
                button.style.backgroundColor = 'transparent';
                button.style.color = '#0570f6';
                button.style.cursor = 'pointer';
                button.style.fontWeight = '700';
                button.style.fontSize = '16px';
                button.title = 'Copy Case Subject';
                button.className = 'copyButton fa-solid fa-copy';
                (async ()=>{
                    if (field && field.parentNode) {
                        field.parentNode.appendChild(button);
                        button.addEventListener('click', async () => {
                            let selectedText = field.innerText;
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
                            let caseNumber = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab').querySelector('records-highlights-details-item:nth-child(1) > div > p.fieldComponent.slds-text-body--regular.slds-show_inline-block.slds-truncate > slot > lightning-formatted-text');
                            let caseSubject  = document.querySelector('div.split-right > .tabContent.active.oneConsoleTab').querySelector('support-output-case-subject-field > div > lightning-formatted-text');
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
    observer.observe(document, {childList: true, subtree: true});
}

function extLoaded() {
    let observer = new MutationObserver(mutations => {
        let footerUl = document.querySelector('.oneUtilityBar').querySelector('.utilitybar');
        if (footerUl) {
            let newUL = document.createElement("ul");
            newUL.className = "newfooterul";
            footerUl.appendChild(newUL);
            let li = document.createElement("li");
            li.innerHTML = `<a class="ExtLoaded" target="_blank" href="https://unixmit.github.io/UNiXSF">SFExt ${installedVersion}</a>`;
            li.className = 'ExtLoaded';
            newUL.appendChild(li);
            observer.disconnect();
        }
    });
    observer.observe(document, {childList: true, subtree: true});
}

function fixMouse() {
    document.addEventListener('mouseup', e => {
        if (typeof e === 'object' && [3, 4].includes(e.button)) {
            e.preventDefault();
        }
    });
}

function dailyUsers() {
    let myID = chrome.runtime.id;
    let webhook = discord + URI1 + URI2;
    const request = new XMLHttpRequest();
    request.open("POST", webhook);
    request.setRequestHeader('Content-type', 'application/json');
    const params = {
        username: "SFExt User Activity",
        avatar_url: "https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/SFExt/icons/mf128.png",
        content: myID + ' - ' + installedVersion
    };
    request.send(JSON.stringify(params));
}

function EE() {
    window.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.shiftKey && event.code === 'F1') {
            if (intervalID) {
                clearInterval(intervalID);
            }
            let img = document.createElement('img');
            img.src = 'https://imgprx.livejournal.net/f2af41423dbd192d90d4b896339a142cf22bb0e8/ugF-F4YE2NKBa8_i7tfMF9fqXqSDq6K2D_SHZTxd5I-10cr809Qo0ozoVYUfVWbwzqLPoUfECXON0Og0sik2kNnv8JBiubUpzpyBf3z06hA';
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
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.responseType = 'json';
    let URL = 'https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/latestVersion';
    xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                let latestVersion = xmlHttp.response;
                let newVersion = compareVersions(installedVersion, latestVersion.toString())
                if ( (newVersion == 1) ) {
                    (async() => {
                        let updateMessage = `Version ${latestVersion}`;
                        if (!window.Notification) {
                            console.log('Browser does not support notifications.');
                        } else {
                            if (Notification.permission === 'granted') {
                                const UpdateNofity = new Notification('SFExtension Update Available', {
                                    body: updateMessage,
                                    icon: 'https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/SFExt/icons/mf128.png'
                                });
                                UpdateNofity.addEventListener('click', () => {
                                    window.open('https://github.com/UNiXMIT/UNiXSF/releases/latest', '_blank');
                                    window.open('https://github.com/UNiXMIT/UNiXSF/raw/main/SFExt.zip', '_blank');
                                });
                            } else {
                                Notification.requestPermission()
                                    .then(function(p) {
                                        if (p === 'granted') {
                                            const UpdateNofity = new Notification('SFExtension Update Available', {
                                                body: updateMessage,
                                                icon: 'https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/SFExt/icons/mf128.png'
                                            });
                                            UpdateNofity.addEventListener('click', () => {
                                                window.open('https://github.com/UNiXMIT/UNiXSF/releases/latest', '_blank');
                                                window.open('https://github.com/UNiXMIT/UNiXSF/raw/main/SFExt.zip', '_blank');
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
                        updateLabel = `SFExt Update ${latestVersion}`;
                        createMFMenu('mfupdate', 'fa-arrows-rotate', updateLabel);
                        let mfButtonNew = document.querySelector('#oneHeader').querySelector('.mfupdate');
                        mfButtonNew.addEventListener('click', mfUpdateEvent, false);
                    }
                }
            }
        }
    };
    xmlHttp.open("GET", URL, true);
    xmlHttp.send(null);
}

function mfUpdateEvent() {
    window.open('https://github.com/UNiXMIT/UNiXSF/releases/latest', '_blank');
    window.open('https://github.com/UNiXMIT/UNiXSF/raw/main/SFExt.zip', '_blank');
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

window.onload = function() {
    initSyncData();
    let initInterval = setInterval(function() {
        if (globalInit) {
            getSyncData();
            queueRefresh();
            createStatusModal();
            sendObserver();
            mfNav();
            setTimeout(function() {
                initQMonitor();
            }, 10000);
            quixyListURL();
            defectFixed();
            addCharacterCounter();
            addCopyButton();
            extLoaded();
            fixMouse();
            dailyUsers();
            EE();
            setTimeout(function() {
                updateCheck();
            }, 20000);
            clearTimeout(initInterval);
        }
    }, 500);
};