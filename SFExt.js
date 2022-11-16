const installedVersion = "2.5";
let globalInit = 0;
let globalTimeout;
let globalProducts;
let globalQueue;
let globalQNotify;
let globalQNotifyWeb;
let globalWebhook;
let globalProtocol;
let globalFTSURL;
let globalURLS;
let intervalID;
let qObserver;
let oldArray = [];
let newArray = [];

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
        savedURLS: '{"SFExt":"https://unixmit.github.io/UNiXSF"}'
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
                savedURLS: '{"SFExt":"https://unixmit.github.io/UNiXSF"}'
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
                    oldArray = [];
                    newArray = [];
                    initQMonitor();
                }
                globalQNotify = result.savedQNotify;
                globalQNotifyWeb = result.savedQNotifyWeb;
                globalWebhook = result.savedWebhook;
                globalProtocol = result.savedProtocol;
                globalFTSURL = result.savedFTSURL;
                if (globalURLS != result.savedURLS) {
                    globalURLS = result.savedURLS;
                    updateFooter();
                }
            });
        }
    });
}

function mfLogo() {
    let observer = new MutationObserver(mutations => {
        let sfLogo = document.querySelector('.slds-global-header__logo');
        if (sfLogo) {
            sfLogo.style.backgroundImage = 'url(data:image/png;base64,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)';
            observer.disconnect();
        }
    });
    observer.observe(document, {childList: true, subtree: true});
}

function modifyHead() {
    let link = document.createElement('link');
    link.rel = "stylesheet" 
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css";
    document.getElementsByTagName('head')[0].appendChild(link);
    // let linkBS = document.createElement('link');
    // linkBS.rel = "stylesheet";
    // linkBS.href = "https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css";
    // document.getElementsByTagName('head')[0].appendChild(linkBS);
    // let script1 = document.createElement('script');
    // script1.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js";
    // document.getElementsByTagName('head')[0].appendChild(script1);
    // let script2 = document.createElement('script');
    // script2.src = "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js";
    // document.getElementsByTagName('head')[0].appendChild(script2);
    // let script3 = document.createElement('script');
    // script3.src = "https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js";
    // document.getElementsByTagName('head')[0].appendChild(script3);
}

function mfCSS() {
    let style = document.createElement('style');
    style.innerHTML = '.mfbutton{color:#919191;cursor:pointer;margin-left:10px} .mfbutton:hover{-webkit-filter:brightness(70%);-webkit-filter:brightness(70%)} a.ExtLoaded{text-decoration:none;color:black} a.ExtLoaded:hover{color:red} .slds-global-header__item_search, .slds-global-header__item--search{margin-left:300px}';
    document.getElementsByTagName('head')[0].appendChild(style);
}

function queueRefresh() {
    if (globalTimeout >= 30) {
        refreshInterval = globalTimeout * 1000;
        intervalID = setInterval(function() {
            document.querySelector('#split-left').querySelector('button[name="refreshButton"]').click();
        }, refreshInterval);
    }
}

// Font Awesome Icons // Colour #919191 // Size 30px

// data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE2SURBVEhLYxhxgBFKYwXd3d3r/v//rw3lUgz+/v37+/79+06zZs16hdfiiRMnngdSBhAe5QBk8bNnzxR7enqeMkHF6A5GnsXwOAYlJDY2NkUoFwx+/vx5ARgvp6BckgAwUUpyc3PXQrlggBzHLFAxkEJQ6lWD8CAAqHBWZWXldCiXJFBVVaWHbjEyGE1cdAOjFtMNjFpMD/AfRAyExeBiejSo6QHAQQ2vFru6um6ys7Oj1E7fvn3L4eLimgHlkgRevXqlKyYmBmo6wQFytYjXYmBV+YaRkfETlEsqYAbiUiD+DOYBwb9///6+fPnyYEdHxy+8FlMIfgOxeH5+/nsIFxWMqFQNBnCLQRFPbQw0Fpx1sAF4HKelpYnx8fGxQrmkApAFMLNg7P+ysrLPgXGM0/IBAAwMAN24yCYX5z+oAAAAAElFTkSuQmCC

function mfNav() {
    let observer = new MutationObserver(mutations => {
        let clearButton1 = document.querySelector('#oneHeader').querySelector('.trailheadTrigger');
        let clearButton2 = document.querySelector('#oneHeader').querySelector('.oneHelpAndTrainingExperience');
        let mfNavBar = document.querySelector('#oneHeader');
        let createNAV = 0;
        if (clearButton1) {
            clearButton1.parentNode.removeChild(clearButton1);
            createNAV = createNAV + 1;
        }
        if (clearButton2) {
            clearButton2.parentNode.removeChild(clearButton2);
            createNAV = createNAV + 1;
        }
        if (mfNavBar && createNAV === 2) {
            mfSup();
            mfSLD();
            mfFTS();
            mfQuixy();
            mfDocumentation();
            addReminder();
            mfPP();
            mfTranslation();
            amcURLs();
            observer.disconnect();
        }
    });
    observer.observe(document, {childList: true, subtree: true});
}

function mfSup() {
    let mfButton = document.querySelector('#oneHeader').querySelector('.slds-global-actions');
    let li = document.createElement("li");
    li.innerHTML = '<i class="fa-solid fa-headset fa-xl"></i>';
    li.setAttribute('class', 'mfbutton mfsup');
    mfButton.insertBefore(li, mfButton.children[4]);
    let mfButtonNew = document.querySelector('#oneHeader').querySelector('.mfsup');
    mfButtonNew.addEventListener('click', mfSupEvent, false);
}

function mfSupEvent() {
    window.open('https://portal.microfocus.com/', '_blank');
}

function mfSLD() {
    let mfButton = document.querySelector('#oneHeader').querySelector('.slds-global-actions');
    let li = document.createElement("li");
    li.innerHTML = '<i class="fa-solid fa-cloud-arrow-down fa-xl"></i>';
    li.setAttribute('class', 'mfbutton mfsld');
    mfButton.insertBefore(li, mfButton.children[5]);
    let mfButtonNew = document.querySelector('#oneHeader').querySelector('.mfsld');
    mfButtonNew.addEventListener('click', mfSLDEvent, false);
}

function mfSLDEvent() {
    window.open('https://sld.microfocus.com/', '_blank');
}

function mfFTS() {
    let mfButton = document.querySelector('#oneHeader').querySelector('.slds-global-actions');
    let li = document.createElement("li");
    li.innerHTML = '<i class="fa-solid fa-cloud-arrow-up fa-xl"></i>';
    li.setAttribute('class', 'mfbutton mffts');
    mfButton.insertBefore(li, mfButton.children[6]);
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
    let mfButton = document.querySelector('#oneHeader').querySelector('.slds-global-actions');
    let li = document.createElement("li");
    li.innerHTML = '<i class="fa-solid fa-code fa-xl"></i>';
    li.setAttribute('class', 'mfbutton mfqx');
    mfButton.insertBefore(li, mfButton.children[7]);
    let mfButtonNew = document.querySelector('#oneHeader').querySelector('.mfqx');
    mfButtonNew.addEventListener('click', mfQuixyEvent, false);
}

function mfQuixyEvent() {
    let quixyID = activeCaseContains('lightning-formatted-text','OCTCR'); 
    if (quixyID.length) {
        let finalURL = 'https://rdapps.swinfra.net/quixy/#/viewEntity/' + quixyID[0].innerText;
        window.open(finalURL, '_blank');
    } else {
        window.open('https://rdapps.swinfra.net/quixy/#/viewEntity/', '_blank');
    }
}

function mfDocumentation() {
    let mfButton = document.querySelector('#oneHeader').querySelector('.slds-global-actions');
    let li = document.createElement("li");
    li.innerHTML = '<i class="fa-solid fa-book fa-xl"></i>';
    li.setAttribute('class', 'mfbutton mfdocs');
    mfButton.insertBefore(li, mfButton.children[8]);
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
    let mfButton = document.querySelector('#oneHeader').querySelector('.slds-global-actions');    
    let li = document.createElement("li");
    li.innerHTML = '<i class="fa-solid fa-calendar fa-xl"></i>';
    li.setAttribute('class', 'mfbutton mfreminder');
    mfButton.insertBefore(li, mfButton.children[9]);
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
        caseURL = "<a title='" + caseNumber + "'href='" + document.querySelector('a.tabHeader[aria-selected="true"]').href + "'>" + caseNumber + " - " + caseSubject + "</a>";
    } else {
        if ((caseNumber) && !(caseSubject)) {
            querySubject = caseNumber;
            caseURL = "<a title='" + caseNumber + "'href='" + document.querySelector('a.tabHeader[aria-selected="true"]').href + "'>" + caseNumber + "</a>";
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
    let mfButton = document.querySelector('#oneHeader').querySelector('.slds-global-actions');
    let li = document.createElement("li");
    li.innerHTML = '<i class="fa-solid fa-circle-plus fa-xl"></i>';
    li.setAttribute('class', 'mfbutton mfpp');
    mfButton.insertBefore(li, mfButton.children[10]);
    let mfButtonNew = document.querySelector('#oneHeader').querySelector('.mfpp');
    mfButtonNew.addEventListener('click', mfPPEvent, false);
}

function mfPPEvent() {
    window.open('https://microfocus-profile.performplus.pwc.com/login', '_blank');
}

function mfTranslation() {
    let mfButton = document.querySelector('#oneHeader').querySelector('.slds-global-actions');
    let li = document.createElement("li");
    li.innerHTML = '<i class="fa-solid fa-language fa-xl"></i>';
    li.setAttribute('class', 'mfbutton mftranslation');
    mfButton.insertBefore(li, mfButton.children[11]);
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
        let finalURL = 'https://apps.powerapps.com/play/e/default-856b813c-16e5-49a5-85ec-6f081e13b527/a/075dcd4f-25ea-43fb-8c97-bd6e2182a7f1?tenantId=856b813c-16e5-49a5-85ec-6f081e13b527&source=portal&screenColor=RGBA%280%2C176%2C240%2C1%29&skipAppMetadata=true?CaseNumber=' + encodeURIComponent(caseNumber) + '&Severity=' + encodeURIComponent(caseSeverity);
        window.open(finalURL, 'MF Translation', 'width=1150,height=700');
    } else {
        if ( (caseNumber) && !(caseSeverity) ) {
            let finalURL = 'https://apps.powerapps.com/play/e/default-856b813c-16e5-49a5-85ec-6f081e13b527/a/075dcd4f-25ea-43fb-8c97-bd6e2182a7f1?tenantId=856b813c-16e5-49a5-85ec-6f081e13b527&source=portal&screenColor=RGBA%280%2C176%2C240%2C1%29&skipAppMetadata=true?CaseNumber=' + encodeURIComponent(caseNumber);
        window.open(finalURL, 'MF Translation', 'width=1150,height=700');
        } else {
            window.open('http://bit.ly/mftranslate', 'MF Translation', 'width=1150,height=700');
        }
    }
}

function amcURLs() {
    let mfButton = document.querySelector('#oneHeader').querySelector('.slds-global-actions');
    let li = document.createElement("li");
    li.innerHTML = '<i class="fa-solid fa-link fa-xl"></i>';
    li.setAttribute('class', 'mfbutton amcurls');
    mfButton.insertBefore(li, mfButton.children[12]);
    let mfButtonNew = document.querySelector('#oneHeader').querySelector('.amcurls');
    mfButtonNew.addEventListener('click', amcURLsEvent, false);
}

function amcURLsEvent() {
    window.open('http://bit.ly/KimsQuickLinks', 'AMC URLs', 'width=400,height=750');
}

function initQMonitor() {
    let caseQueue = document.querySelector("table[aria-label*='"+globalQueue+"']");
    if (caseQueue) {
        let caseElement = document.querySelectorAll("table[aria-label*='"+globalQueue+"'] tbody tr th span a");
        if (caseElement) {
            caseElement.forEach(caseNumber => {
                oldArray.push(caseNumber.textContent);
            });
        }
        qMonitor();
    } else {
        let observer = new MutationObserver(mutations => {
            setTimeout(function() {
                let caseElement = document.querySelectorAll("table[aria-label*='"+globalQueue+"'] tbody tr th span a");
                if (caseElement) {
                    caseElement.forEach(caseNumber => {
                        oldArray.push(caseNumber.textContent);
                    });
                }
                caseQueue = document.querySelector("table[aria-label*='"+globalQueue+"']");
                if (caseQueue) {
                    qMonitor();
                    observer.disconnect();
                }
            }, 5000);
        });
        let caseQueue = document.querySelector('.listViewContent');
        observer.observe(caseQueue, {childList: true, subtree: true});
    }
}

function qMonitor() {
    let caseQueue = document.querySelector("table[aria-label*='"+globalQueue+"']");
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
    let caseQueue = document.querySelector("table[aria-label*='"+globalQueue+"']");
    let caseArray = document.querySelectorAll("table[aria-label*='"+globalQueue+"'] tbody tr");
    if (caseArray) {
        caseArray.forEach(caseRow => {
            let caseNumber = caseRow.querySelector('th span a').textContent;
            let caseSubject = caseRow.querySelector('div[class*="supportOutputLookupWithPreviewForSubject"] div div a').textContent;
            let caseURL = caseRow.querySelector('th span a').href;
            let notifyBody;
                if (oldArray.indexOf(caseNumber) == -1) {
                    if ( !(caseSubject) ) {
                        notifyBody = caseNumber;
                    } else {
                        notifyBody = caseNumber + ' - ' + caseSubject;
                    }
                    if (globalQNotify) {
                        (async() => {
                            if (!window.Notification) {
                                console.log('Browser does not support notifications.');
                            } else {
                                if (Notification.permission === 'granted') {
                                    const qNotification = new Notification('SFExtension Queue Monitor', {
                                        body: notifyBody,
                                        icon: 'https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/icons/mf128.png'
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
                                                    icon: 'https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/icons/mf128.png'
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
                                avatar_url: "https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/icons/mf128.png",
                                content: notifyBody + ' ' + caseURL
                            };
                            request.send(JSON.stringify(params));
                        }
                    }
                }
            newArray.push(caseNumber);
        });
        if ( (caseQueue) && (caseArray) ) {
            oldArray = [];
            oldArray = newArray;
            newArray = [];
        }
    } else {
        if ( (caseQueue) && !(caseArray) ) {
            setTimeout(function() {
                emptyCaseArray();
            }, 2000);
        }
    }
}

function emptyCaseArray() {
    let caseQueue = document.querySelector("table[aria-label*='"+globalQueue+"']");
    let caseArray = caseQueue.querySelectorAll("tbody tr");
    if ( (caseQueue) && !(caseArray) ) {
        oldArray = [];
        newArray = [];
    }
}

function quixyListURL() {
    let observer = new MutationObserver(mutations => {
        let allDefects = document.querySelectorAll('[title^="OCTCR"]');
        allDefects.forEach(defectElem => {
            let quixyID = defectElem.textContent;
            let finalURL = '<a target="_blank" href="https://rdapps.swinfra.net/quixy/#/viewEntity/' + quixyID + '">' + quixyID + '</a>';
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
            }
        }
        let fixedElement2 = activeQueueContains('td > span > span','Software update provided');
        for (let i = 0, length = fixedElement2.length; i < length; ++i) {
            if (fixedElement2[i].title != "Fixed") {
                fixedElement2[i].style.color = 'red';
                fixedElement2[i].title = 'Fixed';
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
            newUL.style.float = "right";
            newUL.style.width = "auto";
            newUL.style.display = "flex";
            newUL.style.position = "absolute";
            newUL.style.right = "0";
            footerUl.appendChild(newUL);
            try {
                let URLS = JSON.parse(globalURLS);
                Object.entries(URLS).forEach(([key, value]) => {
                    let li = document.createElement("li");
                    liHTML = '<a class="ExtLoaded" target="_blank" href="' + value + '">' + key + '</a>';
                    li.innerHTML = liHTML;
                    li.className = 'ExtLoaded';
                    li.style.marginTop = '12px';
                    li.style.marginRight = '20px';
                    li.style.fontWeight = 'bold';
                    newUL.appendChild(li);
                });
                observer.disconnect();
            } catch (err) {
                window.alert("Footer URL list JSON format is not correct!");
                window.open('https://github.com/UNiXMIT/UNiXSF/blob/main/README.md#configuration', 'Salesforce Extension README', 'width=1450,height=850');
            }
        }
    });
    observer.observe(document, {childList: true, subtree: true});
}

function updateFooter() {
    let footerUlOld = document.querySelector('.oneUtilityBar').querySelector('.utilitybar').querySelector('.newfooterul');
    if (footerUlOld) {
        footerUlOld.parentNode.removeChild(footerUlOld);
        let footerUl = document.querySelector('.oneUtilityBar').querySelector('.utilitybar');
        let newUL = document.createElement("ul");
        newUL.className = "newfooterul";
        newUL.style.float = "right";
        newUL.style.width = "auto";
        newUL.style.display = "flex";
        newUL.style.position = "absolute";
        newUL.style.right = "0";
        footerUl.appendChild(newUL);
        try {
            let URLS = JSON.parse(globalURLS);
            Object.entries(URLS).forEach(([key, value]) => {
                let li = document.createElement("li");
                liHTML = '<a class="ExtLoaded" target="_blank" href="' + value + '">' + key + '</a>';
                li.innerHTML = liHTML;
                li.className = 'ExtLoaded';
                li.style.marginTop = '12px';
                li.style.marginRight = '20px';
                li.style.fontWeight = 'bold';
                newUL.appendChild(li);
            });
        } catch (err) {
            window.alert("Footer URL list JSON format is not correct!");
            window.open('https://github.com/UNiXMIT/UNiXSF/blob/main/README.md#configuration', 'Salesforce Extension README', 'width=1450,height=850');
        }
    }
}

function updateCheck() {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.responseType = 'json';
    let URL = 'https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/latestVersion';
    xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                let latestVersion = xmlHttp.response;
                if (latestVersion > installedVersion) {
                    (async() => {
                        let updateMessage = 'Version ' + latestVersion;
                        if (!window.Notification) {
                            console.log('Browser does not support notifications.');
                        } else {
                            if (Notification.permission === 'granted') {
                                const UpdateNofity = new Notification('SFExtension Update Available', {
                                    body: updateMessage,
                                    icon: 'https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/icons/mf128.png'
                                });
                                UpdateNofity.addEventListener('click', () => {
                                    window.open('https://github.com/UNiXMIT/UNiXSF/releases/latest', '_blank');
                                });
                            } else {
                                Notification.requestPermission()
                                    .then(function(p) {
                                        if (p === 'granted') {
                                            const UpdateNofity = new Notification('SFExtension Update Available', {
                                                body: updateMessage,
                                                icon: 'https://raw.githubusercontent.com/UNiXMIT/UNiXSF/main/icons/mf128.png'
                                            });
                                            UpdateNofity.addEventListener('click', () => {
                                                window.open('https://github.com/UNiXMIT/UNiXSF/releases/latest', '_blank');
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
                }
            }
        }
    };
    xmlHttp.open("GET", URL, true);
    xmlHttp.send(null);
}

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
            let sfLogo = document.querySelector('.slds-global-header__logo');
            sfLogo.style.display = 'inline-flex';
            // sfLogo.style.backgroundImage = 'url(data:image/png;base64,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)';
            let sfHeader = document.querySelector("#oneHeader > div.slds-global-header.slds-grid.slds-grid--align-spread > div:nth-child(1)");
            sfHeader.innerHTML += '<img src="https://imgprx.livejournal.net/db3a3dee0f308f3eca94e5307dbd9ffd94a1a92c/jXbB8PwXZDR8J37mUM7pLYNXR48JigYrdeighGmo0mFWfXN78lkTM_lSkyRp2vV6kxtL1XHcPaZ4ehYfQ89JGVWfS87KLc-J_mFNhN9WCVs" style=" display: inline-flex; margin: -30px 10px 0 0;padding: 5px;height: 55px;"><img src="https://imgprx.livejournal.net/8a9225add3578974aa1353abeabd15fea3d3422a/jXbB8PwXZDR8J37mUM7pLYNXR48JigYrdeighGmo0mFWfXN78lkTM_lSkyRp2vV6b6M-_0vucmj26UsO3Q6YOoNOTb8u79QRa5ZlrALmI3k" style="display: inline-flex;margin: -30px 0 0 0;padding: 5px;height: 60px;"><img src="https://imgprx.livejournal.net/6cc39e78a15faf97940e6f740c2e976a04ab5aae/jXbB8PwXZDR8J37mUM7pLYNXR48JigYrdeighGmo0mFWfXN78lkTM_lSkyRp2vV67E1UqaqiJm-8RGG9KetQuJS9Mm4D9eSCv0ECCI8GzN0" style="display: inline-flex;margin: -30px 0 0 0;padding: 5px;height: 60px;"><img src="https://imgprx.livejournal.net/e3ad5a52352ea5198eb94df2bf8db2eb4f2bfac9/jXbB8PwXZDR8J37mUM7pLYNXR48JigYrdeighGmo0mFWfXN78lkTM_lSkyRp2vV66FZmZoS9LVtI32HZ5e5PnIzGk0MbFGHJzMoih5Z6PEA" style="display: inline-flex;margin: -30px 0 0 10px;padding: 5px;height: 60px;-webkit-transform: scaleX(-1);transform: scaleX(-1);">';
            // let myDialog = document.createElement("dialog");
            // document.body.appendChild(myDialog);
            // let mydiv = document.createElement("div");
            // mydiv.innerHTML = '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&modestbranding=1" title="RR" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
            // myDialog.appendChild(mydiv);
            // myDialog.showModal();
        }
    });
}

window.onload = function() {
    initSyncData();
    let initInterval = setInterval(function() {
        if (globalInit) {
            getSyncData();
            mfLogo();
            modifyHead();
            mfCSS();
            queueRefresh();
            mfNav();
            setTimeout(function() {
                initQMonitor();
            }, 10000);
            quixyListURL();
            defectFixed();
            extLoaded();
            updateCheck();
            fixMouse();
            EE();
            clearTimeout(initInterval);
        }
    }, 500);
};