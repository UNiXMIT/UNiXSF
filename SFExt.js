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
            sfLogo.style.backgroundImage = 'url(https://www.brand.microfocus.com/s/symbol-text.svg';
            sfLogo.style.backgroundSize = 'auto 40px';
            sfLogo.style.width = '235px';
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
    let style = document.createElement('style');
    style.innerHTML = "@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');"
}

function mfCSS() {
    let style = document.createElement('style');
    style.innerHTML = 'html{font-family:"Roboto",sans-serif;} .mfbutton{color:#919191;cursor:pointer;margin-left:10px} .mfbutton:hover{-webkit-filter:brightness(70%);-webkit-filter:brightness(70%)} a.ExtLoaded{text-decoration:none;color:black} a.ExtLoaded:hover{color:red} .dropbtn {background-color: #fff;width: 25px;height: 25px;border: none;background-image: url("https://www.brand.microfocus.com/s/symbol.svg");background-size: 25px;opacity: 0.5;margin: 0 10px;}.mfdropdown {position: relative;display: inline-block;}ul.mflist {list-style-type: none;}.dropdown-content {right:0; display: none;position: absolute;background-color: #f1f1f1;width: 215px;box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);z-index: 1;}.dropdown-content li {font-family: "Roboto", sans-serif;font-size: 16px;font-weight: 700;color: #505050;padding: 12px 20px;text-decoration: none;margin-left: 0px;cursor: pointer;}.fa-solid {margin-right: 10px;}.dropdown-content li:hover {background-color: #ddd;}.mfdropdown:hover .dropdown-content {display: block;}.mfdropdown:hover .dropbtn {opacity: 0.6;}';
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
            observer.disconnect();
        }
    });
    observer.observe(document, {childList: true, subtree: true});
}

function mfDropDown() {
    let div1 = document.createElement('div');
    div1.setAttribute('class','mfdropdown');
    let button = document.createElement('button');
    button.setAttribute('class','dropbtn');
    let div2 = document.createElement('div');
    div2.setAttribute('class','dropdown-content');
    let ul = document.createElement('ul');
    ul.setAttribute('class','mflist');
    ul.innerHTML = '<li class=mfsup href=#><i class="fa-solid fa-xl fa-headset"></i>Support Portal<li class=mfsld href=#><i class="fa-solid fa-xl fa-cloud-arrow-down"></i>SLD<li class=mffts href=#><i class="fa-solid fa-xl fa-cloud-arrow-up"></i>FTS<li class=mfqx href=#><i class="fa-solid fa-xl fa-code"></i>Quixy<li class=mfdocs href=#><i class="fa-solid fa-xl fa-book"></i>MF Documentation<li class=mfreminder href=#><i class="fa-solid fa-xl fa-calendar"></i>Add Reminder<li class=mfpp href=#><i class="fa-solid fa-xl fa-circle-plus"></i>PerformPlus<li class=mftranslation href=#><i class="fa-solid fa-xl fa-language"></i>MF Translation<li class=amcurls href=#><i class="fa-solid fa-xl fa-link"></i>AMC URLs</li>'
    let mfButton = document.querySelector('#oneHeader').querySelector('.slds-global-actions');
    mfButton.insertBefore(div1, mfButton.children[4]);
    let dropdown = document.querySelector('.mfdropdown');
    dropdown.appendChild(button);
    dropdown.appendChild(div2);
    let dropdownContent = document.querySelector('.dropdown-content');
    dropdownContent.appendChild(ul);
}

function mfSup() {
    let mfButtonNew = document.querySelector('#oneHeader').querySelector('.mfsup');
    mfButtonNew.addEventListener('click', mfSupEvent, false);
}

function mfSupEvent() {
    window.open('https://portal.microfocus.com/', '_blank');
}

function mfSLD() {
    let mfButtonNew = document.querySelector('#oneHeader').querySelector('.mfsld');
    mfButtonNew.addEventListener('click', mfSLDEvent, false);
}

function mfSLDEvent() {
    window.open('https://sld.microfocus.com/', '_blank');
}

function mfFTS() {
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
    let mfButtonNew = document.querySelector('#oneHeader').querySelector('.mfpp');
    mfButtonNew.addEventListener('click', mfPPEvent, false);
}

function mfPPEvent() {
    window.open('https://microfocus-profile.performplus.pwc.com/login', '_blank');
}

function mfTranslation() {
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
            // sfLogo.style.backgroundImage = 'url()';
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